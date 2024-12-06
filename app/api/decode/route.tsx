import { spawn } from "child_process";

function runCommand(exe: string, args: string[]) {
  return new Promise((resolve, reject) => {
    const proc = spawn(exe, args);
    let output = "";
    proc.stdout.on("data", (data) => {
      data = data.toString();
      data = JSON.parse(data);
      output += data.sessions[0].barcodes[0].text;
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

export async function GET(req: any) {
  try {
    console.log(process.env.HOME)
    const exe = "./BarcodeReaderCLI.exe";
    let args = [];
    args.push("-type=upca");
    args.push(`${process.env.HOME}\\Downloads\\barcode.png`);
    let code = await runCommand(exe, args);
    console.log(code);
    return Response.json({ message: code }, { status: 201 });
  } catch (err: any) {
    if (!err.message) err.message = "Invalid Request";
    console.log(err.message);
    return Response.json({ message: err.message }, { status: 400 });
  }
}
