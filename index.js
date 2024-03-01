import * as esbuild from 'https://deno.land/x/esbuild@v0.19.11/mod.js';
import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.5.2/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo/mod.ts";
import * as mime from "https://deno.land/std@0.217.0/media_types/mod.ts";
import readDB from './api/iceaxe.js';"./api/iceaxe.js";

import './src/App.jsx'; // to make watcher update, doesn't actually do anything.

const dbString = `mongodb://USERNAME:PASSWORD@localhost:27017/mapDB`;
const client = new MongoClient();
await client.connect(dbString);
const worldDB = client.database("mapDB").collection("worlds");
const eraDB = client.database("mapDB").collection("eras");
const mapDB = client.database("mapDB").collection("maps");
const intlDB = client.database("mapDB").collection("localise");

const allowedPaths=['', '/'],
    allowedRess = {
        styles: './src/App.css',
        avenir_eot: './src/res/2090551770be22b09600a40b0b4673b7.eot',
        avenir_woff: './src/res/2090551770be22b09600a40b0b4673b7.woff',
        avenir_svg: './src/res/2090551770be22b09600a40b0b4673b7.svg',
        avenir_ttf: './src/res/2090551770be22b09600a40b0b4673b7.ttf',
        logo: 'src/res/logo.png',
        react_dev: 'src/res/react.development.js',
        react_dom: 'src/res/react-dom.development.js',
        react_router: 'src/res/react-router.production.min.js'
    },
    allowedPublicLists = {
        /*
            worldDB schema:
                title // i.e. worldName
                eras
            
            eraDB schema:
                title
                parent // i.e. worldName
                children

            mapDB schema:
                title
                body
                image
                mapdata {
                    parent // i.e. worldName
                    age
                    coordinatestyle
                    minXY
                    maxXY
                }
            
            intlDB schema:
                title // i.e. componentSpecClass
                content
                charset
                font
            
            trust me, homogenising primary keys will save us some headaches
            i can't quite dynamically change the fetcher thing for mongo without some weird hacks
            so to make the fetcher function quicker, we merely search on a similar-named field for everything
        */
        worlds: {
            type: worldDB,
            filter: ()=>false,
            specFlag: ()=>false
        },
        aIW: { //allInWorld
            type: mapDB,
            filter: (url)=>url.substring(url.indexOf('aIW:') + 4),
            specFlag: ()=>false
        },
        aIE: {
            type: eraDB,
            filter: (url)=>url.substring(url.indexOf('aIE:')+4).split(':w:').filter(Boolean).filter(e=>e!==":w:"),
            specFlag: true,
            spec: "era"
        },
        mapX: {
            type: mapDB,
            filter: (url)=>url.substring(url.indexOf('mapX:') + 5),
            specFlag: ()=>false
        },
        "l-": {
            type: intlDB,
            filter: (url)=>url.substring(url.indexOf('l:') + 2),
            specFlag: ()=>false
        }
    };
await esbuild.initialize({
    worker: false,
});

const out = await esbuild.build({
    plugins: [denoPlugin()/*,CssModulesPlugin({
      force: true,
      emitDeclarationFile: true,
      localsConvention: 'camelCaseOnly',
      namedExports: true,
      inject: false
    })*/],
    entryPoints: ["./src/index.jsx"],
    write: false,
    bundle: true,
    format: "esm",
    absWorkingDir: Deno.cwd(),
});
const f = new TextDecoder().decode(out.outputFiles[0].contents);

Deno.serve({port:800},async(req)=>{
    let finUrl = req.url.substring(req.url.indexOf('/', 9));
    
    if (finUrl.startsWith('/?res=') && Object.keys(allowedRess).indexOf(finUrl.substring(finUrl.indexOf('=') + 1)) >= 0) {
        let resPreUrl = finUrl.substring(finUrl.indexOf('=') + 1);
        let f = Deno.readFileSync(allowedRess[resPreUrl]);
        return new Response(f,{status:200,headers:{"Content-Type":mime.contentType(allowedRess[resPreUrl].substring(allowedRess[resPreUrl].lastIndexOf('.') + 1))}});
    } else if (finUrl.startsWith('/?') && allowedPublicLists[finUrl.substring(finUrl.indexOf('?') + 1, finUrl.indexOf(':') > -1 ? finUrl.indexOf(':') : finUrl.length)]) {
        console.log(finUrl);
        const splot = finUrl.substring(finUrl.indexOf('?') + 1, finUrl.indexOf(':') > -1 ? finUrl.indexOf(':') : finUrl.length),
            splat = allowedPublicLists[splot];
        let r = new Response(await JSON.stringify(await readDB(splat.type,splat.filter(finUrl), splat.specFlag || false, splat.spec)), {headers:{"Content-Type":"application/javascript"}});
        console.log(await readDB(splat.type,splat.filter(finUrl)));
        return r;
    } else if (allowedPaths.indexOf(finUrl) || finUrl == undefined){
        return new Response(`
            <!doctype html>
            <html>
                <head>
                    <title>E. C. Correa</title>
                    <script src="/?res=react_dev"></script>
                    <script src="/?res=react_dom"></script>
                    <script src="/?res=react_router"></script>
                    <link href="/?res=styles" rel="stylesheet" type="text/css"/>
                </head>
                <body>
                    <div id="app" class="app"></div>
                    <script id="hellspawner"></script>
                    <script>${f}</script>
                </body>
            </html>
        `,{status:200, headers:{"Content-Type": "text/html"}});
    }
    console.log("no path");
    return new Response("", {
        status: 307,
        headers: { Location: "/" },
    });
});
