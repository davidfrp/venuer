<script lang="ts">
  import Alert from './Alert.svelte'
  import Button from './Button.svelte'
  import Calendar from './Calendar.svelte'
  import IconButton from './IconButton.svelte'
  import TextInput from './TextInput.svelte'

  type StrictSearchQuery = Partial<Omit<SearchQuery, 'after' | 'before'> & {
    after: Date
    before: Date
  }>

  export let onSearch: (query: StrictSearchQuery) => void
  export let query: StrictSearchQuery

  let tempQuery: StrictSearchQuery = structuredClone(query) ?? {}
  let isSearching: boolean

  let errorMessage: string

  const handleReset = () => (tempQuery = {})

  const handleSubmit = () => {
    isSearching = true
    onSearch(tempQuery)
  }

  let inputRef: HTMLInputElement

  $: isUsingLocation = !!(tempQuery.lat && tempQuery.lng)

  const handleUseLocation = () => {
    if (isUsingLocation) {
      tempQuery.lat = tempQuery.lng = undefined
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          tempQuery.lat = coords.latitude.toString()
          tempQuery.lng = coords.longitude.toString()
        }, () => {
          errorMessage = 'Could not get your location.'
        })
      }
    }
  }

  const handleClearSearch = () => {
    tempQuery.searchTerm = undefined
    inputRef?.focus()
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="relative pb-12">
  {#if errorMessage}
    <div class="mb-6">
      <Alert message={errorMessage} title="Your search could not be fulfilled" />
    </div>
  {/if}
  <div class="pb-6 space-y-6">
    <div class="space-y-3">
      <h2 class="text-lg font-semibold">Which place or event?</h2>
      <div class="flex items-center gap-3">
        <div class="flex-1">
          <TextInput
            bind:value={tempQuery.searchTerm}
            placeholder="Search for an event or venue"
            id="searchTerm"
            bind:inputRef
          />
        </div>
        {#if tempQuery.searchTerm}
          <IconButton on:click={handleClearSearch} ariaLabel="Clear" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={3} stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </IconButton>
        {/if}
      </div>
    </div>
    <div class="space-y-3">
      <h2 class="text-lg font-semibold">When?</h2>
      <Calendar bind:startDate={tempQuery.after} bind:endDate={tempQuery.before} />
    </div>
    <div class="space-y-3">
      <h2 class="text-lg font-semibold">Where?</h2>
      <div class="flex justify-start">
        <label for="near" class="flex flex-col flex-1 cursor-pointer">
          <span>Only nearby</span>
          <span class="text-sm text-gray-500">Limit results to be near your location</span>
        </label>
        <input type="checkbox" name="near" id="near" bind:checked={isUsingLocation} on:change={handleUseLocation} />
      </div>
    </div>
  </div>
  <div class="fixed right-0 bottom-0 left-0 py-3 pl-3.5 pr-6 flex items-center justify-between border-t bg-white shadow-2xl shadow-white">
    <Button type="button" variant="text" on:click={handleReset}>
      Clear all
    </Button>
    <Button isLoading={isSearching} variant="contained" size="md">
      Search
    </Button>
  </div>
</form>