import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { type NextRequest } from "next/server";

// GET product based on Id
// query parameter - id
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("id");
    if (query === null) throw new Error("Pass in Id parameter");
    if (!parseInt(query)) throw new Error("Invalid Id");
    const docRef = doc(db, "products", `${query}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return Response.json(
        { id: query, ...docSnap.data() },
        {
          status: 200,
        }
      );
    } else {
      return Response.json(
        { message: "No product with this Id exists" },
        {
          status: 404,
        }
      );
    }
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
