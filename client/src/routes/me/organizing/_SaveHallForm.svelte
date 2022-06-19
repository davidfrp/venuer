<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import Button from '$lib/components/Button.svelte'

  export let onSaved: () => void
  export let hall: Venue['halls'][number]

  let tempHall: Venue['halls'][number] = structuredClone(hall)

  const handleSave = () => {
    hall = tempHall
    onSaved()
  }
</script>

<div class="space-y-6">
  <TextInput id="hallName" bind:value={tempHall.name} label="Hall name" />
  <Button type="button" variant="contained" size="lg" on:click={handleSave}>
    Save hall
  </Button>
</div>
