<template>
   <div class="min-h-screen bg-gray-200">
  <div class="w-full px-12 py-10">
    <div class="md:w-1/4 sm:w-full relative mb-10">
      <input
        v-model="establishments"
        class="
          bg-white
          appearance-none
          border-2 border-white
          rounded-xl
          w-full
          py-2
          pl-10
          pr-2
          text-gray-700
          leading-tight
          focus:outline-none
        "
        type="text"
        placeholder="Coffee,Banks,Casino"
      />

      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          type="submit"
          class="p-1 focus:outline-none focus:shadow-outline"
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </span>
    </div>

    <div class="grid md:grid-cols-3 gap-6 sm:grid-cols-1">
      <div
        v-for="(nearbyPlace, index) in nearbyPlaces"
        :key="index"
        class="flex justify-center"
      >
        <div class="rounded-lg shadow-lg bg-white max-w-sm">
          <a href="#!">
            <img
              class="rounded-t-lg"
              :src="nearbyPlace.photo ?? 'https://via.placeholder.com/720'"
              alt=""
            />
          </a>
          <div class="p-6">
            <h5 class="text-gray-900 text-xl font-medium mb-2">
              {{ nearbyPlace.name }}
            </h5>
            <p class="text-gray-700 text-base mb-4">
              {{ nearbyPlace.address }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="(category, index) in nearbyPlace.categories"
                :key="`${category}-${index}`"
                class="
                  px-4
                  py-2
                  rounded-full
                  text-gray-500
                  bg-gray-200
                  font-semibold
                  text-xs
                  flex
                  align-center
                  w-max
                  cursor-pointer
                  active:bg-gray-300
                  transition
                  duration-300
                  ease
                "
              >
                {{ category }}
              </span>
            </div>

            <a
              :href="`http://maps.google.com/maps?z=12&t=m&q=${nearbyPlace.address}`"
              target="_blank"
              class="
                inline-block
                px-6
                py-2.5
                bg-blue-600
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out
              "
            >
              View in GMap
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
const route = useRoute();
const nearbyPlaces = ref([]);
const establishments = useDebouncedRef('', 1000);
const getPlaces = async () => await useNuxtApp().$apiFetch(`nearby-places`, {
    method: "get",
    params: Object.entries({
      lattitude: route.query.lattitude,
      longhitude: route.query.longhitude,
      establishments: establishments.value
    }).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {}),
  })

onMounted(async () => {
  nearbyPlaces.value = await getPlaces();
});

watch(establishments, async () => {
  nearbyPlaces.value = await getPlaces();
});

</script>