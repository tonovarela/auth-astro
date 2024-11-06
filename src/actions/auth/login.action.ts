import { firebase } from "@/firebase";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";

export const login = defineAction({
    accept:'form',
    input:z.object({
        email:z.string().email(),
        password:z.string().min(6),
        remember_me:z.boolean().optional()  
    }),
    handler:async ({remember_me,email,password},context) => {
        if (remember_me) {
            context.cookies.set('email', email,
                {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
                    path: '/'
                },
            ) // 1 year
        } else {
            context.cookies.delete('email', { path: '/' });
        }
        
        try {
            const user =await signInWithEmailAndPassword(firebase.auth,email,password);
            console.log(user);
            return JSON.stringify(user);
        }catch(e){            
            const firebaseError = e as AuthError
            if (firebaseError.code === 'auth/user-not-found') {
                throw new Error('User not found');
            }
            if (firebaseError.code === 'auth/email-already-in-use') {
                throw new Error('Email already in use');    
            }   
            throw new Error('Error logging in user');         
        }
        
    }
})

