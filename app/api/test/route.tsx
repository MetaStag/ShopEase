import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET(req: Request) {
  try {
    let result = await getDocs(collection(db, "products"));
    result.forEach((product) => {
      console.log(product.data());
    });
    return Response.json({ message: "Hello to the big api" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Invalid request" });
  }
}
