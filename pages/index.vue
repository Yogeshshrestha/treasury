<template>
  <!-- <v-row justify="center" align="center"> -->
  <!-- <v-col cols="12" sm="8" md="6"> -->
  <div v-if="loaded" style="background:#F7F7F9;">
    <div v-if="showTreasury" class="pa-3 relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0"
      style="background:#F7F7F9; width: 900px">
      <h3 class="black-text">Welcome to the treasury Management System</h3>
      <p class="para-text" style="width:700px">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus,
        nam dolorem
        soluta
        illo dignissimos
        animi impedit sed, culpa necessitatibus veritatis aliquam reprehenderit earum ullam cumque, quaerat
        deleniti laudantium suscipit? Est.</p>
      <v-card color="#fff" class="pa-3">
        <v-card-title class="black-text font-weight-bold">Create New treasury</v-card-title>
        <v-card-text class="para-text" style="width:500px;">Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
          Suscipit, culpa
          eligendi? Ad omnis
          aut, laborum
          voluptas debitis eos mollitia recusandae natus provident facilis soluta inventore ipsam expedita
          eveniet
          dignissimos quas.
        </v-card-text>
        <v-card-actions>
          <ReusableBlueButton class="pa-6" @click="treasuryFlow()" btnText="Create New Treasury" />
          <ReusableBlueButton class="pa-3" @click="getTransact()" btnText="transaction" />
        </v-card-actions>
      </v-card>
    </div>

    <!-- treasury FLoww -->
    <div v-if="showCard" class="pa-3 relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0"
      style=" width:900px;">
      <h3 class="black-text mb-6">Create New treasury</h3>
      <v-stepper v-model="e1" alt-labels flat dense style="background: transparent">
        <v-stepper-header style="box-shadow: none;">
          <v-stepper-step step="1" :complete="e1 > 1" class="text-center">
            Create new treasury
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2" :complete="e1 > 2">
            Owners and Confirmations
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">
            Review
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <!-- create new treasury -->
            <v-card color="#fff" width="900" class="pa-3">
              <v-card-text class="para-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit, culpa
                eligendi? Ad omnis
                aut, laborum
                voluptas debitis eos mollitia recusandae natus provident facilis soluta inventore ipsam
                expedita
                eveniet
                dignissimos quas.
              </v-card-text>
              <v-row class="px-4">
                <v-col cols="6">
                  <label class="text-caption label-text" for="create">Name of the new
                    treasury</label>
                  <v-text-field label="Name" id="create" single-line outlined color="#C0BABA"></v-text-field>
                </v-col>
              </v-row>
              <v-card-text class="text-caption label-text">By continuing you consent
                to the
                <span class="link-text">terms of use</span> and
                <span class="link-text">privacy policy</span>.
              </v-card-text>
              <v-row class="mx-6">
                <v-col cols="8">
                  <v-spacer></v-spacer>
                </v-col>
                <v-col cols="4" align="right">
                  <v-card-actions>
                    <v-btn outlined color="#C0BABA" @click="treasuryFlowCancel()"
                      class="cancel py-3 px-6">Cancel</v-btn>
                    <v-btn class="py-3 px-6" color="primary" @click="e1 = 2">Continue</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>

          </v-stepper-content>
          <v-stepper-content step="2">
            <!-- Owner Confirmation-->
            <v-card class="pa-3" color="#fff" width="900">
              <v-card-text class="para-text" style="width:650px;">Lorem ipsum dolor sit amet consectetur
                adipisicing elit.
                Suscipit, culpa
                eligendi? Ad omnis
                aut, laborum
                voluptas debitis eos mollitia recusandae natus provident facilis soluta inventore ipsam
                expedita
                eveniet
                dignissimos quas.
              </v-card-text>
              <v-card-text class="para-text" style="width:650px;">Lorem ipsum dolor sit amet consectetur
                adipisicing elit.
                Suscipit, culpa
                eligendi? Ad omnis
                aut, laborum
              </v-card-text>
              <div v-for="(input, index) in ownersField" :key="`phoneInput-${index}`">
                <v-row no-gutter class="px-4">
                  <v-col cols="4">
                    <label for="Name" class="label-text text-caption">Owner Name</label>
                    <v-text-field v-model="ownersField.ownerName" label="Name" id="Name" single-line outlined
                      dense></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <label for="Name" class="label-text text-caption">Owner Address</label>
                    <v-text-field v-model="ownersField.ownerAddress" label="Address" id="Name" single-line outlined
                      dense>
                      <template v-slot:append>
                        <v-icon class="mr-n2" style="color: #02AE61 !important;">mdi-check-circle</v-icon>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="2" align="left" class="mt-7">
                    <v-icon @click="addField(input, ownersField)">mdi-plus-circle-outline</v-icon>
                    <v-icon v-show="ownersField.length > 1"
                      @click="removeField(index, ownersField)">mdi-delete-outline</v-icon>
                  </v-col>
                </v-row>
              </div>
              <v-card-text class="text-caption black-text">By continuing you consent to the terms of use
                and privacy
                policy.</v-card-text>
              <v-row class="px-4">
                <v-col cols="8">
                  <v-spacer></v-spacer>
                </v-col>
                <v-col cols="4" align="right">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <ReusableBorderTransparentBtn @click="e1 = 1" btnText="Back" />
                    <ReusableBrownBtn @click="e1 = 3" btnText="Continue" />
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-stepper-content>
          <!-- Review treasury -->
          <v-stepper-content step="3">
            <v-card color="#fff" class="pa-3" width="900">
              <v-row justify="space-between">
                <v-col cols="4">
                  <v-card-title class="mb-4 para-text text-body-1">Details</v-card-title>
                  <v-card-subtitle class="label-text text-body-2">Name of new
                    Treasury</v-card-subtitle>
                  <v-card-text class="mt-n4 black-text font-weight-bold">{{ ownersField.ownerName }}</v-card-text>
                  <v-card-subtitle class="label-text text-body-2">Confirmation of</v-card-subtitle>
                  <v-card-text class="mt-n4 black-text font-weight-bold">1 out of 1
                    owners</v-card-text>
                </v-col>
                <v-col cols="8">
                  <v-card-title class="mb-3 para-text text-body-1">1 Treasure Owners</v-card-title>
                  <!-- <v-card-subtitle class="label-text text-body-2">{{ ownersField.ownerName }}</v-card-subtitle> -->
                  <v-card-text>
                    <img class="mr-1" width="20" height="20" src="~/assets/images/meta-mask.png"
                      style="vertical-align: middle;" />
                    <span class="font-weight-bold black-text">eth:</span>
                    {{ ownersField.ownerAddress }}
                  </v-card-text>
                </v-col>
              </v-row>
              <v-card-text class="text-center para-text px-9" style="width: 700px;">Lorem ipsum dolor sit,
                amet
                consectetur adipisicing
                elit.
                Iure incidunt,
                dolorem vero quo saepe sed harum eos? Quod, ad alias natus modi quia recusandae esse,
                iste libero aut ullam quas.</v-card-text>
              <v-row class="px-4">
                <v-col cols="8">
                  <v-spacer></v-spacer>
                </v-col>
                <v-col cols="4" align="right">
                  <v-card-actions>
                    <ReusableBorderTransparentBtn @click="e1 = 2" btnText="Back" />
                    <div v-for="(item, i) in aptbutton" :key="i">
                      <ReusableBrownBtn btnText="Confirm" @click="multisig()" />
                      <!-- <ReusableBrownBtn btnText="Confirm" @click="selectAPT(item.lamports)" /> -->
                    </div>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
  <!-- </v-col> -->
  <!-- </v-row> -->
</template>

<script>
import axios from "axios";

export default {
  name: 'IndexPage',
  data() {
    return {
      event_handle: "0x3::token::TokenStore",

      showTreasury: true,
      showCard: false,
      e1: 1,

      inputs: [{
        name: ""
      }],
      ownersField: [{
        ownerName: "",
        ownerAddress: ""
      }],
      aptOwners: [{
        value: "0.1",
        lamports: "100000000",
      }],
      aptbutton: [],
      aptValue: null,
      createdTreasury: null,
      loaded: false,
      event_handle: "0x3::token::TojenStore",
      metadata: [],
      staked: [],
      olderStake: [],
      claiming: false,
    }
  },
  computed: {
    walletAddr() {
      return this.$store.state.wallet.walletAddr;
    },
    walletType() {
      return this.$store.state.wallet.walletType;
    },
  },
  methods: {
    buttonCreate() {
      this.aptbutton = this.aptOwners;
    },
    selectAPT(value) {
      this.aptValue = value;
      this.$store.commit("wallet/setAPTValue", value);
    },
    ownerConfirm() {
      // const ownAdd = 
      // this.el = 3;
      this.reviewAddress = this.ownersField.ownerAddress;
    },
    treasuryFlow() {
      this.showCard = true;
      this.showTreasury = false;
    },
    treasuryFlowCancel() {
      this.showCard = false;
      this.showTreasury = true;
    },
    addField(value, fieldType) {
      fieldType.push({ value: "" });
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },

    async multisig() {
      if (this.aptValue != null) {
        this.$store.commit("wallet/setDisabled", true);
        // this.$store.commit("wallet/setCreateTreasury", this.)
        this.$store.commit("wallet/setAPTValue", this.aptValue);
        await this.$store.dispatch("wallet/checkTreasury");
      } else {
        this.$toast
          .error("unexpexted")
          .goAway(3000);
      }
    },
    async getTransact() {
      let sender = this.walletAddr;
      let payload = {
        function: process.env.STAKE_PID + "::acl_based_mb::create_multisig",
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
        arguments: [this.walletAddr, this.$store.dispatch('wallet/createNonce')]
      }
      let transaction = await window.martian.generateTransaction(sender, payload);
      // let signedTxn = await window.martian.signTransaction(transaction);
      // let txnHash = await window.martian.submitTransaction(signedTxn);
    },

    // checkTransact(txnHash) {
    //   let checkTransactloop = () => {
    //     return this.signed
    //   }
    // },
    async create_transaction() {

    }
  },
  async mounted() {
    this.loaded = true;
    this.$store.commit("wallet/setDisabled", false);
    this.$store.commit("wallet/setCreateTreasury", null);
    this.$store.commit("wallet/setAPTValue", null);
    this.buttonCreate();

    //   if (this.walletAddr) {
    //     try {
    //       let resource = await axios.get(`https://fullnode.${process.env.RPC_NETWORK}.aptoslabs.com/v1/accounts/${this.walletAddr}/resources`)

    //       if (resource.data.length > 0) {
    //         for (var i = 0; i < resource.data.length; i++) {
    //           if (
    //             resource.data[i].type == process.env.STAKE_PID + "::acl_based_mb::ResourceInfo"
    //           ) {
    //             let tokens = resource.data[i].data.source.data;
    //             for (var j = 0; j < tokens.length; j++) {
    //               let stake = await axios.get(`https://fullnode.${process.env.RPC_NETWORK}.aptoslabs.com/v1/accounts/${tokens[j].value}/resources`)


    //               for (var k = 0; k < stake.data.length; k++) {
    //                 if (
    //                   stake.data[k].type ==process.env.STAKE_PID + ""
    //                 )
    //               }
    //               axios.post(
    //                 `https://fullnode.${process.env.RPC_NETWORK}.aptoslabs.com/v1/tables/${process.env.STAKE_TABLE_HANDLE}/item`, {
    //                 key_type: "0x3::token::TokenDataId",
    //                 value_type: "0x3::token::TokenData",
    //                 key: {
    //                   collection: "Aptos Flip",
    //                   creator: process.env.STAKE_CREATOR,
    //                   name: stake.data[k].data.toke_name,
    //                   property_version: "0",
    //                 },
    //               }
    //               )


    //             }
    //           }
    //         }
    //       }
    //     }
    //     catch (e) {
    //     }
    //     this.getEvents(this.walletAddr);
    //   }
    //   else {
    //     this.$router.push("/");
    //     this.$store.dispatch("wallet/connectWallet");
    //   }
  }
}
</script>
