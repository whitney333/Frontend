<script setup>
    const regions = ["Hong Kong", "Taiwan", "Mainland China"]
    const { region, changeState } = defineProps({
        region: Array,
        changeState: Function
    })

</script>

<template>
  <v-expansion-panel value="region" class="mb-5">
    <v-expansion-panel-title v-slot="{ expanded }">
      <v-row no-gutters class="items-center">
        <v-col class="d-flex justify-start" cols="4">
          <span class="text-h5">
            {{ $t('Select Region') }}
          </span>
        </v-col>
        <v-col
          class="items-center"
          cols="8"
        >
          <v-fade-transition >
            <span
              v-if="!expanded"
              key="1"
              class="text-h6 text-orange-500 capitalize"
            >
              {{ region.length == 0 ? '' : region.map((i) => regions[i]).join(', ') }}
            </span>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text >
      <v-item-group multiple v-model="region">
        <v-container class="max-w-[800px]">
          <v-row>
            <v-col
              v-for="(reg, i) in regions"
              :key="i"
              cols="6"
              md="4"
              class="d-flex justify-center"
            >
              <v-item v-slot="{ isSelected, toggle }">
                <v-card
                  :color="isSelected ? 'warning' : 'grey-lighten-4'"
                  
                  class="d-flex align-center transition-all duration-300"
                  :class="isSelected ? 'rounded-lg scale-110' : 'rounded-xl scale-100 hover:force-rounded-xl hover:border-2'"
                  height="50"
                  width="150"
                  @click="toggle"
                >
                  <v-scroll-y-transition>
                    <div
                      class="flex-grow-1 text-center text-lg font-medium"
                    >
                      {{ reg }}
                    </div>
                  </v-scroll-y-transition>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
      <div class="mt-10 flex justify-center items-center">
        <v-btn color="orange"
        class="w-32 text-none text-white"
        @click="() => changeState('platform')">
          <span class="font-medium">
            {{ $t('Next') }}
          </span>
        </v-btn>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>