import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    nuxtApp.provide(
        'apiFetch',
        $fetch.create({
            baseURL: config.API_BASE_URL,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            },
        })
    )
})