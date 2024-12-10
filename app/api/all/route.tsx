import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// GET all products from database
// for manage page
export async function GET(req: Request) {
  try {
    const query = await getDocs(collection(db, "products"));
    const documents = query.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Response.json({ documents }, { status: 200 });
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
