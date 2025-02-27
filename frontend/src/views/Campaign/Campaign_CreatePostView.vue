<script setup>
    import { computed, onMounted, onUnmounted, ref } from 'vue';
    import getUnicodeFlagIcon from 'country-flag-icons/unicode'
    import youtubeIcon from '@/assets/icons/youtube.svg';
    import tiktokIcon from '@/assets/icons/tiktok.svg';
    import instagramIcon from '@/assets/icons/instagram.svg';
    import bilibiliIcon from '@/assets/icons/bilibili.svg';
    import youtubeBlackIcon from '@/assets/icons/youtube-black.svg';
    import tiktokBlackIcon from '@/assets/icons/tiktok-black.svg';
    import instagramBlackIcon from '@/assets/icons/instagram-black.svg';
    import bilibiliBlackIcon from '@/assets/icons/bilibili-black.svg';

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
      title: '',
      description: '',
      text: '',
      url: '',
      file: null,
    })

    const platforms = [
      { name: "Instagram", icon: instagramIcon, color: "#FF0069", blackIcon: instagramBlackIcon },
      { name: "Tiktok", icon: tiktokIcon, color: "#000000", blackIcon: tiktokBlackIcon },
      { name: "Youtube", icon: youtubeIcon, color: "#FF0000", blackIcon: youtubeBlackIcon },
      { name: "Bilibili", icon: bilibiliIcon, color: "#00A1D6", blackIcon: bilibiliBlackIcon },
    ]

    
    const regions = {
      "Asia": ["Taiwan", "Hong Kong", "Japan", "South Korea", "Thailand", "Vietnam", "Philippines", "Indonesia"],
      "North America": ["United States", "Canada"],
      "South America": ["Brazil", "Mexico"],
      "Europe": ["United Kingdom", "Germany", "France", "Spain", "Italy"],
      "Oceania": ["Australia"],
    }

    // generate a list of index to country mapping
    const indexToCountry = ['Taiwan', 'Hong Kong', 'Japan', 'South Korea', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'United States', 'Canada', 'Brazil', 'Mexico', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Australia']
    const region = ref([])
    const state = ref('region')
    const budgetRange = ['Less than US$50', 'US$50 - US$500', 'US$500 - US$5,000', 'More than US$5000']
    const budget = ref(budgetRange[0])

    const screenWidth = ref(window.innerWidth);

    const updateScreenWidth = () => {
      screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', updateScreenWidth);
    });
    
    onUnmounted(() => {
      window.removeEventListener('resize', updateScreenWidth);
    });
    const handleBackBtn = () => {
        router.go(-1)
    }

    const isLargeScreen = computed(() => screenWidth.value >= 1024); // Tailwind's lg: breakpoint (1024px)

    const changeState = (newState) => {
      state.value = newState;
    }
    
    const onSubmitted = () => {
      console.log('Submitted', {
        region: region.value.map((r) => indexToCountry[r]),
        platform: platform.value.map((i) => platforms[i].name),
        budget: budget.value,
        post: post.value,
      });
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
        <v-expansion-panels  mandatory  v-model="state" >
          <v-expansion-panel value="region" class="mb-5">
            <v-expansion-panel-title v-slot="{ expanded }">
              <v-row no-gutters class="items-center">
                <v-col class="d-flex justify-start" cols="4">
                  <span class="text-2xl font-medium">
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
                      class="text-lg font-medium capitalize"
                    >
                      {{ region == '' ? '' :  region.map((r) => indexToCountry[r]).join(', ')}}
                    </span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text >
              <v-item-group multiple v-model="region">
                <v-container class="max-w-screen-md">
                  <v-row>
                    <v-row v-for="(reg, i) in Object.keys(regions)" :key="i" class="mb-5">
                      <v-col cols="12">
                        <span class="text-xl font-medium">
                          {{ reg }}
                        </span>
                      </v-col>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                          <v-col
                            v-for="(country, j) in regions[reg]"
                            :key="j"
                          >
                            <v-item v-slot="{ isSelected, toggle }">
                              <v-card
                                flat
                                class="d-flex align-center transition-all rounded-lg border-2 "
                                :class="isSelected ? ' border-black' : 'border-neutral-100'"
                                height="50"
                                width="150"
                                @click="toggle"
                              >
                                <v-scroll-y-transition>
                                  <div
                                    class="flex-grow-1 text-center text-lg font-medium"
                                  >
                                    {{ country }}
                                  </div>
                                </v-scroll-y-transition>
                              </v-card>
                            </v-item>
                          </v-col>
                        </div>

                    </v-row>
                  </v-row>
                </v-container>
              </v-item-group>
              <div class="my-5 flex justify-center items-center">
                <v-btn color='secondary'
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
                  <span class="text-2xl font-medium">
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
                      class="text-lg font-medium capitalize"
                    >
                      {{ platform == '' ? '' : platform.map((i) => platforms[i].name).join(', ') }}
                    </span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-item-group multiple v-model="platform">
                <v-container class="max-w-screen-md">
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
                          :color="'#FFFFFF'"
                          flat
                          class="d-flex align-center transition-all rounded-lg border-2 "
                          :class="isSelected ? ' border-black' : 'border-neutral-100'"
                          height="80"
                          width="80"
                          @click="toggle"
                        >
                          <v-scroll-y-transition>
                            <div
                              class="flex-grow-1 text-center"
                            >
                              <v-img
                                :src="p.icon"
                                height="30"
                              ></v-img>
                              <div className="text-xs font-normal mt-2">
                                {{ p.name }}
                              </div>
                            </div>
                            
                          </v-scroll-y-transition>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>

                </v-container>
              </v-item-group>
              <div class="flex justify-center items-center gap-10 my-5">
                
                <div class="flex justify-center items-center">
                  <v-btn
                  variant="outlined"
                  color='secondary'
                  class="w-32 text-none"
                  @click="() => changeState('region')">
                    <span class="font-medium">
                      {{ $t('Previous') }}
                    </span>
                  </v-btn>
                </div>

                <div class="flex justify-center items-center">
                  <v-btn color='secondary'
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
                  <span class="text-2xl font-medium">
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
                      class="text-lg font-medium capitalize"
                    >
                      {{ budget }}
                    </span>
                  </v-fade-transition>
                </v-col>
              </v-row>

            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container class="max-w-screen-md">
                <div class="text-xl font-medium text-center mb-5">
                  Enter your budget
                </div>
                <v-row>
                  <v-col cols="12">
                    <v-select 
                      class="mx-auto font-sans"
                      bg-color="#FFFFFF"
                      :minWidth="200"
                      :maxWidth="300"
                      label="Budget"
                      :items="budgetRange"
                      variant="solo"
                      rounded
                      single-line
                      density="compact"
                      v-model="budget"
                      ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <div class="flex my-5 justify-center items-center gap-10">
                
                  <v-btn
                  variant="outlined"
                  color='secondary'
                  class="w-32 text-none"
                  @click="() => changeState('platform')">
                    <span class="font-medium">
                      {{ $t('Previous') }}
                    </span>
                  </v-btn>

                  <v-btn color='secondary'
                  class="w-32 text-none text-white"
                  @click="() => changeState('post')">
                    <span class="font-medium">
                      {{ $t('Next') }}
                    </span>
                  </v-btn>

              </div>

            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel value="post" class="mb-5" >
            <v-expansion-panel-title v-slot="{ expanded }">
              <v-row no-gutters class="items-center">
                <v-col class="d-flex justify-start" cols="4">
                  <span class="text-2xl font-medium">
                    {{ $t('Post') }}
                  </span>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container class="max-w-screen-md">
                <div class="text-xl mb-5">
                  Title
                </div>
                <v-text-field
                  v-model="post.title"
                  variant="solo"
                  rounded="lg"
                  dense
                  placeholder="Title"
                  :rules="[v => !!v || 'Post title is required']"
                ></v-text-field>
                <div class="text-xl font-medium mb-5">
                  Description
                </div>
                <v-text-field
                  v-model="post.description"
                  variant="solo"
                  rounded="lg"
                  dense
                  placeholder="Description"
                  :rules="[v => !!v || 'Post description is required']"
                ></v-text-field>
                <div class="text-xl font-medium mb-5">
                  Content:
                </div>
                <v-textarea
                  v-model="post.text"
                  variant="solo"
                  rounded="lg"
                  dense
                  placeholder="What is on your mind?"
                  :rules="[v => !!v || 'Post text is required']"
                ></v-textarea>
                <div class="text-xl font-medium my-5">
                  URL:
                </div>
                <v-text-field
                  v-model="post.url"
                  variant="solo"
                  rounded="lg"
                  dense
                  prepend-inner-icon="mdi-link"
                  placeholder="Link"
                ></v-text-field>
                <v-file-input
                  v-model="post.file"
                  dense
                  class="mt-5"
                  variant="solo"
                  rounded="lg"
                  prepend-inner-icon="mdi-paperclip"
                  prepend-icon=""
                  placeholder="Upload file"
                  label="Attached file"
                ></v-file-input>
              </v-container>
              <div class="my-5 flex justify-center items-center gap-10">
                <v-btn
                variant="outlined"
                color='secondary'
                class="w-32 text-none"
                @click="() => changeState('budget')">
                  <span class="font-medium">
                    {{ $t('Previous') }}
                  </span>
                </v-btn>

                <v-btn color='secondary'
                class="w-32 text-none text-white"
                @click="() => changeState('complete')">
                  <span class="font-medium">
                    {{ $t('Next') }}
                  </span>
                </v-btn>
              </div>

            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel value="complete" class="mb-5" >
            <v-expansion-panel-title v-slot="{ expanded }">
              <v-row no-gutters class="items-center">
                <v-col class="d-flex justify-start" cols="4">
                  <span class="text-h5">
                    {{ $t('Complete') }}
                  </span>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <!-- Review all selected data -->
              <v-container class="max-w-screen-md">
                <v-row>
                  <v-col cols="12">
                    <div class="text-2xl font-normal mb-2">
                      {{ $t('Selected Region(s)') }}:
                    </div>
                    <div class="text-lg font-semibold pl-2">
                        {{ region.map((r) => indexToCountry[r]).join(', ') || $t('No regions selected') }}
                    </div>
                  </v-col>
                  <v-col cols="12" class="mt-4">
                    <div class="text-2xl font-medium mb-2">
                      {{ $t('Selected Platform(s)') }}:
                    </div>
                    <div class="text-lg font-semibold pl-2">
                      {{ platform.map((i) => platforms[i].name).join(', ') || $t('No platforms selected') }}
                    </div>
                  </v-col>
                  <v-col cols="12" class="mt-4">
                    <div class="text-2xl font-medium mb-2">
                      {{ $t('Budget') }}:
                    </div>
                    <div class="text-lg font-semibold pl-2">
                      {{ budget || $t('No budget selected') }}
                    </div>
                  </v-col>
                  <v-col cols="12" class="mt-4">
                    <div class="text-2xl font-medium mb-2">
                      {{ $t('Post Details') }}:
                    </div>
                    <div class="">
                      <div>
                        <span className="text-lg font-medium">
                          {{ $t('Title') }}:
                        </span> 
                        <div class="text-lg font-semibold pl-3">
                          {{ post.title || $t('No title provided') }}
                        </div>
                      </div>
                      <div>
                        <span className="text-lg font-medium">
                          {{ $t('Description') }}:
                        </span> 
                        <div class="text-lg font-semibold pl-3">
                          {{ post.description || $t('No description provided') }}
                        </div>
                      </div>
                      <div>
                        <span className="text-lg font-medium">
                          {{ $t('Content') }}:
                        </span> 
                        <div class="text-lg font-semibold pl-3">
                          {{ post.text || $t('No content provided') }}
                        </div>
                      </div>
                      <div>
                        <span className="text-lg font-medium">
                          {{ $t('URL') }}:
                        </span> 
                        <div class="text-lg font-semibold pl-3">
                          {{ post.url || $t('No URL provided') }}
                        </div>
                      </div>
                      <div>
                        <span className="text-lg font-medium">
                          {{ $t('File') }}:
                        </span> 
                        <div class="text-lg font-semibold ml-3">
                          {{ post.file ? post.file.name : $t('No file attached') }}
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-container>

              <div class="flex justify-center items-center gap-10">
                
                <div class="my-5 flex
                justify-center items-center gap-10">
                  <v-btn
                  variant="outlined"
                  color='secondary'
                  class="w-32 text-none "
                  @click="() => changeState('post')">
                    <span class="font-medium">
                      {{ $t('Previous') }}
                    </span>
                  </v-btn>
                  <v-btn color='secondary'
                  class="w-32 text-none text-white"
                  @click="onSubmitted">
                    <span class="font-medium">
                      {{ $t('Submit') }}
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
  .hover\:force-rounded-xl:hover {
    border-radius: 1.5rem !important;
    /* transform: scale(1.1); */
  }
</style>