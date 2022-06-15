import{S as C,i as U,s as N,e as k,c as w,a as v,d as c,b as h,f as E,g as M,F as f,t as I,k as y,h as $,m as S,U as A,j as J,G as V,V as P,w as W,J as D,W as F,x as G,y as H,X as L,q as R,o as B,B as Y,v as z,I as O}from"../chunks/index-ca2f52f9.js";import{l as X}from"../chunks/markmap-64b5c6f2.js";import{F as K}from"../chunks/footer-a03930b9.js";var Q=`<p>This project is heavily inspired by <a href="https://github.com/dundalek/markmap">dundalek&#39;s markmap</a>.</p>
<h2 id="introduction">Introduction</h2>
<h3 id="what-is-markmap">What is markmap?</h3>
<p>Markmap is a combination of markdown and mindmap. It parses markdown content and extract its intrinsic hierarchical structure and renders an interactive mindmap, aka markmap.</p>
<p>The easiest way to use it is to load your markdown content to the <a href="/repl">try it out</a> \u{1F449} page and see your markmap on the right.</p>
<p>You can also try it in:</p>
<ul>
<li><a href="https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode">VSCode</a> \u{1F680}</li>
<li>command-line: see <a href="#markmap-cli">markmap-cli</a> \u{1F447}</li>
<li>Vim / Neovim: see <a href="#coc-markmap">coc-markmap</a> \u{1F447}</li>
</ul>
<h2 id="projects">Projects</h2>
<h3 id="markmap-lib">markmap-lib</h3>
<p><img src="https://img.shields.io/npm/v/markmap-lib.svg" alt="NPM"></p>
<p>Transform Markdown to data used by markmap.</p>
<h4 id="installation">Installation</h4>
<pre><code class="language-sh">$ yarn add markmap-lib
</code></pre>
<h4 id="usage">Usage</h4>
<p>Parse markdown and create a node tree, return the root node and a <code>features</code> object containing the active features during parsing.</p>
<p>Transform Markdown to markmap data:</p>
<pre><code class="language-js">import { Transformer } from &#39;markmap-lib&#39;;

const transformer = new Transformer();

// 1. transform markdown
const { root, features } = transformer.transform(markdown);

// 2. get assets
// either get assets required by used features
const { styles, scripts } = transformer.getUsedAssets(features);
// or get all possible assets that could be used later
const { styles, scripts } = transformer.getAssets(features);
</code></pre>
<p>Now we have the data for rendering. See <a href="#markmap-view">markmap-view</a> \u{1F447} for how to use them.</p>
<h3 id="markmap-view">markmap-view</h3>
<p><img src="https://img.shields.io/npm/v/markmap-view.svg" alt="NPM"></p>
<p>Render a markmap from transformed data.</p>
<h4 id="installation-1">Installation</h4>
<pre><code class="language-sh">$ yarn add markmap-view
</code></pre>
<h4 id="usage-1">Usage</h4>
<p>Create an SVG element with explicit width and height:</p>
<pre><code class="language-html">&lt;script src=&quot;https://cdn.jsdelivr.net/npm/d3@6&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;https://cdn.jsdelivr.net/npm/markmap-view&quot;&gt;&lt;/script&gt;

&lt;svg id=&quot;markmap&quot; style=&quot;width: 800px; height: 800px&quot;&gt;&lt;/svg&gt;
</code></pre>
<p>We got <code>{ root }</code> from transforming, and possible extraneous assets <code>{ styles, scripts }</code>.</p>
<p>Now we can render a markmap to the SVG element:</p>
<pre><code class="language-js">// load with &lt;script&gt;
const { markmap } = window;
// or with ESM
import * as markmap from &#39;markmap-view&#39;;

const { Markmap, loadCSS, loadJS } = markmap;

// 1. load assets
if (styles) loadCSS(styles);
if (scripts) loadJS(scripts, { getMarkmap: () =&gt; markmap });

// 2. create markmap
// \`options\` is optional, i.e. \`undefined\` can be passed here
Markmap.create(&#39;#markmap&#39;, options, root);
</code></pre>
<p>The first argument of <code>Markmap.create</code> can also be an actual SVG element, for example:</p>
<pre><code class="language-js">const svgEl = document.querySelector(&#39;#markmap&#39;);
Markmap.create(svgEl, options, data);
</code></pre>
<h3 id="markmap-cli">markmap-cli</h3>
<p><img src="https://img.shields.io/npm/v/markmap-cli.svg" alt="NPM"></p>
<p>Use markmap command-line in a local terminal.</p>
<h4 id="usage-2">Usage</h4>
<pre><code class="language-sh">$ npx markmap-cli markmap.md
</code></pre>
<p>You can also install it globally:</p>
<pre><code class="language-sh">$ yarn global add markmap-cli
$ markmap markmap.md
</code></pre>
<p>There is a watch mode so that you could edit the Markdown file and get updates on the fly:</p>
<pre><code class="language-sh">$ markmap -w markmap.md
</code></pre>
<h3 id="coc-markmap">coc-markmap</h3>
<p><img src="https://img.shields.io/npm/v/coc-markmap.svg" alt="NPM"></p>
<h4 id="installation-2">Installation</h4>
<p>Make sure <a href="https://github.com/neoclide/coc.nvim">coc.nvim</a> is started.</p>
<p>Then install with the Vim command:</p>
<pre><code>:CocInstall coc-markmap
</code></pre>
<h4 id="usage-3">Usage</h4>
<p>Open a Markdown file in Vim / Neovim, and execute:</p>
<pre><code class="language-viml">:CocCommand markmap.create
</code></pre>
<p>An HTML file with the same basename as the Markdown file will be created and opened in your default browser.</p>
<p>Visualization of selected text is also supported.</p>
<h2 id="migration-notes">Migration notes</h2>
<h3 id="010x---011x">0.10.x -&gt; 0.11.x</h3>
<p>There is a transformer instance now:</p>
<pre><code class="language-diff">- import { transform, getUsedAssets, getAssets, fillTemplate } from &#39;markmap-lib&#39;;
+ import { Transformer, fillTemplate } from &#39;markmap-lib&#39;;

+ const transformer = new Transformer();

- const { root, features } = transform(markdown);
+ const { root, features } = transformer.transform(markdown);

- const { styles, scripts } = getUsedAssets(features);
+ const { styles, scripts } = transformer.getUsedAssets(features);
  // or
- const { styles, scripts } = getAssets();
+ const { styles, scripts } = transformer.getAssets();
</code></pre>
<h3 id="09x---010x">0.9.x -&gt; 0.10.x</h3>
<p>The entrance has changed:</p>
<pre><code class="language-diff">- import { transform, getUsedAssets, getAssets } from &#39;markmap-lib/dist/transform&#39;;
- import { fillTemplate } from &#39;markmap-lib/dist/template&#39;;
+ import { transform, getUsedAssets, getAssets, fillTemplate } from &#39;markmap-lib&#39;;

- import * as markmap from &#39;markmap-lib/dist/view&#39;;
- import { Markmap, loadCSS, loadJS } from &#39;markmap-lib/dist/view&#39;;
+ import * as markmap from &#39;markmap-view&#39;;
+ import { Markmap, loadCSS, loadJS } from &#39;markmap-view&#39;;
</code></pre>
<h3 id="08x---09x">0.8.x -&gt; 0.9.x</h3>
<p>In 0.9.x the plugins at rendering time are removed in favor of the transforming plugins. As a result, the generated markmap can be loaded faster with less overhead and hopefully without flash of untranspiled code. The transforming plugins are enabled on demand, i.e. when the markdown content is detected to have the feature included.</p>
<p>So the changes are:</p>
<h4 id="transforming">Transforming</h4>
<p>We get both the root node and a map of used features. Then we get the assets list for future usage.</p>
<pre><code class="language-diff">- import { transform } from &#39;markmap-lib/dist/transform&#39;;
+ import { transform, getUsedAssets, getAssets } from &#39;markmap-lib/dist/transform&#39;;

- const root = transform(markdown);
+ const { root, features } = transform(markdown);

+ const assets = getUsedAssets(features);
+ // or just get all possible assets if the content may change in the future
+ const assets = getAssets();
</code></pre>
<h4 id="filling-the-template">Filling the template</h4>
<p>We need to inject the extraneous assets required by plugins to the output.</p>
<pre><code class="language-diff">  import { fillTemplate } from &#39;markmap-lib/dist/template&#39;;

- const html = fillTemplate(root);
+ const html = fillTemplate(root, assets);
</code></pre>
<h4 id="render">Render</h4>
<p>We don&#39;t need to load the view plugins any more, but we&#39;ll have to include the assets if plugin features are used.</p>
<pre><code class="language-diff">- import { Markmap, loadPlugins } from &#39;markmap-lib/dist/view&#39;;
+ import * as markmap from &#39;markmap-lib/dist/view&#39;;
+ import { Markmap, loadCSS, loadJS } from &#39;markmap-lib/dist/view&#39;;

+ const { styles, scripts } = assets;
+ if (styles) loadCSS(styles);
+ if (scripts) loadJS(scripts, { getMarkmap: () =&gt; markmap });

- loadPlugins([
-   &#39;mathJax&#39;,
-   &#39;prism&#39;,
- ])
- .then(() =&gt; {
    Markmap.create(&#39;#markmap&#39;, null, data);
- });
</code></pre>
<p>Note that the scripts may want to access <code>markmap</code> module, so we should export a <code>getMarkmap</code> method to <code>loadScript</code>. However this can be omitted if your markmap library is loaded from CDN and can be accessed via <code>window.markmap</code>.</p>
<pre><code class="language-diff">+ &lt;script src=&quot;https://cdn.jsdelivr.net/npm/markmap-lib/dist/browser/view.min.js&quot;&gt;&lt;/script&gt;
</code></pre>
<pre><code class="language-diff">  console.log(window.markmap); // -&gt; the markmap object
- if (scripts) loadJS(scripts, { getMarkmap: () =&gt; markmap });
+ if (scripts) loadJS(scripts);
</code></pre>
`;function j(m,r,o){const t=m.slice();return t[5]=r[o],t}function x(m){let r,o,t=m[1],s=[];for(let e=0;e<t.length;e+=1)s[e]=q(j(m,t,e));return{c(){r=k("aside"),o=k("ul");for(let e=0;e<s.length;e+=1)s[e].c();this.h()},l(e){r=w(e,"ASIDE",{class:!0,style:!0});var i=v(r);o=w(i,"UL",{class:!0});var n=v(o);for(let a=0;a<s.length;a+=1)s[a].l(n);n.forEach(c),i.forEach(c),this.h()},h(){h(o,"class","toc"),h(r,"class","bg-gray-100 p-4 hidden lg:block overflow-auto"),E(r,"width","240px")},m(e,i){M(e,r,i),f(r,o);for(let n=0;n<s.length;n+=1)s[n].m(o,null)},p(e,i){if(i&6){t=e[1];let n;for(n=0;n<t.length;n+=1){const a=j(e,t,n);s[n]?s[n].p(a,i):(s[n]=q(a),s[n].c(),s[n].m(o,null))}for(;n<s.length;n+=1)s[n].d(1);s.length=t.length}},d(e){e&&c(r),V(s,e)}}}function q(m){let r,o,t=m[5].title+"",s,e,i,n;return{c(){r=k("li"),o=k("a"),s=I(t),i=y(),this.h()},l(a){r=w(a,"LI",{class:!0});var l=v(r);o=w(l,"A",{href:!0});var u=v(o);s=$(u,t),u.forEach(c),i=S(l),l.forEach(c),this.h()},h(){h(o,"href",e="#"+m[5].id),A(o,"active",m[5]===m[2]),h(r,"class",n="toc-item toc-"+m[5].depth)},m(a,l){M(a,r,l),f(r,o),f(o,s),f(r,i)},p(a,l){l&2&&t!==(t=a[5].title+"")&&J(s,t),l&2&&e!==(e="#"+a[5].id)&&h(o,"href",e),l&6&&A(o,"active",a[5]===a[2]),l&2&&n!==(n="toc-item toc-"+a[5].depth)&&h(r,"class",n)},d(a){a&&c(r)}}}function Z(m){let r,o,t,s,e,i,n,a,l,u,T,p=m[1]&&x(m);return a=new K({}),{c(){r=k("meta"),o=y(),t=k("main"),p&&p.c(),s=y(),e=k("div"),i=new P(!1),n=y(),W(a.$$.fragment),this.h()},l(d){const g=D('[data-svelte="svelte-1m2buf9"]',document.head);r=w(g,"META",{name:!0,content:!0}),g.forEach(c),o=S(d),t=w(d,"MAIN",{class:!0});var b=v(t);p&&p.l(b),s=S(b),e=w(b,"DIV",{class:!0});var _=v(e);i=F(_,!1),n=S(_),G(a.$$.fragment,_),_.forEach(c),b.forEach(c),this.h()},h(){document.title="markmap docs",h(r,"name","Description"),h(r,"content","The documentation of markmap packages."),i.a=n,h(e,"class","markdown flex-1 min-w-0 p-4 lg:pr-12 overflow-auto"),h(t,"class","flex md:fs")},m(d,g){f(document.head,r),M(d,o,g),M(d,t,g),p&&p.m(t,null),f(t,s),f(t,e),i.m(Q,e),f(e,n),H(a,e,null),m[4](e),l=!0,u||(T=L(e,"scroll",m[3]),u=!0)},p(d,[g]){d[1]?p?p.p(d,g):(p=x(d),p.c(),p.m(t,s)):p&&(p.d(1),p=null)},i(d){l||(R(a.$$.fragment,d),l=!0)},o(d){B(a.$$.fragment,d),l=!1},d(d){c(r),d&&c(o),d&&c(t),p&&p.d(),Y(a),m[4](null),u=!1,T()}}}const ee=X([{type:"script",data:{src:"https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js"}},{type:"script",data:{src:"https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js"}}]);function ae(m,r,o){let t,s,e;function i(){if(!s)return;let a;for(const l of s){if(l.el.getBoundingClientRect().top>100)break;a=l}o(2,e=a||s[0])}z(async()=>{o(1,s=Array.from(t.querySelectorAll("h1,h2,h3,h4,h5,h6"),a=>({el:a,id:a.id,title:a.textContent,depth:+a.tagName.toLowerCase().slice(1)}))),i(),await ee,window.Prism.highlightAllUnder(t)});function n(a){O[a?"unshift":"push"](()=>{t=a,o(0,t)})}return[t,s,e,i,n]}class re extends C{constructor(r){super(),U(this,r,ae,Z,N,{})}}export{re as default};
