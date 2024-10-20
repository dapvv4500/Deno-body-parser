import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";
//import { Router, Application} from "https://deno.land/x/oak/mod.ts";
//import { Router, Application} from "https://deno.land/x/oak/mod.ts";
//import { Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";

import { 
    get_all_books,
    get_book,
    create_book,
    delete_book
} from "./book-api.ts";


const app = new Application();
//static files
app.static('/','./public');

//routes
app
    .get('/books', get_all_books)
    .get('/book/:id', get_book)
    .post('/create', create_book)
    .delete('/delete/:id', delete_book)
    .start({ port: 3000 });

console.log("http://localhost:3000/");

//app.start({ port: 3000 });