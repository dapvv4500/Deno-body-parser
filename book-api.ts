//import { Router, Application} from "https://deno.land/x/oak/mod.ts";
import { Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { Book } from "./book-modle.ts";
//
//export interface Book {
//    id:     string,
//    title:  string,
//    author: string,
//    pages:  number
//}
let books: Book[] = [
    {id: '1', title: 'unknown', author: 'blind', pages: 12},
    {id: '22-id', title: 'A litle yet', author: 'Profesional', pages: 321},
    {id: '333', title: 'Welknowlegde', author: 'the SUN familar', pages: 4567},
];
let bookid = 10;

function genbookid(): number {
  return bookid ++ + "-id";
}

export const get_all_books = async (ctx: Context) => {
    const path = ctx.request.url.pathname;
    ctx.response.status = 202;
    console.log( path + " -> get_all_books ... " + ctx.response.status);
    
    let html = `<!DOCTYPE html> <html> <body>
                <div class="container">`;
        books.forEach((el) => {
            html += `
            <li>Title: "${el.title}" - Author: "${el.author}" - Pages: ${el.pages} ..
            <button> ${el.id} </button> <br>
            </li>`
    })
    html += `</div> </body> </html>`;
    try{
        return await ctx.response.body=({books});
    } catch (err) {
        console.error(err);
    }
        
    //ctx.response.body = books.map(item => ${item});
}

export const get_book = async (ctx: Context) => {
    const idd = await ctx.params;
    const idid = await JSON.stringify(idd);
    const id = (JSON.parse(idid)).id;
    
    const path = ctx.request.url.pathname;
    //
    const book = books.find((b: Book) => b.id ===id);
    var mess = `\n${path} -> Type of (id) : ${ typeof(id) } -> ${id}`;

    console.log(mess);
    console.log(book);

    if (book) {
        return ctx.response.body = { book };
    }
    mess = `Not find the book id : #${ id }`;
    return ctx.response.body = { ERROR: mess };
};

//     
export const create_book = async ( ctx: Context ) => {
    const epoint = ctx.request.url.pathname;
    const method = ctx.request.method; 
    
    const body = await ctx.request.body;
    const { title, author, pages } = await body.json()
    var mess = `\n4- create_book() -> ${ method } ${ epoint }`;
    
    console.log(mess, " -> ", title, author, pages);
    try {
        const id = genbookid();
        const book = { id, title, author, pages };
//
        console.log(book);
        books.push(book);
        mess = "Created.";
        return ctx.response.body = ({book: mess, id, title, author, pages});

    } catch (err) {
        ctx.response.status = 404;
        mess = " Error to create new book.";
        return ctx.response.body = {ERROR : mess};
    }
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
