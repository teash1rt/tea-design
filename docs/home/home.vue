<template>
    <div ref="homeRef" :class="['home', { 'fade-in': isShow }]">
        <div class="home-header">
            <p class="home-header-title">快速使用</p>
        </div>
        <div class="home-body">
            <editor>
                <div id="editor">
                    <div class="home-terminal">
                        <pre
                            ref="block"
                            style="border: 0; margin: 0; background-color: transparent"
                            class="language-vue extra-class"></pre>
                    </div>
                </div>
            </editor>
        </div>
    </div>
</template>

<script setup lang="ts">
import TypeIt from 'typeit'
import { El } from 'typeit/dist/types'
import { ref, onMounted, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import editor from './editor.vue'

const homeRef = ref(null)
const isShow = ref<boolean>(false)

useIntersectionObserver(homeRef, ([{ isIntersecting }]) => {
    isShow.value = isIntersecting
})

const isMount = ref(false)
const isFirst = ref(true)

const block = ref<El>()

watch([isShow, isMount], newV => {
    if (newV?.[0] && newV?.[1] && isFirst.value === true) {
        isFirst.value = false
        new TypeIt(block.value!, {
            speed: 50,
            startDelay: 900
        })
            .type('<h1 style="opacity: 0.5;color: var(--vi-welcome-color)">Welcome to use Tea Design</h1>', {
                delay: 100
            })
            .type(
                `<br /><span><span style="color:var(--code-token-keyword);">npm</span><span style="color:var(--code-color-text);"> install tea-design</span></span>`
            )
            .type(
                `<br /><br /><span><span style="color:var(--code-token-keyword);">import</span><span style="color:var(--code-color-text);"> { createApp } </span><span style="color:var(--code-token-keyword);">from</span><span style="color:var(--code-color-text);"> </span><span style="color:var(--code-token-string-expression);">'vue'</span>`
            )
            .type(
                `<br /><span><span style="color:var(--code-token-keyword);">import</span><span style="color:var(--code-color-text);"> App </span><span style="color:var(--code-token-keyword);">from</span><span style="color:var(--code-color-text);"> </span><span style="color:var(--code-token-string-expression);">'./App.vue'</span></span>`
            )
            .type(
                '<br /><span><span style="color:var(--code-token-keyword);">import</span><span style="color:var(--code-color-text);"> TeaDesign </span><span style="color:var(--code-token-keyword);">from</span><span style="color:var(--code-color-text);"> </span><span style="color:var(--code-token-string-expression);">\'tea-design\'</span></span>'
            )
            .type(
                `<br /><span><span style="color:var(--code-token-keyword);">import</span><span style="color:var(--code-color-text);"> </span><span style="color:var(--code-token-string-expression);">'tea-design/dist/style.css'</span></span>`
            )
            .type(
                `<br /><br /><br /><span><span style="color:var(--code-token-function);">createApp</span><span style="color:var(--code-color-text);">(app)</span><span style="color:var(--code-token-function);">.use</span><span style="color:var(--code-color-text);">(TeaDesign).</span><span style="color:var(--code-token-function);">mount</span><span style="color:var(--code-color-text);">(</span><span style="color:var(--code-color-text);">'#app'</span><span style="color:var(--code-color-text);">)</span>`
            )
            .go()
    }
})

onMounted(() => {
    isMount.value = true
})
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    max-width: 1152px;
    opacity: 0;
    margin: 0 auto;
    margin-top: 140px;
    padding-top: 120px;
    border-top: 1px solid rgba(28, 31, 35, 0.08);
    &-header {
        text-align: center;
        &-title {
            font-size: 32px;
            color: var(--vi-color-primary);
            margin-bottom: 70px;
        }
    }
    &-body {
        height: 400px;
    }
}

.fade-in {
    opacity: 1;
    transition: opacity 0.8s 0.2s ease;
}

#editor {
    display: flex;
    overflow: hidden;
}

.home-terminal {
    & > pre {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .home-terminal {
        font-size: 12px;
        margin: 12px 12px;
    }
}

@media (max-width: 370px) {
    .home-terminal {
        font-size: 12px;
        margin: 12px 12px;
    }
}
</style>
