<template>
    <v-btn outlined color="#C0BABA" @click="$emit('click')" class="cancel py-3 px-6">{{ btnText }}</v-btn>
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
.cancel .v-btn__content {
    color: #628E72 !important;
}
</style>