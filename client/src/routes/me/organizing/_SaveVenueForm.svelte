<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import Button from '$lib/components/Button.svelte'
  import Alert from '$lib/components/Alert.svelte'
  import { saveVenue } from '$lib/venueService'
  import { invalidate } from '$app/navigation'
  import { page } from '$app/stores'

  export let onSaved: () => void
  export let venue: Venue | undefined = undefined

  let focusRef: HTMLInputElement

  let name: Venue['name'] = venue?.name ?? ''
  let description: Venue['description'] = venue?.description ?? ''
  let location: Partial<Venue['location']> = venue?.location ?? {}

  let errorMessage: string

  const handleSubmit = async () => {
    const slug = venue?.slug
    const [data, status] = await saveVenue({ slug, name, description, location })
    if (status === 'success') {
      await invalidate('/' + $page.routeId!)
      onSaved()
    } else {
      errorMessage = data.message as string
    }
  }

  $: if (focusRef) {
    focusRef.focus()
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  {#if errorMessage}
    <Alert title="Your venue could not be saved" message={errorMessage} />
  {/if}
  <TextInput id="name" bind:inputRef={focusRef} bind:value={name} label="Name" placeholder="PRYZM, Classical Hall, etc." />
  <TextInput id="description" bind:value={description} label="Description" />
  <TextInput id="country" bind:value={location.country} label="Country" placeholder="Farawayistan" />
  <TextInput id="city" bind:value={location.city} label="City" placeholder="Anytown" />
  <TextInput id="postalCode" bind:value={location.postalCode} label="Postal code" placeholder="1337" />
  <TextInput id="address" bind:value={location.address} label="Street name and number" placeholder="Someville Avenue 42" />
  <TextInput id="additionalInfo" bind:value={location.additionalInfo} label="Additional information" placeholder="Located a short walk from public transit..." />
  <Button variant="contained" size="lg">Save venue</Button>
</form>