import { defineAction } from "astro:actions";

import { firebase } from "@/firebase";
import { z } from "astro:schema";
import { createUserWithEmailAndPassword, type AuthError } from "firebase/auth";


export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional()
    }),
    handler: async ({ password, email, remember_me }, context) => {

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
            const user = await createUserWithEmailAndPassword(firebase.auth, email, password);
            
            return JSON.stringify(user);

        } catch (e) {
            const firebaseError = e as AuthError
            if (firebaseError.code === 'auth/email-already-in-use') {
                throw new Error('Email already in use');
            }

            throw new Error('Error registering user');
        }
        
    }
})


