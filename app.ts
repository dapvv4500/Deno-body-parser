//import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { Router, Application} from "https://deno.land/x/oak/mod.ts";

import { 
    get_all_books,
    get_book,
    create_book,
    delete_book
} from "./book-api.ts";
//
const app = new Application();
const router = new Router();
const port = 3000;
console.log(`\n Use Port: ${port}`);


//static files
//app.static('/','./public');

export const cook_book = async ( ctx: Context ) => {
    const epoint = ctx.request.url.pathname;
    const method =  ctx.request.method; 
    var mess = "\n 1- Call: 'cook_book' -> ";
    console.log( mess, method, epoint );
    
    if (method === "GET") {
        return ctx.response.body = { mess, method, epoint };
    } else {
        const {id, name}  = await ctx.request.body.json();
        ctx.response.body = { id, name };
    }
};

router
    .get('/', cook_book)
    .post('/aa', cook_book)

    .get('/books', get_all_books)
    .get('/book/:id', get_book)
    .post('/create', create_book)
    //.delete('/delete/:id', delete_book);
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen({ port: port });

//const data = JSON.parse(JSON.stringify(body));