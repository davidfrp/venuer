<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ fetch }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    return {
      status: response.status,
      props: {
        posts: response.ok && (await response.json())
      }
    }
  }
</script>

<script lang="ts">
  type Post = {
    id: number
    title: string
    body: string
  }

  export let posts: Post[]
</script>

<a href="/">Go to front page</a>
<ul>
  {#each posts as post}
    <li>
      <a sveltekit:prefetch href={`/posts/${post.id}`}>
        {post.title}
      </a>
    </li>
  {/each}
</ul>
