<template>
    <div style="background:#F7F7F9;">
        <div v-if="showTreasury"
            class="pa-3 relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0"
            style="background:#F7F7F9; width: 900px">
            <h3 class="black-text">Welcome to the Sub-treasury Management System</h3>
            <p class="para-text" style="width:700px">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus,
                nam dolorem
                soluta
                illo dignissimos
                animi impedit sed, culpa necessitatibus veritatis aliquam reprehenderit earum ullam cumque, quaerat
                deleniti laudantium suscipit? Est.</p>
            <v-card color="#fff" class="pa-3">
                <v-card-title class="black-text font-weight-bold">Create New Sub-treasury</v-card-title>
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
                    <ReusableBlueButton class="pa-6" @click="treasuryFlow()" btnText="Create New Sub-Treasury" />
                </v-card-actions>
            </v-card>
        </div>

        <!-- sub-treasury FLoww -->
        <div v-if="showCard" class="pa-3 relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0"
            style=" width:900px;">
            <h3 class="black-text mb-6">Create New Sub-treasury</h3>
            <v-stepper v-model="e1" alt-labels flat dense style="background: transparent">
                <v-stepper-header style="box-shadow: none;">
                    <v-stepper-step step="1" :complete="e1 > 1" class="text-center">
                        Create new Sub-treasury
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
                        <!-- create new sub-treasury -->
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
                                        Sub-treasury</label>
                                    <v-text-field label="Name" id="create" single-line outlined
                                        color="#C0BABA"></v-text-field>
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
                                        <v-text-field v-model="input.ownerName" label="Name" id="Name" single-line
                                            outlined dense></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <label for="Name" class="label-text text-caption">Owner Address</label>
                                        <v-text-field v-model="input.ownerAddress" label="Address" id="Name" single-line
                                            outlined dense>
                                            <template v-slot:append>
                                                <v-icon class="mr-n2"
                                                    style="color: #02AE61 !important;">mdi-check-circle</v-icon>
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
                                    <v-card-text
                                        class="mt-n4 black-text font-weight-bold">Metamask-ethereum-treasury</v-card-text>
                                    <v-card-subtitle class="label-text text-body-2">Confirmation of</v-card-subtitle>
                                    <v-card-text class="mt-n4 black-text font-weight-bold">1 out of 1
                                        owners</v-card-text>
                                </v-col>
                                <v-col cols="8">
                                    <v-card-title class="mb-3 para-text text-body-1">1 Treasure Owners</v-card-title>
                                    <v-card-text>
                                        <img class="mr-1" width="20" height="20" src="~/assets/images/meta-mask.png"
                                            style="vertical-align: middle;" />
                                        <span class="font-weight-bold black-text">eth:</span>
                                        0x8e888a92EBB42aB3cc9B056aa79AF465Ed7729a5
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
                                        <ReusableBrownBtn btnText="Confirm" />
                                    </v-card-actions>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showTreasury: true,
            showCard: false,
            e1: 1,
            inputs: [{
                name: ''
            }],
            ownersField: [{
                ownerName: "",
                ownerAddress: ""
            }],
        }
    },
    methods: {
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
    }
}
</script>

<style lang="css">
.v-stepper__label {
    min-width: 200px;
    text-align: center !important;
}

.v-application .primary {
    background: #413D3D !important;
    border-color: #413D3D !important;
}

.theme--dark.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)>.v-input__control>.v-input__slot fieldset {
    border: 2px solid #C0BABA !important;
    margin-bottom: 0 !important;
}

.v-text-field__details {
    display: none;
}

.theme--light.v-stepper .v-stepper__step__step {
    height: 40px;
    width: 40px;
}
</style>