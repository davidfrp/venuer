<script lang="ts">
  import Alert from '$lib/components/Alert.svelte'
  import Button from '$lib/components/Button.svelte'
  import TextInput from '$lib/components/TextInput.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { saveVenue } from '$lib/venueService'

  export let venue: Venue
  export let onSaved: (data: any) => void
  export let modalProps: any

  let errorMessage: string
  let inputRef: HTMLInputElement
  let location: Record<string, string | undefined>

  $: if (venue || modalProps.isOpen) reset()

  const reset = () => {
    errorMessage = ''
    name = venue?.name
    description = venue?.description
    location = {
      country: venue?.location.country,
      city: venue?.location.city,
      postalCode: venue?.location.postalCode,
      address: venue?.location.address,
      entrance: venue?.location.entrance,
      entranceCoordinates: venue?.location.entranceCoordinates,
      additionalInfo: venue?.location.additionalInfo
    }
  }

  let name: string
  let description: string

  const onClose = () => {
    modalProps.isOpen = false
    modalProps.onRequestClose()
  }

  const handleSubmit = async () => {
    const [data, status] = await saveVenue({
      name, description, location, id: venue._id
    })
    if (status === 'success') {
      onSaved(data)
      onClose()
    } else {
      errorMessage = data.message as string
    }
  }
</script>

<Modal {...modalProps} focusRef={inputRef}>
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
