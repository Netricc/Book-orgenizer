import { signOut, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";  // Ensure that firebase.js exports the correct auth instance

// Function to create a user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Function to sign in with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Function to sign in with Google
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        // Access the signed-in user info here if needed
        const user = result.user;
        console.log("Google sign-in successful. User:", user);
        return user;
    } catch (error) {
        console.error("Google sign-in error:", error);
        throw error;
    }
};

// Function to sign out
export function doSignOut() {
    return signOut(auth);
};
