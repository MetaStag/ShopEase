import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Data validation
    let { id, name, price, ...extraData } = body;
    id = parseInt(id, 10);
    price = parseFloat(id);
    if (isNaN(id)) throw new Error("Invalid Id");
    if (isNaN(price)) throw new Error("Invalid price");
    if (!name || typeof name !== "string") throw new Error("Invalid name");
    if (Object.keys(extraData).length > 0)
      throw new Error("Extra fields found");

    // Update document
    const docRef = doc(db, "products", `${id}`);
    await updateDoc(docRef, { name, price });
    return Response.json(
      {
        message: "Product successfully updated",
      },
      {
        status: 200,
      }
    );
  } catch (err: any) {
    if (!err.message) err.message = "Invalid body";
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
