<script setup>

</script>

<template>
    <v-container
        fluid
        :class="['fill-height', 'align-start', 'bg-grey-lighten-4']">
            <v-card
            flat
            class="bg-grey-lighten-4 w-full">
                <template v-slot:title>
                    <div class="flex w-full">
                      <span class="text-h4 w-full">{{ $t('Posts') }}</span>
                      <v-btn type="button" icon="pi pi-plus" label="Create Post" raised size="large" />
                    </div>
                </template>
            </v-card>
    </v-container>
</template>
