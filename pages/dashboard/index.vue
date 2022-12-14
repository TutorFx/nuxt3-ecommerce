<template>
    <div>{{user}}</div>
</template>

<script setup>
const {user} = useUserStore();

definePageMeta({
  middleware: ["admin"],
  layout: "dashboard"
})
</script>