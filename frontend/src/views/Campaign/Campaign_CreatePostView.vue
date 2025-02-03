<script setup>
    import { computed, onMounted, onUnmounted, ref } from 'vue';
    import getUnicodeFlagIcon from 'country-flag-icons/unicode'
    import youtubeIcon from '@/assets/icons/youtube.svg';
    import tiktokIcon from '@/assets/icons/tiktok.svg';
    import instagramIcon from '@/assets/icons/instagram.svg';
    import bilibiliIcon from '@/assets/icons/bilibili.svg';
    import youtubeWhiteIcon from '@/assets/icons/youtube-white.svg';
    import tiktokWhiteIcon from '@/assets/icons/tiktok-white.svg';
    import instagramWhiteIcon from '@/assets/icons/instagram-white.svg';
    import bilibiliWhiteIcon from '@/assets/icons/bilibili-white.svg';

    const countriesFlag = {
    'Global': 'UN',
    'Taiwan': 'TW',
    'Hong Kong': 'HK',
    'Japan': 'JP',
    'South Korea': 'KR',
    'Thailand': 'TH',
    'Vietnam': 'VN',
    'Philippines': 'PH',
    'Indonesia': 'ID',
    'United States': 'US',
    'Canada': 'CA',
    'Brazil': 'BR',
    'Mexico': 'MX',
    'United Kingdom': 'GB',
    'Germany': 'DE',
    'France': 'FR',
    'Spain': 'ES',
    'Italy': 'IT',
    'Australia': 'AU'
    }
    const selectCountry = ref({
            title: `${getUnicodeFlagIcon(countriesFlag['United States'])} ${'USD'}`,
            value: 'United States',
        })
    const countries = ref([
        {
            title: `${getUnicodeFlagIcon(countriesFlag['United States'])} ${'USD'}`,
            value: 'United States',
        },
        {
            title: `${getUnicodeFlagIcon(countriesFlag['Taiwan'])} ${'NTD'}`,
            value: 'Taiwan',
        },
        {
            title: `${getUnicodeFlagIcon(countriesFlag['Hong Kong'])} ${'HKD'}`,
            value: 'Hong Kong',
        },
        {
            title: `${getUnicodeFlagIcon(countriesFlag['Japan'])} ${'JPY'}`,
            value: 'Japan',
        },
        {
            title: `${getUnicodeFlagIcon(countriesFlag['Australia'])} ${'AUD'}`,
            value: 'Australia',
        } 
    ])

    const platform = ref([])
    const post = ref({
      text: '',
      url: '',
      file: null,
    })
    const platforms = [
      { name: "Instagram", icon: instagramIcon, color: "#FF0069", whiteIcon: instagramWhiteIcon },
      { name: "Tiktok", icon: tiktokIcon, color: "#000000", whiteIcon: tiktokWhiteIcon },
      { name: "Youtube", icon: youtubeIcon, color: "#FF0000", whiteIcon: youtubeWhiteIcon },
      { name: "Bilibili", icon: bilibiliIcon, color: "#00A1D6", whiteIcon: bilibiliWhiteIcon },
    ]
    const regions = ["Hong Kong", "Taiwan", "Mainland China"]
    const region = ref([])
    const state = ref('region')
    const budget = ref('')

    const screenWidth = ref(window.innerWidth);

    const updateScreenWidth = () => {
      screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', updateScreenWidth);
    });

    const isLargeScreen = computed(() => screenWidth.value >= 1024); // Tailwind's lg: breakpoint (1024px)

    const changeState = (newState) => {
      state.value = newState;
    }

</script>

<template>
    <v-container
        fluid
        :class="['fill-height', 'align-start', 'bg-grey-lighten-4', 'py-10']">
        <v-card 
        :class="['bg-grey-lighten-4', 'w-full']"
        flat
        >
        <v-card-title class="my-5">
          <span class="text-h4">
            {{ $t('Create Your Post') }}
          </span>
        </v-card-title>
        <v-card-text>
        <v-expansion-panels mandatory  v-model="state" >
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
                          :class="isSelected ? 'rounded-lg scale-110' : 'rounded-xl scale-100 hover:scaled-110'"
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

          <v-expansion-panel value="platform" class="mb-5" >
            <v-expansion-panel-title v-slot="{ expanded }">
              <v-row no-gutters class="items-center">
                <v-col class="d-flex justify-start" cols="4">
                  <span class="text-h5">
                    {{ $t('Recommended Platform') }}
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
                      {{ platform == '' ? '' : platform.map((i) => platforms[i].name).join(', ') }}
                    </span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-item-group multiple v-model="platform">
                <v-container class="max-w-[800px]">
                  <v-row>
                    <v-col
                      v-for="(p, i) in platforms"
                      :key="i"
                      cols="6"
                      md="3"
                      class="d-flex justify-center"
                    >
                      <v-item v-slot="{ isSelected, toggle }">
                        <v-card
                          :color="isSelected ?  p.color : '#FFFFFF' "
                          class="d-flex align-center transition-all duration-300 "
                          :class="isSelected ? 'rounded-xl scale-110' : 'rounded-circle scale-100 hover:scaled-110 hover:border-2'"
                          height="60"
                          width="60"
                          @click="toggle"
                        >
                          <v-scroll-y-transition>
                            <div
                              class="flex-grow-1 text-center"
                            >
                              <v-img
                                :src="isSelected ? p.whiteIcon :  p.icon"
                                height="30"
                              ></v-img>
                            </div>
                          </v-scroll-y-transition>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>

                </v-container>
              </v-item-group>
              <div class="flex justify-center items-center gap-10">
                
                <div class="mt-10 flex justify-center items-center">
                  <v-btn
                  variant="outlined"
                  class="w-32 text-none text-orange-500"
                  @click="() => changeState('region')">
                    <span class="font-medium">
                      {{ $t('Previous') }}
                    </span>
                  </v-btn>
                </div>

                <div class="mt-10 flex justify-center items-center">
                  <v-btn color="orange"
                  class="w-32 text-none text-white"
                  @click="() => changeState('budget')">
                    <span class="font-medium">
                      {{ $t('Next') }}
                    </span>
                  </v-btn>
                </div>

              </div>

            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel value="budget" class="mb-5" >
            <v-expansion-panel-title v-slot="{ expanded }">
              <v-row no-gutters class="items-center">
                <v-col class="d-flex justify-start" cols="4">
                  <span class="text-h5">
                    {{ $t('Budget') }}
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
                      {{ budget == '' ? '' : `${selectCountry.title} ${budget}` }}
                    </span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container class="max-w-[800px]">
                <div class="text-h6 text-center mb-5">
                  Enter your budget
                </div>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="budget"
                      variant="solo-filled"
                      dense
                      prefix="$"
                      placeholder="Enter your budget"
                      :rules="[v => !!v || 'Budget is required', v => /^\d+$/.test(v) || 'Budget must be a number']"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-select
                  class="mx-auto"
                  bg-color="#FFFFFF"
                  :minWidth="100"
                  :maxWidth="200"
                  label="Currency"
                  :items="countries"
                  variant="solo-filled"
                  single-line
                  density="compact"
                  return-object
                  v-model="selectCountry"
                  item-title="title"
                  rounded></v-select>
              </v-container>
              <div class="flex justify-center items-center gap-10">
                
                <div class="mt-10 flex justify-center items-center">
                  <v-btn
                  variant="outlined"
                  class="w-32 text-none text-orange-500"
                  @click="() => changeState('platform')">
                    <span class="font-medium">
                      {{ $t('Previous') }}
                    </span>
                  </v-btn>
                </div>

                <div class="mt-10 flex justify-center items-center">
                  <v-btn color="orange"
                  class="w-32 text-none text-white"
                  @click="() => changeState('post')">
                    <span class="font-medium">
                      {{ $t('Next') }}
                    </span>
                  </v-btn>
                </div>

              </div>

            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel value="post" class="mb-5" >
            <v-expansion-panel-title v-slot="{ expanded }">
              <v-row no-gutters class="items-center">
                <v-col class="d-flex justify-start" cols="4">
                  <span class="text-h5">
                    {{ $t('Example Post') }}
                  </span>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container class="max-w-[800px]">
                <div class="text-h6 mb-5">
                  Enter text:
                </div>
                <v-textarea
                  v-model="post.text"
                  variant="solo-filled"
                  dense
                  placeholder="What is on your mind?"
                  :rules="[v => !!v || 'Post text is required']"
                ></v-textarea>
                <div class="text-h6 my-5">
                  URL:
                </div>
                <v-text-field
                  v-model="post.url"
                  variant="solo-filled"
                  dense
                  prepend-inner-icon="mdi-link"
                  placeholder="Link"
                  :rules="[v => !!v || 'URL is required']"
                ></v-text-field>
                <v-file-input
                  v-model="post.file"
                  dense
                  class="mt-5"
                  variant="solo-filled"
                  prepend-inner-icon="mdi-paperclip"
                  prepend-icon=""
                  placeholder="Upload file"
                  label="Attached file"
                  :rules="[v => !!v || 'File is required']"
                ></v-file-input>
              </v-container>
              <div class="flex justify-center items-center gap-10">
                
                <div class="mt-10 flex justify-center items-center">
                  <v-btn
                  variant="outlined"
                  class="w-32 text-none text-orange-500"
                  @click="() => changeState('budget')">
                    <span class="font-medium">
                      {{ $t('Previous') }}
                    </span>
                  </v-btn>
                </div>

                <div class="mt-10 flex justify-center items-center">
                  <v-btn color="orange"
                  class="w-32 text-none text-white"
                  @click="() => changeState('complete')">
                    <span class="font-medium">
                      {{ $t('Next') }}
                    </span>
                  </v-btn>
                </div>

              </div>

            </v-expansion-panel-text>
          </v-expansion-panel>

        </v-expansion-panels>
        </v-card-text>

      </v-card>

    </v-container>
</template>

<style scoped>
  .scale-110 {
    transform: scale(1.1);
  }
  .scale-100 {
    transform: scale(1);
  }
  .rounded-xl {
    border-radius: 1rem;
  }
  .rounded-lg {
    border-radius: 0.5rem;
  }
  .rounded-circle {
    border-radius: 50%;
  }
  .hover\:scaled-110:hover {
    border-radius: 1.5rem !important;
    /* transform: scale(1.1); */
  }
  .transition-all {
    transition: all 0.3s;
  }
</style>