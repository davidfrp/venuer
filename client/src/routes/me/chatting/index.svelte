<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import ChatMessage from './_ChatMessage.svelte'
  import { session } from '$app/stores'
  import { io } from 'socket.io-client'
import Button from '$lib/components/Button.svelte'

  type Message = {
    author: {
      _id: string
      name: string
    }
    content: string
    createdAt: Date
  }

  const socket = io('ws://localhost:4000')

  socket.on('message', (message) => {
    messages = [...messages, message]
  })

  let authorsTyping: Message['author'][] = []

  socket.on('startedTyping', (author: Message['author']) => {
    if (author._id !== $session.user?._id) {
      if (!authorsTyping.includes(author)) {
        authorsTyping = [...authorsTyping, author]
      }
    }
  })

  socket.on('stoppedTyping', (author: Message['author']) => {
    authorsTyping = authorsTyping.filter((a) => a._id !== author._id)
  })

  let messages: Message[] = []
  let message: Message = {
    author: {
      _id: $session.user!._id,
      name: $session.user!.name
    },
    content: '',
    createdAt: new Date()
  }

  const handleSubmit = () => {
    if (message.content.trim().length > 0) {
      socket.emit('message', { ...message, createdAt: new Date() })
      handleNoLongerTyping()
      message.content = ''
    }
  }

  let isTyping: boolean
  
  const handleNoLongerTyping = () => {
    socket.emit('stoppedTyping', message.author)
    isTyping = false
  }

  let timeout: NodeJS.Timeout

  const handleTyping = () => {
    if (isTyping) {
      clearTimeout(timeout)
    } else {
      socket.emit('startedTyping', message.author)
      isTyping = true
    }

    timeout = setTimeout(handleNoLongerTyping, 10000)
  }

  $: if (message.content.length > 0) {
    handleTyping()
  }
</script>

<div class="space-y-6 mb-9 md:mb-16">
  {#each messages as message}
    <ChatMessage
      isMe={message.author._id === $session.user?._id}
      authorName={message.author.name}
      content={message.content}
      createdAt={message.createdAt}
    />
  {:else}
    <p class="text-center text-gray-500">No messages found</p>
  {/each}
</div>

<div class="fixed right-0 bottom-0 left-1/2 -translate-x-1/2 max-w-3xl w-full bg-white">
  {#if authorsTyping.length > 0}
    <span class="inline-block ml-6 mb-1.5 text-sm animate-pulse">
      {authorsTyping.map(author => author.name).join(', ')} is typing...
    </span>
  {/if}
  <form on:submit|preventDefault={handleSubmit} class="px-6 py-3 md:py-6 border-t flex gap-3 items-center">
    <div class="flex-1">
      <TextInput id="message" placeholder="Message anyone" bind:value={message.content} />
    </div>
    <Button variant="contained" size="md">
      Send
    </Button>
  </form>
</div>
