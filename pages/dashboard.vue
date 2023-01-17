<template>
    <div>
        <h1>DashBoard</h1>
        <v-row>
            <v-col cols="12" lg="4" md="6" v-for="(item, i) in metadata" :key="i">
                <div class="nftCard">
                    <v-col align="center">
                        <v-img :src="item.image" height="200" class="mx-5" :lazy-src="item.image">
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>
                        <p>
                            <b>{{ item.title }}</b>
                        </p>
                        <div class="stake-btn-outer mb-5" @click="stakeUnstake(item)">
                            <div class="btn-stake px-4 py-1">
                                <v-progress-circular v-if="staking == item.name" :size="25" color="white"
                                    indeterminate></v-progress-circular>
                                <span v-else>{{ checkStake(item) }}</span>
                            </div>
                        </div>
                        <div class="stake-btn-outer mb-5" @click="claimReward(item)">
                            <div v-if="staked.includes(item.name)" class="btn-stake px-4 py-1">
                                <v-progress-circular v-if="claiming == item.name" :size="25" color="white"
                                    indeterminate></v-progress-circular>
                                <span>Claim Reward</span>
                            </div>
                        </div>
                        <br />
                        <small v-if="!staked.includes(item.name)">{{ getAFT(item) }} AFT
                            per day</small>
                    </v-col>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="css">

</style>