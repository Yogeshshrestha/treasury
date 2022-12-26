<!-- <template>
<div class="conn-btn" @click="walletInteract()">
    <v-row justify="center">
        <span class="mt-3">
            <span v-if="walletAddr">{{walletAddr.slice(0,5)+'...'+walletAddr.slice(-4)}}</span>
            <span v-else>Connect Wallet</span>
        </span>
    </v-row>
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
        }
    },
    methods:{
        async walletInteract(){
            if(this.walletAddr){
                this.$store.dispatch('wallet/logout')
            }
            else{
                this.$store.dispatch('wallet/connectWallet')
            }
            
        }
    }
}
</script>

    
<style>
.conn-btn {
    cursor: pointer;
    height: 45px;
    width: 150px;
    border-radius: 50px;
    background: linear-gradient(180deg, #D4A641 0%, #B88E49 100%);
    box-shadow: 0px 3px 1px 0px #FFFFFF80;

}
</style> -->
