import { NextResponse } from "next/server";
import * as PoService from "@/services/po.service";
import path from "path";
import { unlink, writeFile } from "fs/promises";
import { verifyAuthToken } from "@/services/route-auth";

export async function GET(request: Request) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;

  try {
    const po = await PoService.fetchPo();
    return NextResponse.json(po, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch users",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const po_number = formData.get("po_number") as string;
    const po_items = formData.get("po_items") as string;
    const supplierId = formData.get("supplierId") as string;
    const userId = formData.get("userId") as string;

    if (!po_number || !po_items || !supplierId || !userId || !file) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const file_name = file.name;

    const axistingPo = await PoService.getExistingPo({ po_number, po_items });
    if (axistingPo) {
      return NextResponse.json(
        { error: "Data is already in the database." },
        { status: 400 }
      );
    }

    const existingFile = await PoService.getPoByFileName(file_name);
    if (existingFile) {
      return NextResponse.json(
        { error: `The file '${file_name}' already exists in the database.` },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "public/uploads", file_name);
    const fileBuffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(fileBuffer));

    const newPo = await PoService.addPo({
      po_number,
      po_items,
      supplierId,
      userId,
      file_name,
    });
    return NextResponse.json(newPo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error, " + error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const isAuthorized = await verifyAuthToken(req);
  if (isAuthorized instanceof NextResponse) return isAuthorized;

  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const file = formData.get("file") as File;

    if (!id || !file) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const file_name = file.name;

    // Ambil data PO lama dari database
    const existingPo = await PoService.fetchPoById(id);

    // Hapus file lama jika ada
    if (existingPo?.file_name) {
      const oldFilePath = path.join(
        process.cwd(),
        "public/uploads",
        existingPo.file_name
      );
      try {
        await unlink(oldFilePath); // Hapus file lama
      } catch (error) {
        console.warn("Failed to delete old file:", error);
      }
    }

    // Simpan file baru
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public/uploads", file.name);
    await writeFile(filePath, buffer);

    const updatedPo = await PoService.updatePoById({ id, file_name });

    return NextResponse.json(updatedPo);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error, " + error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing PO ID" }, { status: 400 });
    }
    // Ambil data PO lama dari database
    const existingPo = await PoService.fetchPoById(id);
    if (!existingPo) {
      return NextResponse.json({ error: "PO not found" }, { status: 404 });
    }

    // Hapus file lama jika ada
    if (existingPo?.file_name) {
      const oldFilePath = path.join(
        process.cwd(),
        "public/uploads",
        existingPo.file_name
      );
      try {
        await unlink(oldFilePath); // Hapus file lama
      } catch (error) {
        console.warn("Failed to delete old file:", error);
      }
    }

    await PoService.removePo(id);
    return NextResponse.json({ message: "PO deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error, " + error },
      { status: 500 }
    );
  }
}
