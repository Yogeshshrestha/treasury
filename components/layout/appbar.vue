<template>
    <div>
        <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app dark>
            <v-list>
                <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="clipped" fixed app style="background: #F7F7F9 !important; color:#000;">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="color: #000; background: #fff;" />
            <v-row justify="space-between" class="px-6">
                <v-col cols="4" align="left">
                    <p class="mb-0">Mokshya</p>
                </v-col>
                <v-spacer cols="4"></v-spacer>
                <v-col cols="4" align="right">
                    <ReusableConnectedBtn v-if="walletAddr" />
                    <ReusableConnectBtn v-else />
                </v-col>
            </v-row>
        </v-app-bar>
        <WalletChoose />
    </div>
</template>

<script>
export default {
    name: 'DefaultLayout',
    data() {
        return {
            clipped: true,
            drawer: true,
            items: [
                {
                    icon: 'mdi-home',
                    title: 'Dashboard',
                    to: '/dashboard'
                },
                {
                    icon: 'mdi-office-building',
                    title: 'Assets',
                    to: '/assets'
                },
                {
                    icon: 'mdi-file-document-check-outline',
                    title: 'Transactions',
                    to: '/transaction'
                }, {
                    icon: 'mdi-account-group',
                    title: 'Sub Treasury',
                    to: '/subTreasury'
                }

            ],
        }
    }, computed: {
        profile() {
            return this.$store.state.wallet.profile;
        },
        walletAddr() {
            return this.$store.state.wallet.walletAddr;
        },
        walletType() {
            return this.$store.state.wallet.walletType;
        },
    },
    mounted() {
        if (this.$auth.strategy.token.get()) {
            this.$store.dispatch("wallet/onReload");
        } else {
            this.$store.dispatch("wallet/logout");
        }
    }
};
</script>

<style lang="css">

</style>