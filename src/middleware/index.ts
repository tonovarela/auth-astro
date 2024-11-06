import { firebase } from "@/firebase";
import { defineMiddleware } from "astro:middleware";



const privateRoutes = ['/protected'];
const notAuthenticatedRoute = ['/login', '/register'];

export const onRequest = defineMiddleware((context, next) => {
  const isLogged = !!firebase.auth.currentUser;
  const user = firebase.auth.currentUser;
  context.locals.isLoggedIn = isLogged;
  if (user) {
    context.locals.user = {
      email: user.email ?? '',
      name: user.displayName ?? '',
      avatar: user.photoURL ?? '',      
      emailVerified: user.emailVerified ?? false
    }
  }

  if (!isLogged && privateRoutes.includes(context.url.pathname)) {    
     context.redirect('/');
  }

  
  
  if (isLogged && notAuthenticatedRoute.includes(context.url.pathname)) {    
    context.redirect('/protected');
  }


  //  console.log('Request desde el middleware');    
  //    const { url } = context;
  // const authHeader = context.request.headers.get('Authorization');
  // if (authHeader) {
  //     return next();
  // }

  // if (privateRoutes.includes(url.pathname)) {
  //     return new Response('No tienes permisos para acceder a esta ruta', 
  //         { status: 401, headers:{
  //             'WWW-Authenticate': 'Basic realm="Secure Area"'
  //         } });        
  // }    
  return next();
});