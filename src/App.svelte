<script lang="ts">
    import {invoke} from "@tauri-apps/api/tauri";

    let loading = false;

    const signIn = async () => {
        loading = true;
        const email = await invoke('sign_in');
        loading = false;
        console.log(`Signed in: ${email}`);
    }
</script>

<main class="bg-green-950 min-h-screen text-green-200 p-12">
    <h1 class="text-5xl font-extrabold text-center mb-12">Welcome to GDrive Sync!</h1>
    {#if !loading}
        <form on:submit|preventDefault={signIn}>
            <button type="submit" class="px-3 py-2 bg-green-400 text-black rounded-xl">Submit</button>
        </form>
    {:else}
        <p>Loading...</p>
    {/if}
</main>
