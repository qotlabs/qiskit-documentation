"use strict";exports.id=830,exports.ids=[830],exports.modules={67830:(e,t,a)=>{a.d(t,{Ak:()=>getPublicPath,Dm:()=>readDocFile,qe:()=>b});var n=a(37398),o=a(71017),i=a.n(o),r=a(73292),l=a(72925),s=a(73867);let c=s.z.lazy(()=>s.z.object({title:s.z.string(),url:s.z.union([s.z.string().startsWith("/",{message:"must start with /"}),s.z.string().url()]).optional(),children:s.z.array(c).optional()})),p=s.z.object({title:s.z.string(),subtitle:s.z.string().optional(),children:s.z.array(c),collapsed:s.z.boolean().default(!1)});function validateToc(e){return p.parse(e)}var u=a(13574),d=a(98210),h=a.n(d);function notebookToMarkdown(e){let t=JSON.parse(e),a=["---"];for(let e of["title","description","in_page_toc_show","in_page_toc_min_heading_level","in_page_toc_max_heading_level"])h()(t.metadata,e)&&a.push(`${e}: ${t.metadata[e]}`);a.push("---");let n=[];for(let e of t.cells)if("markdown"===e.cell_type)n.push(e.source.join(""));else if("code"===e.cell_type){let t=e?.execution_count;for(let a of(n.push(`<span class="block text-text-helper text-label-01 md:text-end md:w-40 md:-mb-32 md:-ml-48">[${t??"&nbsp;"}] :</span>`),n.push(`\`\`\`python
${e.source.join("")}
\`\`\``),e.outputs.length>0&&n.push('<p class="text-text-helper text-label-01">Output:</p>'),e.outputs)){let e=a.data?.["text/html"],t=a.data?.["image/png"],o=a.data?.["text/plain"],i=a?.text;i&&n.push("```\n"+i.join("")+"```\n"),e?n.push(`<div class="md-output-cell" dangerouslySetInnerHTML={{__html: \`${e.join("").replace("`","\\`")}\` }} /> `):t?o?n.push(`![${escapeHTML(o.join(""))}](data:image/png;base64,${t})`):n.push(`![](data:image/png;base64,${t})`):o&&n.push("```\n"+o.join("")+"\n```\n")}e.outputs.length>0&&n.push('<div class="mt-32" />')}let o=`${a.join("\n")}

${n.join("\n\n")}`;return o}function escapeHTML(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/{/g,"\\{")}let f=s.z.object({name:s.z.string(),version:s.z.string()});function validatePackageFile(e){return f.parse(e)}var g=a(89017),m=a.n(g),F=a(79521),w=a(68390);function cached(e){return"true"===process.env.NEXT_PUBLIC_DYNAMIC_CONTENT?(0,F.cache)(e):(0,w.ZP)(e)}let $=(0,l.dU)(process.env.DOCS_DIR,"docs"),_=i().isAbsolute($)?$:i().join(process.cwd(),$),y=i().join(process.cwd(),"public");function getPublicPath(){return y}async function findDocFile(e){return await readFirst(`${_}/${e}`,["mdx","md","ipynb"])}async function readFirst(e,t){for(let a of t)try{let t=`${e}.${a}`,n=await (0,r.readFile)(`${e}.${a}`,"utf-8");return{content:n,extension:a,path:t}}catch(e){if("ENOENT"===e.code);else throw e}throw new FileNotFound(e,t)}let FileNotFound=class FileNotFound extends Error{constructor(e,t){let a=`File not found ${e} ${t}`;super(a),Object.setPrototypeOf(this,FileNotFound.prototype),this.path=e,this.extensions=t,"function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,FileNotFound)}};let b=cached(async function(){let e=await (0,n.lq)("**/_package.json",{cwd:_}),t={};await Promise.all(e.map(async e=>{let a=await (0,r.readFile)(`${_}/${e}`,"utf-8"),n=`/${i().parse(e).dir}`;t[n]=validatePackageFile(JSON.parse(a))}));let a={};for(let[e,n]of m()(t))a[n.name]||(a[n.name]=[]),a[n.name].push({version:n.version,path:e});let o=await (0,n.lq)("**/_toc.json",{cwd:_}),l=[];return await Promise.all(o.map(async e=>{let n=await (0,r.readFile)(`${_}/${e}`,"utf-8"),o=validateToc(JSON.parse(n)),s=`/${i().parse(e).dir}`,c=t[s];c?l.push({type:"package",path:s,toc:o,package:{name:c.name,version:c.version,versions:a[c.name]}}):l.push({type:"default",path:s,toc:o})})),l});async function readDocFile(e){let t;try{t=await findDocFile(e)}catch(a){if(a instanceof FileNotFound){let a=[e,"index"].join("/");try{t=await findDocFile(a),e=a}catch(t){throw t instanceof FileNotFound&&(0,u.notFound)(),console.log("File not found",e),t}}else throw console.log("File not found",e),a}return"ipynb"===t.extension&&(t={...t,content:notebookToMarkdown(t.content)}),{file:t,slug:e}}}};