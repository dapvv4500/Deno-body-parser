import { Router, Application} from "https://deno.land/x/oak/mod.ts";
import { Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";

export interface Book {
    id:     string,
    title:  string,
    author: string,
    pages:  number
}
let books: Book[] = [
    {id: '1', title: 'unknown', author: 'blind', pages: 12},
    {id: '22', title: 'A litle yet', author: 'Profesional', pages: 321},
    {id: '333', title: 'Welknowlegde', author: 'the SUN familar', pages: 4567},
];
let bookid = 1;

function genbookid(): number {
  return bookid++;
}

export const get_all_books = (ctx: Context) => {
    console.log(ctx.url.pathname + " -> get_all_books -> " + ctx.status);
    return ctx.json(books,200);
}

export const get_book = async (ctx: Context) => {
    const {id} = ctx.params;
    const book = books.find((b: Book) => b.id ===id);
    
    console.log(ctx.url.pathname + " -> get_book/id : " + id);
    console.log(book);
    
    if (book) {
        return ctx.json(book,200);
    }
    return ctx.string(`Not find the book id: #${id}`,404);
};
//{ request, response }: {
//    request: any;
//    response: any;
//})
export const create_book = async ( ctx: Context ) => {
    const epoint = ctx.url.pathname;
    const method = ctx.method; 
    var mess = "\n 1- Call: create_book() -> ";
    console.log(mess, method, epoint, '\n');
    
    const body  = await ctx.request.body.json() as Book;
    
    const book: Book = { id, title, author, pages };
    //console.log("body:",book);
    books.push(book);

  //console.log(JSON.parse(JSON.stringify(request.body().value)));
  //const { id, title, author, pages }  = await ctx.request.body.json();
///if (!request.hasBody) {request.status=404;}
//else {
  //response.body = await request.body("json").value;//{ success: true, data: book };
  //response.status = 201;
//}
    return ctx.json(epoint,200);
};


export const delete_book = (ctx: Context) => {
    const {id} = ctx.params;
    const book = books.find((b: Book) => b.id ===id);
    
    if (book) {
        books = books.filter((b: Book) => b.id !== id);
        return ctx.json(`Delete book : #${book.id}, ${book.title}`, 200);
    }
    return ctx.string(`No book with id: ${id}`, 404);
}

const app = new Application();
const router = new Router();
app
  .use(router.routes())
  .use(router.allowedMethods());
  //.listen({ port: port });
