import { serve } from "https://deno.land/std@0.103.0/http/server.ts";
import { readAll } from "https://deno.land/std@0.103.0/io/util.ts";

const server = serve({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

for await (const req of server) {
  console.log("--------------\n");
  console.log("url: --", req.url,"--",req.method,"--",req.headers.get("Content-Type"));
  var data = ".Query";
  
  if (req.url === "/create" && req.method === "POST") {

     try {
        const body = await readAll(req.body);
        data = new TextDecoder().decode(body);
        console.log("Body: \n", data);

     } catch (err) {
        console.log(data, " -Error: ", err.status);
     }

      req.respond({ status: 200, body: data });
    } else {
      req.respond({ status: 300,  body: req.method + data + " -Empty request." });
    }
};
