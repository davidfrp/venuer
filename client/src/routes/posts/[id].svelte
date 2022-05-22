<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ fetch, params }) => {
    const { id } = params
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

    if (response.ok) {
      return {
        status: response.status,
        props: {
          post: response.ok && (await response.json())
        }
      }
    }

    return {
      error: new Error(`Could not load post with id ${id}`)
    }
  }
</script>

<script lang="ts">
  type Post = {
    id: number
    title: string
    body: string
  }

  export let post: Post | undefined
</script>

<p>This is a specific venue, with id {post?.id}</p>
<p>{post?.title}</p>
<p>{post?.body}</p>
