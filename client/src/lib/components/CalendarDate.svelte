<script lang="ts">
  import dayjs from 'dayjs'

  export let date: Date
  export let afterDate: Date | null
  export let beforeDate: Date | null
  export let isInMonth: boolean
  export let onSelected: (date: Date) => void

  $: baseStyles = 'w-full h-10'

  $: selectedDateStyles = !notInMonthStyles && (dayjs(date).isSame(beforeDate, 'day') ||
    dayjs(date).isSame(afterDate, 'day')) ? `text-white bg-brand` : ''

  $: beforeDateStyles = !notInMonthStyles && (dayjs(date).isSame(beforeDate, 'day') || 
    (dayjs(date).isSame(afterDate, 'day') && !beforeDate)) ?
    `relative after:absolute after:-right-1 after:top-0 after:w-1 
    after:h-full after:rounded-r after:bg-brand` : ''

  $: afterDateStyles = !notInMonthStyles && dayjs(date).isSame(afterDate, 'day') ?
    `relative before:absolute before:-left-1 before:top-0 before:w-1 
    before:h-full before:rounded-l before:bg-brand` : ''

  $: dateRangeStyles = !notInMonthStyles && (dayjs(date).isAfter(afterDate, 'day') &&
    dayjs(date).isBefore(beforeDate, 'day')) ? `bg-brand bg-opacity-25 
    hover:bg-opacity-30` : ''

  $: hoverStyles = !selectedDateStyles && !dateRangeStyles ? 'hover:bg-gray-100' : ''

  $: notInMonthStyles = !isInMonth ? `pointer-events-none 
    text-black text-opacity-25` : ''

  $: styles = [baseStyles, selectedDateStyles, afterDateStyles, beforeDateStyles, dateRangeStyles, notInMonthStyles, hoverStyles].join(' ')
</script>

<div class="basis-[calc(100%/7)]">
  <button
    tabIndex={isInMonth ? undefined : -1}
    on:click={() => onSelected(date)}
    class={styles}
  >
    {date.getDate()}
  </button>
</div>
