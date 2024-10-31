import { firebase } from "@/firebase";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";

export const login = defineAction({
    accept:'form',
    input:z.object({
        email:z.string().email(),
        password:z.string().min(6)

    }),
    handler:async (input) => {
        
        try {
            const user =await signInWithEmailAndPassword(firebase.auth,input.email,input.password);
            console.log(user);
            return JSON.stringify(user);
        }catch(e){            
            throw new Error('User is not valid');
        }
        
    }
})

