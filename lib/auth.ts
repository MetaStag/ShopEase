import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export async function loginAdmin(email:string, password:string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential
    } catch(err) {
        console.error(err)
        return "Error logging in"
    }
}

export async function getIDToken() {
    const user = auth.currentUser
    if (!user) {
        throw new Error("No User is logged in")
    } else {
        return await user.getIdToken()
    }
}