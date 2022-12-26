<template>
    <div class="pa-3 relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0">
        <!-- on Table component -->
        <div class="mb-3 black-text">
            <span><v-icon class="black-text">mdi-office-building</v-icon></span><span>Assets</span>
        </div>
        <v-card width="800" style="min-width: 800px; ">
            <div class="pa-3 text-right">
                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="#275D9E" v-bind="attrs" v-on="on" outlined>import</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>Import</v-card-title>
                        <v-card-subtitle>Name of Token</v-card-subtitle>
                        <div class="px-3">
                            <v-select :items="items" filled label="Select Token"></v-select>
                        </div>
                        <v-card-subtitle>Token Address</v-card-subtitle>
                        <div class="px-3">
                            <v-text-field label="Token Address" filled></v-text-field>
                        </div>
                        <v-card-actions class="d-flex justify-center py-3">
                            <ReusableBlueButton @click="dialog = false" btnText="Submit" />
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <SectionTable />
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            items: ['Aptos', 'USDT'],
        }
    },
}
</script>

<style lang="css">
.text-start div {
    /* display: flex;
     align-items: center;
     justify-content: center;
     gap: 6px; */
}
</style>