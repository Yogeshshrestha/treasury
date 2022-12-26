<template>
    <v-btn class="btn-blue pa-3" @click="$emit('click')">
        {{ btnText }}
    </v-btn>
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
.btn-blue {
    background: linear-gradient(180deg, #307CD6 0%, rgba(3, 47, 99, 0.8) 100%);
    color: #fff !important;
}
</style>