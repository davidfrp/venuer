<script lang="ts">
  export let title: string
  export let seats: Seat[] = []
  export let selectedSeats: Seat[] = []
</script>

<div class="p-12 flex flex-col items-center bg-red-50">
  <h1 class="my-3 text-lg font-semibold">{title}</h1>
  <div class="flex flex-col gap-5">
    <!-- {#each rowsAndSeats as row, i}
      <div class="flex gap-2 text-center">
        <div class="py-1 w-8 ml-3">{i + 1}</div>
        {#each row as seat}
          <Seat seat={{ _id: '0', name: seat.name.toString() }} onSelected={handleSelection} />
        {/each}
        <div class="py-1 w-8 ml-3">{i + 1}</div>
      </div>
    {/each} -->
  </div>
</div>
