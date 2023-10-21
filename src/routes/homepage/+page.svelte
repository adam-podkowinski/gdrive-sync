<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { loggedIn, user } from "../../stores/gdrive";
  const signOut = async () => {
    await invoke("sign_out");
    $user = undefined;
  };
</script>

<h1 class="text-5xl font-extrabold text-center mb-12">Welcome to GDrive Sync!</h1>
<p>User: {$loggedIn} ({$user})</p>
<button on:click={signOut} class="py-2 px-4 bg-blue-500 text-white mt-4">SIGN OUT</button>
