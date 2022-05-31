<script lang="ts">
  export let id: string
  export let label: string = ''
  export let placeholder: string = ''
  export let value: string = ''
  export let isPassword: boolean = false
  export let inputRef: HTMLInputElement | null = null

  let isPasswordShown: boolean = false
</script>

<fieldset class="flex flex-col relative">
  <label for={id} class="mb-2">{label}</label>
  <div class="flex items-center">
    <input
      {id}
      name={id}
      {...{type: isPassword && !isPasswordShown ? 'password' : 'text'}}
      placeholder={placeholder || label}
      bind:value={value}
      bind:this={inputRef}
      class="px-4 py-3 w-full bg-slate-100"
    />
    {#if isPassword}
      <button
        type="button"
        role="switch"
        tabindex={-1}
        aria-controls={id}
        on:click={() => isPasswordShown = !isPasswordShown}
        class="absolute right-4 font-semibold text-sm text-brand
        hover:text-opacity-90 transition-colors">
        {isPasswordShown ? 'hide' : 'show'}
      </button>
    {/if}
  </div>
</fieldset>
