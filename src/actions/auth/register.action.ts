import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const registerUser = defineAction({
    accept:'form',
    input:z.object({
        name:z.string().min(3),
        email:z.string().email(),
        password:z.string().min(6),
        remember_me:z.boolean().optional()
    }),
    handler:async ({name,password,email,remember_me}) => {
    
        console.log( {name,password,email,});
        return true
    }
})


