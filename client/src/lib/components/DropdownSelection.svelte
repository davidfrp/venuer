<script lang="ts">
  export let id: string
  export let label: string
  export let value: any = undefined
</script>

<div class="flex flex-col">
  <label for={id} class="mb-2">{label}</label>
  <div class="px-4 w-full bg-gray-100 rounded-lg border">
    <select
      class="w-full py-3 bg-inherit cursor-pointer"
      bind:value
      {id}
    >
      <slot />
    </select>
  </div>
</div>
