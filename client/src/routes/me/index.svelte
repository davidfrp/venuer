<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ session }) => {
    return {
      props: {
        user: session.user
      }
    }
  }
</script>

<script lang="ts">
  import SaveUserForm from './_SaveUserForm.svelte'
  export let user: User
</script>

<SaveUserForm {user} />