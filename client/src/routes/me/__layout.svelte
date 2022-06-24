<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

	export const load: Load = ({ session, routeId }) => {
    if (!session.user) {
      return {
        status: 302,
        redirect: `/login?redirectTo=/${routeId}`
      }
    }
    return { status: 200 }
	}
</script>

<script>
  import { session, page } from '$app/stores'
  
  let tabs = [
    { routeId: 'me', title: 'Profile', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
    { routeId: 'me/organizing', title: 'Your venues', state: ($session.user?.role ?? 0) >= 1, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"/><path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2ZM18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z"/></svg>' },
    { routeId: 'me/chatting', title: 'Chat', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
  ]
</script>

<svelte:head>
  <title>Your account - Venuer</title>
  <meta name="description" content="" />
  <meta property="og:title" content="" />
  <meta property="og:description" content="" />  
  <meta property="og:image" content="" />
</svelte:head>

<div class="max-w-3xl mx-auto">
  <nav role="tablist" class="flex gap-10 overflow-x-scroll snap-x snap-mandatory mb-10">
    {#each tabs as tab}
      {#if tab.state ?? true}
        <a
          sveltekit:prefetch
          class="no-base flex flex-col items-center gap-2 pb-3 snap-start 
          whitespace-nowrap text-xs font-semibold text-gray-500 border-b-2
          border-transparent hover:text-inherit transition-colors"
          class:text-inherit={tab.routeId === $page.routeId}
          class:border-black={tab.routeId === $page.routeId}
          class:hover:border-gray-300={tab.routeId !== $page.routeId}
          aria-selected={tab.routeId === $page.routeId}
          href={'/' + tab.routeId}
          role="tab"
        >
          {#if tab.icon}
            {@html tab.icon}
          {/if}
          {tab.title}
        </a>
      {/if}
    {/each}
  </nav>
  <slot />
</div>
