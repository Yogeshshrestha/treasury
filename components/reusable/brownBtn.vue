<template>
    <v-btn color="primary" class="py-3 px-6" @click="$emit('click')">{{ btnText }}</v-btn>
</template>

<script>
export default {
    props: {
        btnText: {
            type: String
        }
    }
}
</script>

<style lang="css">

</style>