<template>
    <div class="row">
        <t-rollcall :data="names" startText="开始点名" />
        <t-rollcall />
    </div>
</template>

<script setup lang="ts">
const names = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eva',
    'Frank',
    'Grace',
    'Harry',
    'Ivy',
    'Jack',
    'Kate',
    'Liam',
    'Mia',
    'Noah',
    'Olivia'
]
</script>
