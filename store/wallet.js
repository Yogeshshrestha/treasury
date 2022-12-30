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
};

export const actions = {
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
  // async connectWallet(context) {
  //   if (context.state.walletType != null) {
  //     if (context.state.walletType == "Petra") {
  //       if ("aptos" in window) {
  //         try {
  //           const response = await window.wallet.connect();

  //           const account = await window.wallet.account();
  //         } catch (error) {
  //         }
  //       }
  //     } else {
  //       context.commit("chooseWallet", true);
  //     }
  //   } else {
  //     context.commit("chooseWallet", true);
  //   }
  // },

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
      this.$axios.get("score", {
        limit: 3,
        page: 1,
      });
    } catch (e) {}
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
};
