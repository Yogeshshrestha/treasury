<!-- <template>
  <div>
    <ReusableConnectedButton v-if="walletAddr" />
    <ReusableConnectButton v-else />
  </div>
</template>

<script>
export default {
  computed: {
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
  },
};
</script> -->
