<template>
  <!-- component -->
  <div class="min-h-screen bg-gray-200 flex items-center justify-center">
    <div class="w-full max-w-sm">
      <div class="relative text-gray-600 focus-within:text-gray-400">
        <h4>Check location current weather</h4>
        <input
          v-model="location"
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
        />

        <span class="absolute top-7 left-0 flex items-center pl-2">
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

      <div
        v-if="forecast != null"
        class="flex flex-col bg-white rounded p-4 w-full mt-6"
      >
        <div class="font-bold text-xl">{{ forecast.location }}</div>
        <div class="text-sm text-gray-500">{{ forecast.currentDateTime }}</div>
        <div
          class="
            mt-6
            text-6xl
            self-center
            inline-flex
            items-center
            justify-center
            rounded-lg
            text-indigo-400
            h-24
            w-24
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
            />
          </svg>
        </div>
        <div class="flex flex-row items-center justify-center mt-6">
          <div class="font-medium text-6xl">
            {{ forecast.currentTemperature }}°
          </div>
          <div class="flex flex-col items-center ml-6">
            <div>Cloudy</div>
            <div class="mt-1">
              <span class="text-sm"><i class="far fa-long-arrow-up"></i></span>
              <span class="text-sm font-light text-gray-500"
                >{{ forecast.maxTemperature }}°C</span
              >
            </div>
            <div>
              <span class="text-sm"
                ><i class="far fa-long-arrow-down"></i
              ></span>
              <span class="text-sm font-light text-gray-500"
                >{{ forecast.minTemperature }}°C</span
              >
            </div>
          </div>
        </div>
        <div class="w-full flex mt-6">
          <div class="w-1/3 flex flex-col items-center">
            <div class="font-medium text-sm">Wind</div>
            <div class="text-sm text-gray-500">
              {{ forecast.windSpeed }}km/h
            </div>
          </div>
          <div class="w-1/3 flex flex-col items-center">
            <div class="font-medium text-sm">Humidity</div>
            <div class="text-sm text-gray-500">{{ forecast.humidity }}%</div>
          </div>
          <div class="w-1/3 flex flex-col items-center">
            <div class="font-medium text-sm">Visibility</div>
            <div class="text-sm text-gray-500">
              {{ forecast.visibility / 1000 }}km
            </div>
          </div>
        </div>
        <div class="w-full flex my-6">
          <div class="w-1/3 flex flex-col items-center">
            <div class="font-medium text-sm">Pressure</div>
            <div class="text-sm text-gray-500">{{ forecast.pressure }}hPa</div>
          </div>
          <div class="w-1/3 flex flex-col items-center">
            <div class="font-medium text-sm">Sunrise</div>
            <div class="text-sm text-gray-500">{{ forecast.sunrise }}</div>
          </div>
          <div class="w-1/3 flex flex-col items-center">
            <div class="font-medium text-sm">Sunset</div>
            <div class="text-sm text-gray-500">{{ forecast.sunset }}</div>
          </div>
        </div>

        <NuxtLink :to="{ path: 'nearby-places', query: forecast.geoCode }" class="self-center text-blue-400">
          View Nearby Places
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
  
<script setup>
const location = useDebouncedRef('', 1000);
const forecast = ref(null);

watch(location, async (newLocation) => {
  forecast.value = await useNuxtApp().$apiFetch(
    "/weather?place=" + newLocation
  );
});
</script>