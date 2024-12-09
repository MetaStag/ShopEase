import { spawn } from "child_process";
import { writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

// Execute the external BarcodeReaderCLI.exe file
function runCommand(exe: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = spawn(exe, args);
    let output = "";
    proc.stdout.on("data", (data) => {
      data = data.toString();
      data = JSON.parse(data);
      data = data.sessions[0].barcodes;
      if (data.length === 0) return;
      else output += data[0].text;
    });
    proc.stderr.on("data", (data) => {
      console.log(data.toString());
    });
    proc.on("close", (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(`$Error code ${code}`));
    });
    proc.on("error", (err) => {
      reject(err);
    });
  });
}

// DECODE barcode image to text
// First image gets saved to public/uploads
// Then BarcodeReaderCLI.exe extracts the text of that image in runCommand() above
export async function POST(req: NextRequest, res: any) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob | null;
  if (!file) throw new Error("File not found");

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public/uploads");
  try {
    await writeFile(`${uploadDir}/barcode.png`, buffer);
    const exe = "./BarcodeReaderCLI.exe";
    let args = [];
    args.push("-type=upca");
    args.push(".\\public\\uploads\\barcode.png");
    let code: string = await runCommand(exe, args);
    if (code === "") throw new Error("Error extracting id from barcode");
    return Response.json({ message: code }, { status: 200 });
  } catch (err: any) {
    if (!err.message) err.message = "Invalid request";
    return Response.json(
      {
        message: err.message,
      },
      {
        status: 400,
      }
    );
  }
}
