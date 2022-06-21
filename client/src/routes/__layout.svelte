<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { getMe } from '$lib/userService'

  export const load: Load = async ({ fetch, session }) => {
    const [data, status] = await getMe(fetch as any)
    if (status === 'success') {
      session.user = data as User
    }
    return { status: 200 }
  }
</script>

<!-- TODO Extract this into a named layout. -->

<script lang="ts">
  import '../app.css'
  import Navbar from '$lib/components/Navbar.svelte'
</script>

<Navbar />

<main class="pt-[8.35rem] md:pt-[5.15rem] px-6 pb-16 lg:px-[var(--page-px)] mt-6">
  <slot />
</main>
