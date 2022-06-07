<script lang="ts">
  import SearchbarItem from './SearchbarItem.svelte'
  import IconButton from './IconButton.svelte'
  import Calendar from './Calendar.svelte'
  import Button from './Button.svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { get } from 'svelte/store'
  import dayjs from 'dayjs'

  const after = get(page).url.searchParams.get('after')
  const before = get(page).url.searchParams.get('before')

  let afterDate: Date | null = after && new Date(parseInt(after)) || null
  let beforeDate: Date | null = before && new Date(parseInt(before)) || null
  let venueSlug: string // TODO look at this one's usage.
  let location: { lng: number, lat: number, distance?: number }

  const getSearchParams = (query: Record<string, string | undefined>) => {
    Object.keys(query).forEach(key => {
      if (!query[key]) {
        delete query[key]
      }
    })
    return new URLSearchParams(query as Record<string, string>).toString()
  }

  const handleSearch = () => {
    const query = getSearchParams({
      venue: venueSlug,
      after: afterDate?.getTime().toString(),
      before: (
        beforeDate?.getTime().toString() || 
        (afterDate && afterDate.getTime() + 86399999)?.toString()
      ),
      distance: location?.distance?.toString(),
      lng: location?.lng.toString(),
      lat: location?.lat.toString(),
    })

    goto(`/?${query}`)
  }

  const formatBetweenDates = (after: Date | null, before: Date | null) => {
    if (after && before) {
      if (dayjs(after).isSame(before, 'day')) {
        return dayjs(after).format('MMM D')
      }
      return `${dayjs(after).format('MMM D')} - ${dayjs(before).format('MMM D')}`
    } else if (after) {
      return dayjs(after).format('MMM D')
    }
    return ''
  }
  
  $: whereValue = location?.lat && location?.lng ? 'Nearby' : 'Anywhere'
  $: whenValue = afterDate ? formatBetweenDates(afterDate, beforeDate) : 'Anytime'
</script>

<!-- TODO × upon search submit, goto / and add search query params e.g. /?venue=vega&after={new Date()}&q=aurora -->
<div class="flex divide-x-2 items-stretch">
  <SearchbarItem label="Where?" bind:value={whereValue}>
    <!-- <p>Choose between nearby, location on a map, or anywhere.</p>
    <Button variant="contained" on:click={() => location = { lng: 3, lat: 2 }}>Set coordinates</Button>
    <Button variant="contained" on:click={() => location = { lng: 0, lat: 0 }}>Unset coordinates</Button> -->
    <!-- TODO <LocationPicker bind:coordinates={} /> -->
    <!-- TODO <Map bind:selectedCoordinates={selectedCoordinates} /> -->
  </SearchbarItem>
  <div class="flex items-center">
    <SearchbarItem label="When?" bind:value={whenValue}>
      <Calendar
        bind:afterDate={afterDate}
        bind:beforeDate={beforeDate}
        isHeightFlexible={false}
      />
    </SearchbarItem>
    {#if afterDate}
      <div class="mr-4">
        <IconButton size="sm" on:click={() => afterDate = beforeDate = null} ariaLabel="Clear dates">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </IconButton>
      </div>
    {/if}
  </div>
  <!-- <SearchbarItem label="What/Who?" value="AURORA">
    <p>Write the name of something.</p>
    <Button on:click={() => {}}>Set VEGA</Button>
  </SearchbarItem> -->
  <div class="pl-4 flex items-center">
    <IconButton on:click={handleSearch} ariaLabel="Search">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round">
        <circle cx={11} cy={11} r={8} />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </IconButton>
  </div>
</div>
