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
    { routeId: 'account-settings', title: 'Personal information' },
    { routeId: 'account-settings/my-venues', title: 'Your venues', state: ($session.user?.role ?? 0) >= 1 },
    { routeId: 'account-settings/orders', title: 'Your purchases' }
  ]
</script>

<!-- TODO Remove this comment: 960px 1024px for max-width -->
<div class="max-w-4xl mx-auto">
  <h1 class="text-4xl font-semibold mb-8">Manage your account</h1>
  <nav role="tablist" class="flex overflow-x-auto">
    {#each tabs as tab}
      {#if tab.state ?? true}
        <a
          class="no-base p-4 items-center font-semibold whitespace-nowrap 
          border-b-2 hover:no-underline text-gray-600"
          class:border-gray-200={tab.routeId !== $page.routeId}
          class:border-gray-700={tab.routeId === $page.routeId}
          class:text-gray-900={tab.routeId === $page.routeId}
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
