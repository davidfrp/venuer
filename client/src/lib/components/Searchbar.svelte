<script lang="ts">
  import Modal from './Modal.svelte'
  import SearchForm from './SearchForm.svelte'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import dayjs from 'dayjs'

  const initializedQuery: Partial<Omit<SearchQuery, 'after' | 'before'> & {
    after: Date
    before: Date
  }> = {}
  
  $: {
    const searchParams = $page.url.searchParams

    if (searchParams.has('after')) {
      initializedQuery.after = new Date(Number(searchParams.get('after')))
    } else if (initializedQuery.after) {
      initializedQuery.after = undefined
    }

    if (searchParams.has('before')) {
      initializedQuery.before = new Date(Number(searchParams.get('before')))
    } else if (initializedQuery.before) {
      initializedQuery.before = undefined
    }

    if (searchParams.has('searchTerm')) {
      initializedQuery.searchTerm = searchParams.get('searchTerm') as string
    } else if (initializedQuery.searchTerm) {
      initializedQuery.searchTerm = undefined
    }

    if (searchParams.has('lat') && searchParams.has('lng')) {
      initializedQuery.lat = searchParams.get('lat') as string
      initializedQuery.lng = searchParams.get('lng') as string
    } else if (initializedQuery.lat || initializedQuery.lng) {
      initializedQuery.lat = undefined
      initializedQuery.lng = undefined
    }
  }

  let isOpen: boolean

  const handleSearch = async (query: Partial<Omit<SearchQuery, 'after' | 'before'> & {
    after: Date
    before: Date
  }>) => {
    const searchQuery: Partial<SearchQuery> = {}

    // Set start and end dates to be timestamps instead of Date objects.
    if (query.after) {      
      if (!query.before) {
        // If missing, set the end date to later same day as the start date.
        searchQuery.before = (query.after.getTime() + 86399999).toString()
      } else {
        searchQuery.before = query.before.getTime().toString()
      }

      searchQuery.after = query.after.getTime().toString()
    }

    if (query.searchTerm) {
      searchQuery.searchTerm = query.searchTerm
    }

    if (query.lat && query.lng) {
      searchQuery.lat = query.lat
      searchQuery.lng = query.lng
    }

    const searchParams = new URLSearchParams(searchQuery)
    await goto(`/?${searchParams.toString()}`)
    isOpen = false
  }

  const formatDatesToHumanReadable = (startDate?: Date, endDate?: Date) => {
    let formatedText: string | undefined
    if (startDate) {
      formatedText = dayjs(startDate).format('MMM D')
      if (!dayjs(startDate).isSame(dayjs(), 'year')) {
        formatedText += `, ${dayjs(startDate).format('YYYY')}`
      }

      if (endDate && !dayjs(endDate).isSame(dayjs(startDate), 'day')) {
        formatedText += ' – ' + dayjs(endDate).format('MMM D')
        if (!dayjs(endDate).isSame(dayjs(), 'year')) {
          formatedText += `, ${dayjs(endDate).format('YYYY')}`
        }
      }
    }

    return formatedText ?? 'Anytime'
  }
</script>

<button class="w-full py-2.5 flex items-center text-left border bg-gray-100 rounded-full" on:click={() => isOpen = true}>
  <div class="pl-5 pr-4 text-gray-500">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={3} stroke-linecap="round" stroke-linejoin="round">
      <circle cx={11} cy={11} r={8} />
      <path d="m21 21-4.35-4.35" />
    </svg>
  </div>
  <div class="flex flex-col overflow-hidden">
    <div class="text-sm font-medium truncate">
      {initializedQuery.searchTerm ? `"${initializedQuery.searchTerm}"` : 'Search for an event or venue'}
    </div>
    <div class="flex gap-1.5 text-xs text-gray-500">
      <div>{formatDatesToHumanReadable(initializedQuery.after, initializedQuery.before)}</div>
      <span aria-hidden>&bull;</span>
      <div>{initializedQuery.lat && initializedQuery.lng ? 'Near you' : 'Anywhere'}</div>
    </div>
  </div>
</button>

<Modal {isOpen} onRequestClose={() => isOpen = false} title="Search for an event">
  <SearchForm query={initializedQuery} onSearch={handleSearch} />
</Modal>