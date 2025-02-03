<script setup>
import router from '@/router';


</script>

<template>
    <v-container
        fluid
        :class="['fill-height', 'align-start', 'bg-grey-lighten-4']">
        <v-container
        >

            <v-card
            flat
            class="bg-grey-lighten-4 w-full">
                <template v-slot:title>
                    <div class="flex w-full">
                        <span class="text-h4 w-full">{{ $t('Posts') }}</span>
                        <v-btn @click="() => router.push('/campaign/posts/create')" size="large" >Create Post</v-btn>
                    </div>
                </template>
                <v-card-text>
                </v-card-text>
            </v-card>
        </v-container>
    </v-container>
</template>
