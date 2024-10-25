import { 
    signOut, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider,
    sendPasswordResetEmail,
    updatePassword,
    sendEmailVerification
} from "firebase/auth";
import { auth } from "./firebase";  // Ensure that firebase.js exports the correct auth instance

// Function to create a user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Send email verification after user signs up
        await doSendEmailVerification(); // Call the verification function
        console.log("User created successfully. Verification email sent!");
        return userCredential;
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

// Function to sign in with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if email is verified
        if (!user.emailVerified) {
            console.log("Email not verified. Sending verification email.");
            await doSendEmailVerification(); // Optional: Resend verification email
            // Optionally sign out or show a warning to the user
            // await doSignOut(); // Uncomment if you want to sign the user out
        } else {
            console.log("User signed in successfully.");
        }

        return user;
    } catch (error) {
        console.error("Error signing in:", error);
    }
};

// Function to sign in with Google
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user; // Access the signed-in user info here if needed
        console.log("Google sign-in successful. User:", user);
        return user;
    } catch (error) {
        console.error("Google sign-in error:", error);
        throw error;
    }
};

// Function to sign out
export const doSignOut = async () => {
    return signOut(auth);
};

// Function to reset password
export const doPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent!");
    } catch (error) {
        console.error("Error sending password reset email:", error);
    }
};

// Function to change password
export const doPasswordChange = async (password) => {
    if (!auth.currentUser) {
        console.error("No user is currently signed in.");
        return;
    }
    
    try {
        await updatePassword(auth.currentUser, password);
        console.log("Password updated successfully!");
    } catch (error) {
        console.error("Error updating password:", error);
    }
};

// Function to send email verification
export const doSendEmailVerification = async () => {
    if (!auth.currentUser) {
        console.error("No user is currently signed in.");
        return;
    }

    try {
        await sendEmailVerification(auth.currentUser, {
            url: `${window.location.origin}/app`,
        });
        console.log("Verification email sent!");
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};
