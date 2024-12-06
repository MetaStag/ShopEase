import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Data validation
    let { id, name, price, ...extraData } = body;
    id = parseInt(id, 10);
    price = parseFloat(price);
    if (isNaN(id)) throw new Error("Invalid Id");
    if (isNaN(price)) throw new Error("Invalid price");
    if (!name || typeof name !== "string") throw new Error("Invalid name");
    if (Object.keys(extraData).length > 0)
      throw new Error("Extra fields found");
    console.log(id, name, price);

    // Add document
    const docRef = doc(db, "products", `${id}`);
    await setDoc(docRef, { name, price });
    return Response.json(
      { message: "Product successfully added" },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    if (!err.message) err.message = "Invalid body";
    return Response.json(
      { message: err.message },
      {
        status: 400,
      }
    );
  }
}
