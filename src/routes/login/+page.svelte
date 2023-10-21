<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { loggedIn, user } from "../../stores/gdrive";

  let loading = false;

  const signIn = async () => {
    loading = true;
    $user = await invoke("sign_in");
    loading = false;
  };
</script>

<h1 class="text-5xl font-extrabold text-center mb-12">Welcome to GDrive Sync!</h1>
<a href="/">BACK</a>
<p>User: {$loggedIn} ({$user})</p>
{#if !loading}
  <form on:submit|preventDefault={signIn}>
    <button type="submit" class="px-3 py-2 my-2 bg-blue-600 font-bold text-white">Submit</button>
  </form>
{:else}
  <p>Loading...</p>
{/if}
