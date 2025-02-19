// non filter
// import { verifyAuthToken } from "@/services/route-auth";
// import { google } from "googleapis";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const isAuthorized = await verifyAuthToken(request);
//   if (isAuthorized instanceof NextResponse) {
//     return isAuthorized;
//   }
//   try {
//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//         private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//       },
//       scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//     });

//     const sheets = google.sheets({ version: "v4", auth });
//     const spreadsheetId = process.env.GOOGLE_SHEET_ID;
//     const sheetName = "Daily Activity 2025";

//     const metadata = await sheets.spreadsheets.get({
//       spreadsheetId: spreadsheetId,
//       includeGridData: false,
//     });

//     const sheet = metadata.data.sheets?.find(
//       (s) => s.properties?.title === sheetName
//     );
//     const lastRow = sheet?.properties?.gridProperties?.rowCount ?? 1000;
//     const lastColumn = sheet?.properties?.gridProperties?.columnCount ?? 26;

//     const getColumnLetter = (col: number) => {
//       let letter = "";
//       while (col > 0) {
//         col--;
//         letter = String.fromCharCode(65 + (col % 26)) + letter;
//         col = Math.floor(col / 26);
//       }
//       return letter;
//     };
//     const lastColumnLetter = getColumnLetter(lastColumn);
//     const dynamicRange = `${sheetName}!A1:${lastColumnLetter}${lastRow}`;

//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: dynamicRange,
//     });
//     const data = response.data.values;
//     return NextResponse.json(data || []);
//   } catch (error) {
//     if (error instanceof Error)
//       return NextResponse.json(
//         { error: "Failed to fetch data from Google Sheets" },
//         { status: 500 }
//       );
//   }
// }

// filter
import { verifyAuthToken } from "@/services/route-auth";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const isAuthorized = await verifyAuthToken(request);
  if (isAuthorized instanceof NextResponse) return isAuthorized;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = "Daily Activity 2025";

    const metadata = await sheets.spreadsheets.get({
      spreadsheetId,
      includeGridData: false,
    });

    const sheet = metadata.data.sheets?.find(
      (s) => s.properties?.title === sheetName
    );
    const lastRow = sheet?.properties?.gridProperties?.rowCount ?? 1000;
    const lastColumn = sheet?.properties?.gridProperties?.columnCount ?? 26;

    const getColumnLetter = (col: number) => {
      let letter = "";
      while (col > 0) {
        col--;
        letter = String.fromCharCode(65 + (col % 26)) + letter;
        col = Math.floor(col / 26);
      }
      return letter;
    };

    const lastColumnLetter = getColumnLetter(lastColumn);
    const dynamicRange = `${sheetName}!A1:${lastColumnLetter}${lastRow}`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: dynamicRange,
    });

    const data = response.data.values;
    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    // const headers = data[0]; // Baris pertama sebagai header
    const headers = data[0].map((header) =>
      (header || "").trim().replace(/\s+/g, "_").replace(/\W+/g, "")
    );
    const transformedData = data
      .slice(1)
      .map((row) =>
        headers.reduce(
          (obj, key, index) => ({ ...obj, [key]: row?.[index] || "" }),
          {} as Record<string, string>
        )
      )
      .filter(
        (row) =>
          row.Status_Doc?.trim().toUpperCase() === "CLOSED" &&
          row.Status_PO?.trim().toUpperCase() === "NOTCOMPLETE" &&
          row.PO_Authorized_Date?.trim() !== ""
      );
    return NextResponse.json(transformedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch and filter data from Google Sheets" + error },
      { status: 500 }
    );
  }
}
