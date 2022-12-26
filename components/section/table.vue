<template>
    <div class="relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0">
        <template>
            <v-data-table :headers="headers" :src="assets" :items="assets" sort-by="balance" class="elevation-1"
                style="background: #fff;">
                <template v-slot:top>
                    <!-- <v-toolbar flat> -->
                    <v-dialog v-model="dialog" max-width="600px">
                        <!-- <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                    New Item
                                </v-btn>
                            </template> -->
                        <v-card v-if="assetSend" width="600" style="position:relative; overflow: hidden;">
                            <v-card-title>Send APT</v-card-title>
                            <v-divider></v-divider>
                            <v-card-subtitle>Sending Form</v-card-subtitle>
                            <v-row justify="space-between align-center" class="px-6">
                                <v-col cols="1">
                                    <img src="~/assets/images/meta-mask.png">
                                </v-col>
                                <v-col cols="10">
                                    <v-card-subtitle>Mokshya</v-card-subtitle>
                                    <v-card-title>0x99a27b4a136b153482e3042855bcfb148515fbae23fb0229a780986445e989db</v-card-title>
                                    <v-card-title>Balance: 1.25 APT</v-card-title>
                                </v-col>
                                <v-col cols="1">
                                    <v-icon>mdi-content-copy</v-icon>
                                </v-col>
                            </v-row>
                            <v-row class="px-6">
                                <v-col cols="12">
                                    <label class="label-text" for="create">Name of the new Sub-treasury</label>
                                    <v-text-field label="Name" id="create" single-line outlined
                                        color="#C0BABA"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <label class="label-text" for="create">Name of the new Sub-treasury</label>
                                    <v-text-field label="Name" id="create" single-line outlined
                                        color="#C0BABA"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-card-actions class="justify-center">
                                <v-btn outlined color="#C0BABA" @click="close">Cancel</v-btn>
                                <v-btn color="primary" @click="assetReviews()">Review</v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-card v-if="assetReview">
                            <v-card-title>Send APT</v-card-title>
                            <v-divider></v-divider>
                            <div class="mt-3 d-flex align-center justify-center flex-column">
                                <img width="20" src="~/assets/images/crypto.svg" />
                                <v-card-subtitle>0.25 APT</v-card-subtitle>
                            </div>
                            <v-card-subtitle>Sending Form</v-card-subtitle>
                            <v-row justify="space-between align-center" class="px-6">
                                <v-col cols="1">
                                    <img src="~/assets/images/meta-mask.png">
                                </v-col>
                                <v-col cols="10">
                                    <v-card-subtitle>Mokshya</v-card-subtitle>
                                    <v-card-title>0x99a27b4a136b153482e3042855bcfb148515fbae23fb0229a780986445e989db</v-card-title>
                                    <v-card-title>Balance: 1.25 APT</v-card-title>
                                </v-col>
                                <v-col cols="1">
                                    <v-icon>mdi-content-copy</v-icon>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-card-subtitle>Sending Form</v-card-subtitle>
                            <v-row justify="space-between align-center" class="px-6">
                                <v-col cols="1">
                                    <img src="~/assets/images/meta-mask.png">
                                </v-col>
                                <v-col cols="10">
                                    <v-card-subtitle>Mokshya</v-card-subtitle>
                                    <v-card-title>0x99a27b4a136b153482e3042855bcfb148515fbae23fb0229a780986445e989db</v-card-title>
                                    <v-card-title>Balance: 1.25 APT</v-card-title>
                                </v-col>
                                <v-col cols="1">
                                    <v-icon>mdi-content-copy</v-icon>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-card-actions class="justify-center">
                                <v-btn outlined color="#C0BABA" @click="assetReviewsUndo()">Back</v-btn>
                                <v-btn color="primary" @click="assetReviews()">Submit</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this
                                item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- </v-toolbar> -->
                </template>
                <template v-slot:item.actions="{ item }">
                    <div>
                        <ReusableBlueButton @click="editItem(item)" btnText="send" />
                        <ReusableBlueButton btnText="Deposite" />
                    </div>
                    <!-- <v-icon small class="mr-2" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
                        mdi-delete
                    </v-icon> -->
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">
                        Reset
                    </v-btn>
                </template>
            </v-data-table>
        </template>
        <!-- </div> -->
    </div>
</template>
<script>
export default {
    data: () => ({
        assetSend: true,
        assetReview: false,
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'Asset',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Balance', value: 'balance' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        assets: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            balance: 0,
        },
        defaultItem: {
            name: '',
            balance: 0,
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        assetReviews() {
            this.assetSend = false;
            this.assetReview = true;
        },
        assetReviewsUndo() {
            this.assetSend = true;
            this.assetReview = false;
        },
        initialize() {
            this.assets = [
                {
                    src: '~/assets/images/crypto.svg',
                    name: 'Aptos',
                    balance: 159 + "APT",
                },
                {
                    src: '~/assets/images/crypto.svg',
                    name: 'USDT',
                    balance: 237,
                },
            ]
        },

        editItem(item) {
            // this.editedIndex = this.assets.indexOf(item)
            // this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.assets.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.assets.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
    },
}
</script>

<style lang="css">
.elevation-1 .theme--dark.v-select .v-select__selections,
.elevation-1 .v-icon.v-icon,
.elevation-1 .text-start,
.elevation-1 .theme--dark.v-data-table .v-data-table-header th.sortable.active .v-data-table-header__icon,
.elevation-1 .v-data-footer {
    color: #000 !important;
}
</style>    