<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { getMe } from '$lib/userService'

  export const load: Load = async ({ fetch, session }) => {
    const [data, status] = await getMe(fetch as any)
    if (status === 'success') {
      session.user = {
        id: data._id as string,
        role: data.role as number
      }
    }
    return { status: 200 }
  }
</script>

<script lang="ts">
  import '../app.css'
  import Navbar from '$lib/components/Navbar.svelte'
</script>

<Navbar />

<main class="pt-20 px-6 lg:px-24">
  <slot />
</main>
