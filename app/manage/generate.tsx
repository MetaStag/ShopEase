type code = {
  [key: string]: string;
};

const lcode: code = {
  "0": "0001101",
  "1": "0011001",
  "2": "0010011",
  "3": "0111101",
  "4": "0100011",
  "5": "0110001",
  "6": "0101111",
  "7": "0111011",
  "8": "0110111",
  "9": "0001011",
};

const rcode: code = {
  "0": "1110010",
  "1": "1100110",
  "2": "1101100",
  "3": "1000010",
  "4": "1011100",
  "5": "1001110",
  "6": "1010000",
  "7": "1000100",
  "8": "1001000",
  "9": "1110100",
};

// Generates checksum
const generateChecksum = (inp: string): number => {
  let odd = 0;
  let even = 0;
  let j = 1;
  odd += parseInt(inp[0]);
  for (let i = 2; i < inp.length; i += 2) {
    odd += parseInt(inp[i]);
    even += parseInt(inp[j]);
    j += 2;
  }
  odd *= 3;
  let checksum = odd + even;
  checksum = checksum % 10;
  checksum = (10 - checksum) % 10;
  return checksum;
};

// Generate barcode text in binary - 10101010....
const generateBarcodeText = (
  mcode: string,
  pcode: string,
  checksum: number
): string => {
  let bar: string = "101"; // Left Guard
  for (const ch of mcode) {
    bar += lcode[ch]; // Encode Manufacturer Code
  }
  bar += "01010"; // Middle Guard
  for (const ch of pcode) {
    bar += rcode[ch]; // Encode Product Code
  }
  bar += rcode[checksum]; // Checksum
  bar += "101"; // Right Guard
  return bar;
};

// Generate random Manufacturer and Product Code
const generateRandomNumber = (size: number): string => {
  let result = "";
  for (let i = 0; i < size; i++) result += Math.floor(Math.random() * 10);
  return result;
};

export default function generateBarcode(canvasRef: any): string {
  let mcode: string = generateRandomNumber(6); // manufacturer code of length 6
  let pcode: string = generateRandomNumber(5); // product code of length 5
  let checksum = generateChecksum(mcode + pcode);
  const barcode = mcode + pcode + checksum;
  const barcodeText = generateBarcodeText(mcode, pcode, checksum);
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 226, 100);
  let x = 0;
  let y = 15;
  for (const ch of barcodeText) {
    x += 2;
    ctx.fillStyle = ch === "0" ? "white" : "black";
    ctx.fillRect(x, y, 2, 75);
  }

  const imageurl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imageurl;
  link.download = "barcode.png";
  link.click();
  return barcode;
}
