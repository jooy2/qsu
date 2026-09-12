import{_ as p,C as a,o as h,c as k,ah as i,E as n,j as e,a as d}from"./chunks/framework.C2WMkNym.js";const F=JSON.parse('{"title":"objTo1d","description":"","frontmatter":{},"headers":[],"relativePath":"reference/object/objTo1d.md","filePath":"en/reference/object/objTo1d.md","lastUpdated":1788504119000}'),r={name:"reference/object/objTo1d.md"};function c(o,s,E,g,y,b){const l=a("ParamsTable"),t=a("ReturnType");return h(),k("div",null,[s[0]||(s[0]=i('<h1 id="objto1d" tabindex="-1">objTo1d <a class="header-anchor" href="#objto1d" aria-label="Permalink to &quot;objTo1d&quot;">​</a></h1><p>Merges objects from the given object to the top level of the child items and displays the key names in steps, using a delimiter (<code>.</code> by default) instead of the existing keys. For example, if an object <code>a</code> has keys <code>b</code>, <code>c</code>, and <code>d</code>, the <code>a</code> key is not displayed, and the keys and values <code>a.b</code>, <code>a.c</code>, and <code>a.d</code> are displayed in the parent step.</p><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2>',3)),n(l,{rows:[{name:"obj",type:"object",required:!0},{name:"separator",type:"string",named:!0,default:"'.'"}]}),s[1]||(s[1]=e("h2",{id:"returns",tabindex:"-1"},[d("Returns "),e("a",{class:"header-anchor",href:"#returns","aria-label":'Permalink to "Returns"'},"​")],-1)),n(t,{type:"object"}),s[2]||(s[2]=i(`<h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><div class="lang-only" data-code-lang="js"><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">objTo1d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	a: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	b: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		aa: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		bb: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	},</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	c: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">Returns:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	a: 1,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	&#39;b.aa&#39;: 1,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	&#39;b.bb&#39;: 2,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	c: 3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span></code></pre></div></div><div class="lang-only" data-code-lang="dart"><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">objTo1d</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &#39;a&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &#39;b&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;aa&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">		&#39;bb&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &#39;c&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">Returns:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	&#39;a&#39;: 1,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	&#39;b.aa&#39;: 1,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	&#39;b.bb&#39;: 2,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	&#39;c&#39;: 3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span></code></pre></div></div><div class="lang-only" data-code-lang="python"><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">objTo1d({</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">	&#39;a&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">	&#39;b&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">		&#39;aa&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">		&#39;bb&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	},</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">	&#39;c&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Returns:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 	&#39;a&#39;: 1,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 	&#39;b.aa&#39;: 1,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 	&#39;b.bb&#39;: 2,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 	&#39;c&#39;: 3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#</span></span></code></pre></div></div>`,4))])}const D=p(r,[["render",c]]);export{F as __pageData,D as default};
