<script lang="ts">
  import dayjs from 'dayjs'

  export let date: Date
  export let startDate: Date | string | undefined
  export let endDate: Date | string | undefined
  export let isInMonth: boolean
  export let onSelected: (date: Date) => void

  $: baseStyles = 'w-full h-10'

  $: selectedDateStyles = !notInMonthStyles && 
    (startDate && dayjs(date).isSame(startDate, 'day')) || 
    (endDate && dayjs(date).isSame(endDate, 'day')) ? `relative text-white bg-brand` : ''

  $: endDateStyles = !notInMonthStyles && 
    (startDate && !endDate && dayjs(date).isSame(startDate, 'day')) ||
    (endDate && dayjs(date).isSame(endDate, 'day')) ? `after:absolute after:-right-1 
    after:top-0 after:w-1 after:h-full after:rounded-r after:bg-brand` : ''
  
  $: startDateStyles = !notInMonthStyles && 
    (endDate && !startDate && dayjs(date).isSame(endDate, 'day')) ||
    (startDate && dayjs(date).isSame(startDate, 'day')) ? `before:absolute before:top-0 
    before:-left-1 before:w-1 before:h-full before:rounded-l before:bg-brand` : ''

  $: dateRangeStyles = !notInMonthStyles && 
    ((startDate && dayjs(date).isAfter(startDate, 'day')) &&
    (endDate && dayjs(date).isBefore(endDate, 'day'))) ? `bg-brand bg-opacity-25 
    hover:bg-opacity-30` : ''

  $: hoverStyles = !selectedDateStyles && !dateRangeStyles ? 'hover:bg-gray-100' : ''

  $: notInMonthStyles = !isInMonth ? `pointer-events-none 
    text-black text-opacity-25` : ''

  $: styles = [baseStyles, selectedDateStyles, startDateStyles, endDateStyles, dateRangeStyles, notInMonthStyles, hoverStyles].join(' ')
</script>

<div class="basis-[calc(100%/7)]">
  <button
    type="button"
    tabIndex={isInMonth ? undefined : -1}
    on:click={() => onSelected(date)}
    class={styles}
  >
    {date.getDate()}
  </button>
</div>
