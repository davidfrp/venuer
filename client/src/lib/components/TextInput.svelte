<script lang="ts">
  export let id: string
  export let label: string | undefined = undefined
  export let placeholder: string | undefined = undefined
  export let value: string | undefined = undefined
  export let inputRef: HTMLInputElement | null = null
  export let isPassword: boolean = false

  let isPasswordShown: boolean = false
</script>

<fieldset class="flex flex-col min-w-[20rem]">
  {#if label}
    <label for={id} class="mb-2">{label}</label>
  {/if}
  <div class="flex items-center relative">
    <input
      class="px-4 py-3 w-full bg-gray-100 rounded-lg border placeholder:text-gray-500"
      {...{type: isPassword && !isPasswordShown ? 'password' : 'text'}}
      placeholder={placeholder}
      bind:this={inputRef}
      bind:value={value}
      name={id}
      id={id}
    />
    {#if isPassword}
      <button
        class="absolute right-4 font-semibold text-sm text-brand
        hover:text-opacity-90 transition-colors"
        on:click={() => isPasswordShown = !isPasswordShown}
        aria-controls={id}
        tabindex={-1}
        type="button"
        role="switch"
      >
        {isPasswordShown ? 'hide' : 'show'}
      </button>
    {/if}
  </div>
</fieldset>
