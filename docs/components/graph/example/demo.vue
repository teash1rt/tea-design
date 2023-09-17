<template>
    <t-graph :context="context" />
</template>

<script setup lang="ts">
import type { GraphContext } from '../../../../src'

const context: GraphContext = {
    style: {
        canvasWidth: 850,
        canvasHeight: 350
    }
}
</script>
