<script lang="ts">
    import {invoke} from "@tauri-apps/api/tauri";
    import {shell} from "@tauri-apps/api";
    import {listen} from '@tauri-apps/api/event'

    // TODO: unlisten when user logged in
    listen('openGoogleAuth', async (event) => {
        await shell.open(event.payload);
    })

    const getInfo = async () => {
        const info: string = await invoke("info");
        console.log(info);
    }

    const submit = async () => {
        await invoke('init_gdrive');
    }
</script>

<main class="bg-green-950 min-h-screen text-green-200 p-12">
    <h1 class="text-5xl font-extrabold text-center mb-12">Welcome to GDrive Sync!</h1>
    <form on:submit|preventDefault={submit}>
        <button type="submit" class="px-3 py-2 bg-green-400 text-black rounded-xl">Submit</button>
        <button type="button" on:click={getInfo} class="px-3 py-2 bg-green-400 text-black rounded-xl">Get About</button>
    </form>
</main>