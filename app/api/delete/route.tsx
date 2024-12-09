import { db } from "@/lib/firebase";
import { type NextRequest } from "next/server";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

// DELETE product based on Id
// query parameter - id
export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("id");
    if (query === null) throw new Error("Pass in Id parameter");

    const docRef = doc(db, "products", `${query}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) await deleteDoc(docRef);
    else throw new Error("Product with this Id does not exist in database");

    return Response.json(
      {
        message: "Product deleted successfully",
      },
      {
        status: 200,
      }
    );
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
