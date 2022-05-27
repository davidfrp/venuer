/// <reference types="@sveltejs/kit" />

declare type User = {
  id: string
  role: string
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  interface Session {
    user: User | null
  }
  // interface Stuff {}
}
