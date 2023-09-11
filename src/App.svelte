<script lang="ts">
    import {invoke} from "@tauri-apps/api/tauri";
    import {shell} from "@tauri-apps/api";

    const submit = async () => {
        const consentURL: string = await invoke('init_gdrive');
        await shell.open(consentURL);
    }
</script>

<main class="bg-green-950 min-h-screen text-green-200 p-12">
    <h1 class="text-5xl font-extrabold text-center mb-12">Welcome to GDrive Sync!</h1>
    <form on:submit|preventDefault={submit}>
        <button type="submit" class="px-3 py-2 bg-green-400 text-black rounded-xl">Submit</button>
    </form>
</main>