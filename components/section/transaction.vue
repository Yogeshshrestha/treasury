<template>
    <div class=" relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0">
        <!-- <v-tabs>
                <v-tab v-for="item in items" :key="item">
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item">
                    <v-card color="basil" flat>
                        <v-card-text>{{ text }}</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items> -->
        <template>
            <!-- <v-card flat style="background:red;"> -->
            <!-- <v-toolbar flat prominent> -->
            <!-- <template v-slot:extension> -->
            <v-tabs v-model="tabs">
                <!-- <v-tab v-for="n in 2" :key="n">
                            Item {{ n }}
                        </v-tab> -->
                <v-tab>pending</v-tab>
                <v-tab>history</v-tab>
            </v-tabs>
            <!-- </template> -->
            <!-- </v-toolbar> -->

            <v-tabs-items v-model="tabs">
                <v-tab-item>
                    <v-card class="mb-2">
                        <v-row justify="space-between" class="ma-3 pa-3">
                            <v-cols cols="1">1</v-cols>
                            <v-cols cols="2">Send</v-cols>
                            <v-cols cols="2" class="d-flex align-center">
                                <img class="mr-3" src="~/assets/images/crypto.svg" />
                                <span>-2.5 APT</span>
                            </v-cols>
                            <v-cols cols="2">1 day ago</v-cols>
                            <v-cols cols="2">1 out of 2</v-cols>
                            <v-cols cols="2">Confirmation</v-cols>
                        </v-row>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-title class="text-h5">
                            An awesome title
                        </v-card-title>
                        <v-card-text>
                            <p>
                                Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor.
                                Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae
                                euismod ligula urna in dolor. Praesent congue erat at massa.
                            </p>

                            <p>
                                Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu
                                sollicitudin urna dolor sagittis lacus. Pellentesque egestas, neque sit amet
                                convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est.
                                Etiam sit amet orci eget eros faucibus tincidunt. Donec sodales sagittis magna.
                            </p>

                            <p class="mb-0">
                                Ut leo. Suspendisse potenti. Duis vel nibh at velit scelerisque suscipit. Fusce
                                pharetra convallis urna.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
            <!-- </v-card> -->
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabs: null,
        }
    },
}
</script>

<style lang="css">
.v-slide-group__content,
.v-window__container {
    background: #F5F5F5 !important;
}
</style>