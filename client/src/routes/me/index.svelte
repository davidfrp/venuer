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
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import SaveNameForm from './_SaveNameForm.svelte'
  import SaveEmailForm from './_SaveEmailForm.svelte'
  import DeleteAccountForm from './_DeleteAccountForm.svelte'
  import { logout } from '$lib/authService'
  import dayjs from 'dayjs'

  export let user: User

  let isSaveNameModalShown: boolean
  let isSaveEmailModalShown: boolean
  let isDeleteAccountModalShown: boolean

  let daysSincePasswordChange = dayjs().diff(user.lastPasswordChangedAt, 'day')
  let daysSinceAccountCreation = dayjs().diff(user.createdAt, 'day')
</script>

<div class="space-y-10">
  <div class="space-y-3">
    <h2 class="text-2xl font-semibold">You about yourself</h2>
    <p>Change personal details such as your name and email.</p>
    <!-- Your account was created on {dayjs($session.user?.createdAt).format('MMMM D, YYYY')}. {dayjs().diff($session.user?.createdAt, 'day')} days -->
  </div>
  <div class="divide-y">
    <div class="pb-6 flex items-center">
      <div class="flex-1 min-w-0 flex flex-col">
        <span class="truncate">Name</span>
        <span class="truncate text-sm text-gray-500">
          {user.name}
        </span>
      </div>
      <Button variant="text" on:click={() => isSaveNameModalShown = true}>
        Change
      </Button>
    </div>
    <div class="py-6 flex items-center">
      <div class="flex-1 min-w-0 flex flex-col">
        <span class="truncate">Email</span>
        <span class="truncate text-sm text-gray-500">
          {user.email}
        </span>
      </div>
      <Button variant="text" on:click={() => isSaveEmailModalShown = true}>
        Change
      </Button>
    </div>
  </div>
  <div class="space-y-3">
    <h2 class="text-2xl font-semibold">Login & security</h2>
  </div>
  <div class="divide-y">
    <div class="pb-6 flex items-center">
      <div class="flex-1 min-w-0 flex flex-col">
        <span class="truncate">Password</span>
        <span class="truncate text-sm text-gray-500">
          Last updated {
            daysSincePasswordChange > 0 ? (
              daysSincePasswordChange > 1 ? `${daysSincePasswordChange} days ago` : 'yesterday'
            ) : 'today'
          }
        </span>
      </div>
      <Button variant="text">
        Change
      </Button>
    </div>
    <div class="py-6 flex items-center">
      <div class="flex-1 min-w-0 flex flex-col">
        <span class="truncate">Delete account</span>
        <span class="truncate text-sm text-gray-500">
          Account created {
            daysSinceAccountCreation + (
              daysSinceAccountCreation === 1 ? ' day' : ' days'
            ) + ' ago'
          }
        </span>
      </div>
      <Button variant="text" on:click={() => isDeleteAccountModalShown = true}>Delete</Button>
    </div>
    <div class="py-6 flex items-center">
      <div class="flex-1 min-w-0 flex flex-col">
        <span class="truncate">Log out of venuer</span>
      </div>
      <Button variant="text" on:click={logout}>Log out</Button>
    </div>
  </div>
</div>

<Modal title="Change your name" isOpen={isSaveNameModalShown} onRequestClose={() => isSaveNameModalShown = false}>
  <SaveNameForm bind:name={user.name} onSaved={() => isSaveNameModalShown = false} />
</Modal>

<Modal title="Change your email" isOpen={isSaveEmailModalShown} onRequestClose={() => isSaveEmailModalShown = false}>
  <SaveEmailForm bind:email={user.email} onSaved={() => isSaveEmailModalShown = false} />
</Modal>

<Modal title="Delete your account" isOpen={isDeleteAccountModalShown} onRequestClose={() => isDeleteAccountModalShown = false}>
  <DeleteAccountForm {user} />
</Modal>
