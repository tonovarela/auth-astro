import { defineMiddleware } from "astro:middleware";



const privateRoutes = ['/protected'];

export const onRequest = defineMiddleware((context,next) => {
    console.log('Request desde el middleware');    
    const { url } = context;
    const authHeader = context.request.headers.get('Authorization');
    if (authHeader) {
        return next();
    }
    
    if (privateRoutes.includes(url.pathname)) {
        return new Response('No tienes permisos para acceder a esta ruta', 
            { status: 401, headers:{
                'WWW-Authenticate': 'Basic realm="Secure Area"'
            } });        
    }    
});