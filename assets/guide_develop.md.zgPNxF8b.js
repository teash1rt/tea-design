import{_ as s,a,o as i,a9 as e}from"./chunks/framework.I9jlRtwA.js";const g=JSON.parse('{"title":"开发","description":"","frontmatter":{},"headers":[],"relativePath":"guide/develop.md","filePath":"guide/develop.md"}'),t={name:"guide/develop.md"},l=e('<h1 id="开发" tabindex="-1">开发 <a class="header-anchor" href="#开发" aria-label="Permalink to &quot;开发&quot;">​</a></h1><h2 id="启动项目" tabindex="-1">启动项目 <a class="header-anchor" href="#启动项目" aria-label="Permalink to &quot;启动项目&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-xiSqr" id="tab-D2nOghD" checked><label for="tab-D2nOghD"> npm </label><input type="radio" name="group-xiSqr" id="tab-10KiGZR"><label for="tab-10KiGZR"> pnpm </label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div></div></div><p>这将会下载开发所需要的全部依赖</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-GFCRE" id="tab-bAYifzm" checked><label for="tab-bAYifzm"> npm </label><input type="radio" name="group-GFCRE" id="tab-Pwlcra7"><label for="tab-Pwlcra7"> pnpm </label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div></div></div><p>这将会启动 client/App.vue ，它是开发时的预览文件</p><h2 id="运行测试" tabindex="-1">运行测试 <a class="header-anchor" href="#运行测试" aria-label="Permalink to &quot;运行测试&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-UBLtl" id="tab-UeVRP0g" checked><label for="tab-UeVRP0g"> npm </label><input type="radio" name="group-UBLtl" id="tab-IsSU4Xy"><label for="tab-IsSU4Xy"> pnpm </label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div></div></div><p>这将会运行项目中所有的 vitest 测试文件</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-th-u2" id="tab-twch4H7" checked><label for="tab-twch4H7"> npm </label><input type="radio" name="group-th-u2" id="tab-GLsQqrH"><label for="tab-GLsQqrH"> pnpm </label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coverage</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coverage</span></span></code></pre></div></div></div><p>这将会计算测试覆盖率，并在根目录下生成 coverage 覆盖率可视化目录，运行 coverage 目录下的的 index.html 可查看各组件的测试覆盖情况</p><h2 id="代码检查" tabindex="-1">代码检查 <a class="header-anchor" href="#代码检查" aria-label="Permalink to &quot;代码检查&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-xllLG" id="tab-nXdiOEY" checked><label for="tab-nXdiOEY"> npm </label><input type="radio" name="group-xllLG" id="tab-6MjRL1_"><label for="tab-6MjRL1_"> pnpm </label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> lint</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> lint</span></span></code></pre></div></div></div><p>这将会执行 eslint 代码规范检查，并执行 prettier 格式化，如果只想格式化代码而不进行代码检查，可执行下面的命令：</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-UU22B" id="tab-4KuIkAq" checked><label for="tab-4KuIkAq"> npm </label><input type="radio" name="group-UU22B" id="tab-D4YxToS"><label for="tab-D4YxToS"> pnpm </label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> format</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> format</span></span></code></pre></div></div></div><h2 id="编辑文档" tabindex="-1">编辑文档 <a class="header-anchor" href="#编辑文档" aria-label="Permalink to &quot;编辑文档&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-ACioC" id="tab-VvDZt87" checked><label for="tab-VvDZt87"> npm </label><input type="radio" name="group-ACioC" id="tab-Mp7Q9wA"><label for="tab-Mp7Q9wA"> pnpm </label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docs:dev</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docs:dev</span></span></code></pre></div></div></div><p>这将会启动 vitepress 文档</p><h2 id="项目打包" tabindex="-1">项目打包 <a class="header-anchor" href="#项目打包" aria-label="Permalink to &quot;项目打包&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group--5KZn" id="tab-J6PLhPR" checked><label for="tab-J6PLhPR"> npm </label><input type="radio" name="group--5KZn" id="tab-Oj5GlRl"><label for="tab-Oj5GlRl"> pnpm </label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div></div></div><p>这将会打包项目，并在根目录下生成 stats.html 打包结果可视化文件，运行可查看各组件的打包体积大小</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-F8juQ" id="tab-5DzX7_t" checked><label for="tab-5DzX7_t"> npm </label><input type="radio" name="group-F8juQ" id="tab-FcBi3Yt"><label for="tab-FcBi3Yt"> pnpm </label></div><div class="blocks"><div class="language-shell vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docs:build</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docs:build</span></span></code></pre></div></div></div><p>这将会打包 vitepress 文档</p>',23),p=[l];function n(d,h,o,c,r,k){return i(),a("div",null,p)}const b=s(t,[["render",n]]);export{g as __pageData,b as default};
