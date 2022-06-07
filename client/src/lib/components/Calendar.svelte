<script lang="ts">
  import dayjs from 'dayjs'
  import CalendarDate from './CalendarDate.svelte'
  import IconButton from './IconButton.svelte'

  export let afterDate: Date | null = null
  export let beforeDate: Date | null = null
  export let isHeightFlexible: boolean
  
  let dateOfMonthShown: Date = afterDate ?? new Date()

  const offsetShownMonth = (offset: number) => {
    const newShownDate = new Date(dateOfMonthShown)
    newShownDate.setMonth(newShownDate.getMonth() + offset)
    if (offset === 0) {
      dateOfMonthShown = new Date()
    } else {
      dateOfMonthShown = newShownDate
    }
  }

  const updateDates = (dateOfMonthShown: Date) => {
    // Number of days in the month
    const daysInShownMonth = dayjs(dateOfMonthShown).daysInMonth()

    // Which weekday does the month start on? 0 is Monday, 6 is Sunday
    const weekDayOffset = (dayjs(dateOfMonthShown).startOf('month').day() + 6) % 7

    const numberOfGrids = isHeightFlexible ? Math.ceil((daysInShownMonth + weekDayOffset) / 7) * 7 : 42

    const dates: { date: Date, isAfterDate: boolean, isBeforeDate: boolean, isInMonth: boolean }[] = []
    for (let i = 0; i < numberOfGrids; i++) {
      const offset = i - weekDayOffset + 1
      const date = new Date(dateOfMonthShown.getFullYear(), dateOfMonthShown.getMonth(), offset)

      const isAfterDate = date.toDateString() === afterDate?.toDateString()
      const isBeforeDate = date.toDateString() === beforeDate?.toDateString()
      const isInMonth = offset > 0 && offset <= daysInShownMonth

      dates.push(({ date, isAfterDate, isBeforeDate, isInMonth }))
    }

    return dates
  }

  // TODO add 23:59:59.999 to before date, to be able to capture single day selections.
  // FIXME goto('/?after=1654639200000&before=') results in 500 error, and happens if no before data is selected. Set a default before date somehow???
  const handleDateChange = (date: Date) => {
    if (afterDate && beforeDate) {
      afterDate = beforeDate = null
    }

    if (afterDate && date >= afterDate) {
      beforeDate = new Date(date.getTime() + 86399999)
    } else {
      afterDate = date
    }
  }
</script>

<div class="relative">
  <div class="absolute left-0 top-0.5">
    <IconButton on:click={() => offsetShownMonth(-1)}>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-wull" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    </IconButton>
  </div>
  <div class="absolute right-0 top-0.5">
    <IconButton on:click={() => offsetShownMonth(1)}>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </IconButton>
  </div>
</div>
<div class="flex flex-wrap gap-6">
  {#each Array(2) as _, i}
    <div class="flex flex-1 flex-wrap min-w-[300px] select-none text-center even:hidden md:even:flex">
      <div class="w-full pb-4 pt-2">
        {dayjs(dayjs(dateOfMonthShown).add(i, 'month').toDate()).format('MMMM YYYY')}
      </div>
      <div class="flex w-full h-10 items-center text-xs text-gray-600 font-semibold">
        <div class="basis-[calc(100%/7)]">Mo</div>
        <div class="basis-[calc(100%/7)]">Tu</div>
        <div class="basis-[calc(100%/7)]">We</div>
        <div class="basis-[calc(100%/7)]">Th</div>
        <div class="basis-[calc(100%/7)]">Fr</div>
        <div class="basis-[calc(100%/7)]">Sa</div>
        <div class="basis-[calc(100%/7)]">Su</div>
      </div>
      {#each updateDates(dayjs(dateOfMonthShown).add(i, 'month').toDate()) as { date, isInMonth }}
        <CalendarDate
          {date}
          {afterDate}
          {beforeDate}
          {isInMonth}
          onSelected={handleDateChange}
        />
      {/each}
    </div>
  {/each}
</div>
