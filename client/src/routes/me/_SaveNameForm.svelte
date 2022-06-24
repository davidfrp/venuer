<script lang="ts">
  import Alert from '$lib/components/Alert.svelte'
  import Button from '$lib/components/Button.svelte'
  import TextInput from '$lib/components/TextInput.svelte'
  import { saveMe } from '$lib/userService'

  export let onSaved: () => void
  export let name: string

  let tempName: string = name

  let isSaving: boolean
  let errorMessage: string

  const handleSubmit = async () => {
    isSaving = true
    
    const [data, status] = await saveMe({ name: tempName })
    
    if (status === 'success') {
      name = (data as User).name
      errorMessage = ''
      onSaved()
    } else {
      errorMessage = (data as Record<string, unknown>).message as string
    }

    isSaving = false
  }
</script>

{#if errorMessage}
  <Alert title="Your name could not be saved" message={errorMessage} />
{/if}

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <TextInput id="name" label="Name" bind:value={tempName} />
  <Button isLoading={isSaving} variant="contained" size="lg">
    Save
  </Button>
</form>
