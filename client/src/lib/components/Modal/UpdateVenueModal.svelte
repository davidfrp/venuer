<script lang="ts">
  import Alert from '../Alert.svelte'
  import Button from '../Button.svelte'
  import TextInput from '../TextInput.svelte'
  import Modal from './Modal.svelte'
  import { patch, } from '$lib/api'

  export let venue: Venue
  export let isOpen: boolean = false
  export let onRequestClose: () => void
  export let onSaved: (data: any) => void

  let inputRef: HTMLInputElement | null = null
  let errorMessage: string

  let location: Record<string, string | undefined>

  $: if (venue || isOpen) {
    reset()
  }

  const reset = () => {
    errorMessage = ''
    name = venue?.name
    description = venue?.description
    location = {
      country: venue?.location.country || undefined,
      city: venue?.location.city || undefined,
      postalCode: venue?.location.postalCode || undefined,
      address: venue?.location.address || undefined,
      entrance: venue?.location.entrance || undefined,
      entranceCoordinates: venue?.location.entranceCoordinates || undefined,
      additionalInfo: venue?.location.additionalInfo || undefined
    }
  }

  let name: string
  let description: string

  const onClose = () => {
    isOpen = false
    onRequestClose()
  }

  const handleSubmit = async () => {
    const [data, status] = await patch(`/venues/${venue._id}`, {
      name, description, location
    })
    if (status === 'success') {
      onSaved(data)
      onClose()
    } else {
      errorMessage = data.message as string
    }
  }
</script>

<Modal title="Edit venue" {isOpen} onRequestClose={onClose} focusRef={inputRef}>
  <form on:submit|preventDefault={handleSubmit}>
    {#if errorMessage}
      <div class="mb-4">
        <Alert title="Your changes could not be saved" message={errorMessage} />
      </div>
    {/if}
    <div class="flex flex-col gap-y-6 pb-20">
      <TextInput id="name" bind:value={name} bind:inputRef label="Name" placeholder="PRYZM, Classical Hall, etc." />
      <TextInput id="description" bind:value={description} label="Description" />
      <TextInput id="country" bind:value={location.country} label="Country" placeholder="Langtbortistan" />
      <TextInput id="city" bind:value={location.city} label="City" placeholder="" />
      <TextInput id="postalCode" bind:value={location.postalCode} label="Postal code" placeholder="1337" />
      <TextInput id="address" bind:value={location.address} label="Street name and number" placeholder="Somewhereville 42" />
      <TextInput id="additionalInfo" bind:value={location.additionalInfo} label="Additional information" />
    </div>
    <div class="flex gap-x-4 fixed left-0 bottom-0 px-6 pb-6 w-full">
      <Button variant="outlined" size="lg" type="button" on:click={onClose}>Cancel</Button>
      <Button variant="contained" size="lg">Save</Button>
    </div>
  </form>
</Modal>
