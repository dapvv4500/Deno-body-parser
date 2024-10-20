import { Router, Application} from "https://deno.land/x/oak/mod.ts";
import { readAll } from "https://deno.land/std@0.103.0/io/util.ts";
import { serve } from "https://deno.land/std@0.186.0/http/server.ts";
import { Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";

const app = new Application();
const router = new Router();

const pushbody = async (ctx: Context) => {
  //ctx.response.status = 200;
  //ctx.response.body = "Body Response.";
  const method  = ctx.request.method;
  const epoint = ctx.request.url.pathname;
    console.log("\n---- Request-method: /", method);
    console.log("has-Body: ",ctx.request.hasBody);
    console.log("ctx-Type: ",ctx.request.headers.get("Content-Type"));
    console.log("Length:   ",ctx.request.headers.get("Content-Length"));
    console.log("body-type: ",ctx.request.body.type());
    console.log("req-epoint: ",epoint);
    console.log("------------------\n");

  console.log("++++ Response  ./ " + method, epoint );
  
  if(method === 'POST' && epoint === "/create") {
        const { id, name }  = await ctx.request.body.json();
        var mess = 'Get res.body: --id = "'+id+'"'+' --name = "'+name+'"';
        console.log(mess);

        mess = JSON.stringify(
            { message: 'User created successfully.',              
              body: {'-id': id, '-name': name} 
            });
        ctx.response.status = 200;
        ctx.response.body = mess;
    }
  else {
        ctx.response.status = 401;
        ctx.response.body = "Error request.";
        console.log("++++ Error request endpoint " + method, epoint );
  }
};

const homepage = (ctx: Context) =>{
    const mess = "HOME -> Hello, this is / -POST.request.body.";
    ctx.response.status = 200;
    ctx.response.body = mess;
    console.log(`${mess}`);
};

router
  .get("/", homepage)  
  .post("/create", pushbody);

const port = 8080;
console.log(`\n Use Port: ${port}`);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen({ port: port });
