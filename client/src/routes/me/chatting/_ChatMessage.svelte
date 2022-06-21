<script lang="ts">
  import dayjs from 'dayjs'

  export let isMe: boolean = false
  export let authorName: string
  export let content: string
  export let createdAt: Date

  let messageRef: HTMLDivElement

  $: messageRef?.scrollIntoView({ behavior: 'smooth' })
</script>

<div class="flex gap-3 items-center" class:justify-end={isMe} bind:this={messageRef}>
  <div class={`p-3 max-w-[80%] rounded-2xl 
    ${isMe ? 'rounded-br bg-brand text-white' : 'rounded-bl bg-gray-100'}`
  }>
    <div class="text-xs">{authorName}</div>
    <p>{content}</p>
  </div>
  <span class:order-first={isMe} class="text-sm text-gray-500">
    {dayjs(createdAt).format('HH:mm')}
  </span>
</div>
