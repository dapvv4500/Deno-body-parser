import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.6.0/mod.ts";

//serve({ "/quotes": handleQuotes, });
serve({ "/quo": handleQuo, 
        "/quotes": handleQuotes,
    });
// To get started, let's just use a global array of quotes.
const quotes = [
  {
    quote: "Those who can imagine anything, can create the impossible.",
    author: "Alan Turing",
  },
  {
    quote: "Any sufficiently advanced technology is equivalent to magic.",
    author: "Arthur C. Clarke",
  },
];

async function handleQuo(request: Request, ctx: any) {
    const met = request.method;
    const pat = await json(request.url.pathname);
    let mess = `No process needed for 'quo' ${ pat } /${ met }`
    console.log(`\n ${mess} \n`);
    
    const { error } = await validateRequest(request, {
    GET: {},
  });
// Return all the quotes.
  return json({ mess: mess });
}
    
    
async function handleQuotes(request: Request) {
    const meth = request.method;
    const path = await request.url.pathname;
    const pat = await json(path)
    console.log(`\n Handle Request: ${meth} --url: ${pat} \n`);
    
  // Make sure the request is a GET request.
  const { error, body } = await validateRequest(request, {
    GET: {},
    POST: { body: [ "quote", "author" ]}
  });
  // if validateRequest = error if the request doesn't meet
  if (error) {
    console.log("zcxzczxczxczxc");//`mess: "Endpoint damage.", Error: 333 ${err.status}`);
    return json({ error: error.message }, { status: error.status });
  }
    //POST
    if (meth === "POST") {
        const { quote, author } = body as { quote: string; author: string };
        quotes.push({ quote, author });
        console.log(`Push : "${quote} "`);
        return json({ quote, author }, { status: 201 });
    }

  // or GET - Return all the quotes.
  if (meth === "GET") {
      return json({ quotes });
    } 
}