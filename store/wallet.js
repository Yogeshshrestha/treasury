var nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");
import axios from "axios";

export const state = () => ({
  walletAddr: null,
  walletType: null,
  publicKey: null,
  choose: false,
  profile: null,
  disabled: false,
  resource: null,
  apt: null,
  multisig: null,
  deposited: false,
  treasuryName: null,
  ownerName: null,
  ownerAdd: null,
  createTreasury: null,
});

export const mutations = {
  chooseWallet(state, payload) {
    state.choose = payload;
  },
  selectWalletType(state, payload) {
    state.walletType = payload;
  },
  setWallet(state, payload) {
    state.walletAddr = payload;
  },
  setDisabled(state, payload) {
    state.disabled = payload;
  },
  setProfile(state, payload) {
    state.profile = payload;
  },
  setPublicKey(state, payload) {
    state.publicKey = payload;
  },
  setResource(state, payload) {
    state.resource = payload;
  },
  setMultisigSecret(state, payload) {
    state.secret = payload;
  },
  setAPTValue(state, payload) {
    state.apt = payload;
  },
  setMultisig(state, payload) {
    state.multisig = payload;
  },
  setDeposited(state, payload) {
    state.deposited = payload;
  },
  setTreasuryName(state, payload) {
    state.treasuryName = payload;
  },
  setOwnerAdd(state, payload) {
    state.ownerAdd = payload;
  },
  setOwnerName(state, payload) {
    state.ownerName = payload;
  },
  setCreateTreasury(state, payload) {
    state.createTreasury = payload;
  },
};

export const actions = {
  async checkBalance(context) {
    try {
      let lamports = null;
      lamports = await axios.get(
        `https://fullnode.${process.env.RPC_NETWORK}.aptoslabs.com/v1/accounts/${context.state.walletAddr}/resources`
      );
      for (var x = 0; x < lamports.data.length; x++) {
        if (
          lamports.data[x].type ==
          "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
        ) {
          let balance = lamports.data[x].data.coin.value / 100000000;
          return balance.toFixed(4);
        }
      }
    } catch (e) {
      return 0;
    }
  },
  async connectWallet(context) {
    if (context.state.walletType != null) {
      if (context.state.walletType == "Martian") {
        if ("martian" in window) {
          try {
            let wallet = await window.martian.connect();
            const network = await window.martian.network();
            console.log("ok");
            if (network == process.env.NETWORK) {
              console.log("wallet:", wallet);
              context.commit("setWallet", wallet.address);
            } else {
              this.$toast.error("please change the network".goAway(300));
              context.dispatch("logout");
            }
          } catch (e) {
            context.dispatch("logout");
            this.$toast
              .error("Connection refused", {
                iconPack: "mdi",
                icon: "mdi-wallet",
                theme: "outline",
              })
              .goAway(3000);
          }
        } else {
          this.$toast
            .error("Please install martian wallet first.", {
              iconPack: "mdi",
              icon: "mdi-wallet",
              theme: "outline",
            })
            .goAway(3000);
        }
      } else if (context.state.walletType == "Petra") {
        if ("aptos" in window) {
          try {
            await window.aptos.connect();
            const network = await window.aptos.network();
            console.log("aptos network:", network);
            if (network == process.env.NETWORK) {
              context.dispatch("login");
            } else {
              context.dispatch("logout");

              this.$toast
                .error("Please change network to" + process.env.NETWORK, {
                  iconPack: "mdi",
                  icon: "mdi-wallet",
                  theme: "outline",
                })
                .goAway(3000);
            }
          } catch (e) {
            context.dispatch("logout");
            this.$toast
              .error("Connection refused", {
                iconPack: "mdi",
                icon: "mdi-wallet",
                theme: "outline",
              })
              .goAway(3000);
          }
        } else {
          this.$toast
            .error("Please install Petra wallet first", {
              iconPack: "mdi",
              icon: "mdi-wallet",
              theme: "outline",
            })
            .goAway(3000);
        }
      } else {
        context.commit("chooseWallet", true);
      }
    } else {
      context.commit("chooseWallet", true);
    }
  },

  async login(context) {
    try {
      let wallet = null;
      if (context.state.walletType == "Martian") {
        wallet = await window.martian.connect();
      } else if (context.state.walletType == "Petra") {
        wallet = await window.aptos.connect();
      } else {
        context.dispatch("logout");
        return;
      }

      context.commit("setPublicKey", wallet.address);
      if (this.$auth.strategy.token.get()) {
        let profile = this.$aut.$storage.getUniversal("uni-aptflip-user");
        context.commit("setWallet", wallet.address);
        context.commit("setProfile", profile);
        this.$axios.get("score", {
          limit: 3,
          page: 1,
        });

        context.commit("setDisabled", false);
      } else {
        let nonce = await context.dispatch("createNonce");
        let message = "Mokshya authorization" + nonce;
        const metadata = {
          message: message,
        };
        let signedMessage = null;
        if (context.state.walletType == "Martian") {
          signedMessage = await window.martian.signMessage(metadata);
          context.dispatch("signAndConnect", {
            signedMessage: signedMessage,
            wallet: wallet,
          });
        } else if (context.state.walletType == "Petra") {
          window.setTimeout(async () => {
            signedMessage = await window.aptos.signMessage(metadata);

            context.dispatch("signAndConnect", {
              signedMessage: signedMessage,
              wallet: wallet,
            });
          }, 1000);
        } else {
          context.dispatch("logout");
        }
      }
    } catch (e) {
      context.dispatch("logout");
      this.$toast
        .error("Connection Refused", {
          iconPack: "mdi",
          icon: "mdi-wallet",
          theme: "outline",
        })
        .goAway(3000);
    }
  },

  async logout(context) {
    if (context.state.walletType == "Martian") {
      window.martian.disconnect();
    } else if (context.state.walletType == "Petra") {
      window.aptos.disconnect();
    }
    context.commit("setWallet", null);
    context.commit("setProfile", null);
    context.commit("selectWalletType", null);
    context.commit("setDisabled", false);
    // this.$auth.$storage.removeUniversal("uni-aptflip-user");
    // this.$router.push("/");
    // await this.$auth.logout();
  },

  async signAndConnect(context, payload) {
    let messageBytes = new TextEncoder().encode(
      payload.signedMessage.fullMessage
    );
    let data = {
      message: nacl.util.encodeBase64(messageBytes),
      wallet_address: payload.wallet.address,
      publicKey: payload.wallet.publicKey,
      signature: payload.signedMessage.signature,
    };

    try {
      let response = await this.$auth.loginWith("local", {
        data: data,
      });

      context.commit("setWallet", payload.wallet.address);
      this.$auth.setUser(response.data.user);
      this.$auth.$storage.setUniversal("uni-aptflip-user", response.data.user);

      context.commit("setProfile", response.data.user);
      await this.$axios.setToken(response.data.token, "X-XSRF-TOKEN");
      // this.$axios
      //   .get("score", {
      //     limit: 3,
      //     page: 1,
      //   })
      //   .then((res) => {
      //     context.commit("setHistory", res.data.scores);
      //   });
      // if (context.state.flipStart == true) {
      //   context.commit("flipStart", false);
      //   this.$router.push("/flip");
      // }
      // context.commit("setDisabled", false);
    } catch (e) {
      context.dispatch("logout");
      this.$toast
        .error("Login Failed.", {
          iconPack: "mdi",
          icon: "mdi-wallet",
          theme: "outline",
        })
        .goAway(3000);
    }
  },

  async onReload(context) {
    let info = await this.$auth.$storage.getUniversal("uni-aptflip-user");
    context.commit("setProfile", info.user);
    context.commit("setWallet", info.walletAddr);
    context.commit("selectWalletType", info.walletType);
    if (context.state.walletType == "Martian") {
      await window.martian.connect();
    } else if (context.state.walletType == "Petra") {
      await window.aptos.connect();
    }
  },

  async checkAccountResource(context) {
    try {
      let transactions = null;
      transactions = await window.martian.getAccountResources(
        context.state.publicKey
      );
      for (var x = 0; x < transactions.length; x++) {
        if (
          transactions[x].type ==
          process.env.PROGRAM_ID + "::foo::Treasury"
        ) {
          context.commit("setResource", transactions[x]);
        }
      }
    } catch (e) {
      context.commit("setResource", null);
    }
  },

  async checkTreasury(context) {
    let blnc = null;
    await context.dispatch("checkBalance").then(async (res) => {
      let times = 0;
      blnc = res;
      // console.log("bl:", blnc);
      if (context.state.walletType == "Petra") {
        if (blnc == 0) {
          if (times < 5) {
            times++;
            context.dispatch("callbackFlip");
          } else {
            times = 0;
            context.dispatch("setDisabled", false);
            this.$toast
              .error("Petra did not respond.", {
                iconPack: "mdi",
                icon: "mdi-wallet",
                theme: "outline",
              })
              .goAway(3000);
            return;
          }
        } else {
          times = 0;
          context.dispatch("multisigCharge", blnc);
        }
      } else {
        context.dispatch("multisigCharge", blnc);
      }
    });
  },

  async multisigCharge(context, blnc) {
    let charge = context.state.apt / 100000000 + 0.00251; //gas fee
    if (blnc > charge) {
      const transactions = await window.martian.getAccountResources(
        context.state.publicKey
      );

      let found = null;
      let create = null;
      let trans = null;

      for (var x = 0; x < transactions.length; x++) {
        if (transactions[x].type == process.env.PROGRAM_ID + "::foo:Treasury") {
          found = true;
          create = transactions[x].data.create;
          trans = transactions[x];
          context.commit("setResource", transactions[x]);
        }
        if (found == true) {
          if (create == true) {
            //unclaimed call
            found = null;
            create = null;
            await context.dispatch("claimReward", trans.data);
          } else {
            // flip api
            context.commit("setAPTValue", trans.data.amount);
            context.commit("setcreateTreasury", trans.data.side);
            this.$router.push("/dashboard");
          }
        } else {
          await context.dispatch("multisig");
        }
      }
    } else {
      context.commit("setDisabled", false);
      this.$toast.error("Insufficent balance").goAway(3000);
    }
  },

  async multisig(context) {
    try {
      let secretText = await context.dispatch("createNonce");
      context.commit("setMultisigSecret", secretText);
      let response = null;
      if (context.state.walletType == "Martian") {
        response = await window.martian.connect();
      }

      const sender = response.address;
      context.commit("setOwnerAdd", ownerAdd[i]);
      const payload = {
        function: process.env.PROGRAM_ID + "::foo::multisig",
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
        // arguments: [this],
        arguments: [
          context.state.apt,
          context.state.createTreasury,
          context.state.secret,
        ],
      };
      let txnHash = null;
      if (context.state.walletType == "Martian") {
        const transaction = await window.martian.generateTransaction(
          sender,
          payload
        );
        const signedTxn = await window.martian.signTransaction(signedTxn);
      } else {
        this.$toast.error("failed to deposit, Please Try Again").goAway(3000);
      }

      if (txnHash) {
        context.commit("setDeposited", true);
        this.$router.push("/Dashboard");
      } else {
        this.$toast.error("Failed to deposit, Please Try Again").goAway(3000);
      }
      context.commit("setDisabled", false);
    } catch (e) {
      let msg = "Unexpected error";
      if (e == "User Rejected the request") {
        msg = "User refused to connect";
      } else if (e.message == "Service Unavailable") {
        msg = "Aptos server is not responding. Try few moments later.";
      }
      this.$toast
        .error(msg, {
          iconPack: "mdi",
          icon: "mdi-wallet",
          theme: "outline",
        })
        .goAway(3000);
      this.$router.push("/flip");
      context.commit("setDisabled", false);
    }
  },

  createNonce() {
    var character =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let nonce = "";
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        nonce += character.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      if (i < 3) {
        nonce += "-";
      }
    }
    return nonce;
  },

  // createdTreasury() {
  //   try {

  //   }
  // }
};
