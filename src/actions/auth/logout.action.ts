

import { firebase } from "@/firebase";
import { defineAction } from "astro:actions";


import { signOut } from "firebase/auth";

export const logout = defineAction({
    accept:'json',
    //input:z.string(),
    handler:async (_,{cookies}) => {        
        return await signOut(firebase.auth)
    }
})

