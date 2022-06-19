<script lang="ts">
  export let onSelected: (seat: Seat) => void
  export let seat: Seat

  const handleClick = () => {
    onSelected(seat)
  }
</script>

<button on:click={handleClick}>
  <div class="w-8 h-5 rounded-md bg-red-700 text-white relative
    after:absolute after:left-0 after:-bottom-2.5 after:w-full 
    after:h-2 after:rounded-md after:bg-red-700"
  />
</button>