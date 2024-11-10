import { auth } from './FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,  } from 'firebase/auth';

export const handleCreateUserWithEmailAndPassword = async (email, passsword) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, passsword);
        return {success: true, data: userCredential}
    } catch(e) {
        return {success: false, data: e }
    }
    
}

export const handleSignInWithEmailAndPassword = async (email, passsword) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, passsword);
        return {success: true, data: userCredential}
    } catch(e) {
        return {success: false, data: e }
    }
}
