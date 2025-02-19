"use client";
import { useEffect } from "react";

export default function Fpa() {
  useEffect(() => {
    fetch("/api/sheets") // Gantilah dengan API-mu
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div className="p-5">
      <h1>FPA page</h1>
      <p></p>
    </div>
  );
}
