<script lang="ts">
  import SearchbarItem from './SearchbarItem.svelte'
  import IconButton from './IconButton.svelte'
  import Modal from './Modal.svelte'
  import Calendar from './Calendar.svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { get } from 'svelte/store'
  import dayjs from 'dayjs'

  let isCalendarShown = false
  let isMapShown = false

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
  <SearchbarItem
    on:click={() => isMapShown = !isMapShown}
    bind:value={whereValue}
    label="Where?"
  >
  </SearchbarItem>
  <div class="flex items-center">
    <SearchbarItem
      onReset={afterDate ? () => { afterDate = beforeDate = null } : undefined}
      on:click={() => isCalendarShown = !isCalendarShown}
      bind:value={whenValue}
      label="When?"
    >
      <Modal
        onRequestClose={() => isCalendarShown = false}
        isOpen={isCalendarShown}
        isTopMost={false}
        size="lg"
      >
        <Calendar
          bind:afterDate={afterDate}
          bind:beforeDate={beforeDate}
          isHeightFlexible={false}
        />
      </Modal>
    </SearchbarItem>
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
