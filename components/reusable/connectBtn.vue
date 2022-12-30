<template>
    <v-btn @click="walletInteract()">
        <span class="">
            <!-- <span v-if="walletAddr">{{ walletAddr.slice(0, 5) + '...' + 'walletAddr.slic(-4)' }}</span> -->
            <span>Connect Wallet</span>
        </span>
    </v-btn>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {
        profile() {
            return this.$store.state.wallet.profile
        },
        walletAddr() {
            return this.$store.state.wallet.walletAddr
        }
    },
    methods: {
        async walletInteract() {
            if (this.walletAddr) {
                this.$store.dispatch('wallet/logout')
            }
            else {
                this.$store.dispatch('wallet/connectWallet')
            }
        }
    }
    // computed: {
    //     profile() {
    //         return this.$store.state.wallet.profile
    //     },
    //     walletAddr() {
    //         return this.$store.state.wallet.walletAddr
    //     }
    // },
    // methods: {
    //     async walletInteract() {
    //         if (this.walletAddr) {
    //             this.$store.dispatch('wallet/logout')
    //         }
    //         else P
    //         this.$store.dispatch('wallet/connectWallet')
    //     }
    // }
}
</script>

<style lang="css" scoped>

</style>