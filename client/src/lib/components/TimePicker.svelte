<script lang="ts">
  import DropdownSelection from './DropdownSelection.svelte'
  import { slide } from 'svelte/transition'

  export let duration: number

  let selectedHours: number = Math.floor(duration / 1000 / 60 / 60)
  let selectedMinutes: number = Math.floor(duration / 1000 / 60 % 60)

  $: duration = (
    (selectedHours * 60 * 60 * 1000) +
    (selectedMinutes * 60 * 1000)
  )

  const hours: number[] = Array.from({ length: 24 }, (_, i) => i)
  const minutes: number[] = Array.from({ length: 60 }, (_, i) => i)
</script>

<div class="flex gap-3" transition:slide|local>
  <div class="flex-1">
    <DropdownSelection id="hours" label="Hours" bind:value={selectedHours}>
      {#each hours as hour (hour)}
        <option value={hour}>{hour}</option>
      {/each}
    </DropdownSelection>
  </div>
  <div class="flex-1">
    <DropdownSelection id="minutes" label="Minutes" bind:value={selectedMinutes}>
      {#each minutes as minute (minute)}
        <option value={minute}>{minute}</option>
      {/each}
    </DropdownSelection>
  </div>
</div>