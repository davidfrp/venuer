<script lang="ts">
  import Alert from './Alert.svelte'
  import Button from './Button.svelte'
  import Calendar from './Calendar.svelte'
  import IconButton from './IconButton.svelte'
  import TextInput from './TextInput.svelte'
  import dayjs from 'dayjs'
  
  export let onSearch: (query: Partial<Omit<SearchQuery, 'after' | 'before'> & {
    after: Date
    before: Date
  }>) => void

  export let query: Partial<Omit<SearchQuery, 'after' | 'before'> & {
    after: Date,
    before: Date
  }> = {}

  let errorMessage: string

  const handleReset = () => (query = {})

  const handleSubmit = () => onSearch(query)

  let inputRef: HTMLInputElement
  let isUsingLocation: boolean

  $: if (isUsingLocation) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        query.lat = coords.latitude.toString()
        query.lng = coords.longitude.toString()
      }, () => {
        errorMessage = 'Could not get your location.'
      })
    }
  } else {
    query.lat = query.lng = undefined
  }
</script>

<div class="relative pb-12">
  {#if errorMessage}
    <div class="mb-6">
      <Alert message={errorMessage} title="Something went wrong" />
    </div>
  {/if}
  <div class="divide-y">
    <div class="pb-6 space-y-3">
      <h2 class="text-lg font-semibold">Which place or event?</h2>
      <div class="flex items-center gap-3">
        <div class="flex-1">
          <TextInput
            bind:inputRef
            bind:value={query.searchTerm}
            placeholder="Search for an event or venue"
            id="searchTerm"
          />
        </div>
        {#if query.searchTerm}
          <IconButton size="sm" on:click={() => {
            query.searchTerm = undefined
            inputRef?.focus()
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={3} stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </IconButton>
        {/if}
      </div>
    </div>
    <div class="py-6 space-y-3">
      <h2 class="text-lg font-semibold">When?</h2>
      <Calendar bind:startDate={query.after} bind:endDate={query.before} />
    </div>
    <div class="py-6 space-y-3">
      <h2 class="text-lg font-semibold">Where?</h2>
      <div class="flex justify-start">
        <label for="near" class="flex flex-col flex-1 cursor-pointer">
          Only nearby
          <span class="text-sm text-gray-500">Limit results to be near your location</span>
        </label>
        <input type="checkbox" name="near" id="near" bind:checked={isUsingLocation} />
      </div>
    </div>
  </div>
  <div class="fixed right-0 bottom-0 left-0 py-3 pl-3.5 pr-6 flex justify-between border-t bg-white shadow-2xl shadow-white">
    <Button variant="text" on:click={handleReset}>
      Clear all
    </Button>
    <Button variant="contained" size="md" on:click={handleSubmit}>
      Search
    </Button>
  </div>
</div>