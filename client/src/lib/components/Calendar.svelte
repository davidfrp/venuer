<script lang="ts">
  import dayjs from 'dayjs'
  import CalendarDate from './CalendarDate.svelte'
  import IconButton from './IconButton.svelte'
  import TimePicker from './TimePicker.svelte'

  export let startDate: Date | string | undefined = undefined
  export let endDate: Date | string | undefined = undefined
  export let isHeightFlexible: boolean = false
  export let numberOfShownMonths: number = 1
  export let allowOnlyFutureDates: boolean = false
  export let allowPickingTimeOfDay: boolean = false

  let dateOfMonthShown: Date = new Date(startDate ?? new Date())
  let timeOfDayInMs: number = dayjs(startDate).millisecond()

  $: if (allowPickingTimeOfDay && startDate && timeOfDayInMs) {
    const dateWithoutTime = dayjs(startDate).startOf('day')
    startDate = dateWithoutTime.add(timeOfDayInMs, 'millisecond').toDate()
  }

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

    const dates: { date: Date, isInMonth: boolean }[] = []
    for (let i = 0; i < numberOfGrids; i++) {
      const offset = i - weekDayOffset + 1
      const date = new Date(dateOfMonthShown.getFullYear(), dateOfMonthShown.getMonth(), offset)

      const isInMonth = offset > 0 && offset <= daysInShownMonth

      dates.push(({ date, isInMonth }))
    }

    return dates
  }

  const handleDateChange = (date: Date) => {
    if (startDate && endDate) {
      startDate = endDate = undefined
    }

    if (startDate && (dayjs(startDate).isBefore(date) || dayjs(date).isSame(startDate))) {
      endDate = new Date(date.getTime() + 86399999)
    } else {
      startDate = date
    }
  }
</script>


<div class="flex flex-col">
  <div class="relative">
    <div class="absolute left-2 top-0.5">
      <IconButton
        isDisabled={allowOnlyFutureDates && (
          dayjs(dateOfMonthShown).isBefore(dayjs(), 'month') ||
          dayjs(dateOfMonthShown).isSame(dayjs(), 'month')
        )}
        on:click={() => offsetShownMonth(-1)}
        ariaLabel="Show previous month"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-wull" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </IconButton>
    </div>
    <div class="absolute right-2 top-0.5">
      <IconButton ariaLabel="Show next month" on:click={() => offsetShownMonth(1)}>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </IconButton>
    </div>
  </div>
  
  <div class="flex gap-6">
    {#each Array(numberOfShownMonths) as _, i}
      <div class="flex flex-1 flex-wrap select-none text-center even:hidden md:even:flex">
        <div class="w-full pb-4 pt-2">
          {dayjs(dayjs(dateOfMonthShown).add(i, 'month').toDate()).format('MMMM YYYY')}
        </div>
        <div class="flex w-full h-10 items-center text-xs text-gray-500 font-semibold">
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
            {startDate}
            {endDate}
            isInMonth={isInMonth && (!allowOnlyFutureDates || dayjs(date).isAfter(dayjs()))}
            onSelected={handleDateChange}
          />
        {/each}
      </div>
    {/each}
  </div>
  {#if allowPickingTimeOfDay && startDate}
    <TimePicker bind:duration={timeOfDayInMs} />
  {/if}
</div>