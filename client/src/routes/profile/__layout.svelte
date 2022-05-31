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
  import { page } from '$app/stores'
  import { session } from '$app/stores'
  
  let tabs = [
    { routeId: 'profile', title: 'Personal information' },
    { routeId: 'profile/my-venues', title: 'Your venues', state: $session.user?.role ?? 0 > 1 },
    { routeId: 'profile/orders', title: 'Your purchases' }
  ]
</script>

<div class="max-w-4xl mx-auto space-y-4 p-4 sm:p-8">
  <h1 class="text-4xl font-semibold mb-8">Manage your profile</h1>
  <nav role="tablist" class="flex gap-x-4 overflow-x-auto">
    {#each tabs as tab}
      {#if tab.state ?? true}
        <a
          class="py-3 flex-1 items-center font-semibold whitespace-nowrap 
          border-b-2 border-brand hover:no-underline text-gray-700"
          class:border-gray-200={tab.routeId !== $page.routeId}
          aria-selected={tab.routeId === $page.routeId}
          href={'/' + tab.routeId}
          role="tab"
        >
          {tab.title}
        </a>
      {/if}
    {/each}
  </nav>
  <slot />
</div>
