<template>
    <div>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <div>
                    <v-img v-if="walletType == 'Martian'" :src="require('~/assets/images/meta-mask.svg')"
                        max-width="20"></v-img>
                    <v-img v-else-if="walletType == 'Petra'" :src="require('~/assets/images/meta-mask.svg')"
                        max-width="20"></v-img>
                </div>
                <span v-if="walletAddr" v-bind="attrs" v-on="on">{{ walletAddr.slice(0, 5) + '...' +
        walletAddr.slice(-4)
}}</span>
            </template>
            <v-list>
                <v-list-item @click="$store.dispatch('wallet/logout')">
                    <v-list-item-title>
                        Disconnect
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        profile() {
            return this.$store.state.wallet.profile
        },
        walletAddr() {
            return this.$store.state.wallet.walletAddr
        },
        walletType() {
            return this.$store.state.wallet.walletType
        }
    }
}
</script>

<style lang="css" scoped>

</style>