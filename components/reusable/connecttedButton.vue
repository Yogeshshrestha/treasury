<!-- <template>
<v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
        <div class="con-btn" @click="$emit('click')" v-bind="attrs" v-on="on">
            <v-row justify="center">
                <div class="bg-white mt-2 mr-2">
                <v-img v-if="walletType=='Martian'" :src="require('~/assets/images/martian.svg')" max-width="30"></v-img>
                <v-img v-else-if="walletType=='Petra'" :src="require('~/assets/images/petra.svg')" max-width="30"></v-img>
            </div>
                <span class="mt-3">
                    <span v-if="walletAddr">{{walletAddr.slice(0,5)+'...'+walletAddr.slice(-4)}}</span>
                </span>
            </v-row>
        </div>
    </template>
    <v-list style="background-color:#B88E49" dense>
        <v-list-item @click="$store.dispatch('wallet/logout')">
            <v-list-item-title>Disconnect</v-list-item-title>
        </v-list-item>
    </v-list>
</v-menu>
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
        walletType(){
            return this.$store.state.wallet.walletType
        }
    }
}
</script>

<style>
.con-btn {
    cursor: pointer;
    height: 45px;
    width: 150px;
    left: 1681px;
    top: 25px;
    border-radius: 50px;
    background: linear-gradient(180deg, #D4A641 0%, #B88E49 100%);
    box-shadow: 0px 3px 1px 0px #FFFFFF80;

}
.bg-white{
    width: 30px;
    height:30px;
    padding:2px;
    background-color: white;
    border-radius: 50%;
}
</style> -->
