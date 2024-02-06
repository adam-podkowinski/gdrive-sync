<script lang="ts">
    import { invoke } from "@tauri-apps/api/tauri";
    import { dirToSync, user } from "../../stores/gdrive";
    const syncDirectory = async () => {
        await invoke("sync_dir", { path: $dirToSync });
    };
</script>

<h1 class="text-5xl font-extrabold text-center mb-12">Welcome to GDrive Sync!</h1>
<p>User signed in: {$user}</p>
<form on:submit|preventDefault={syncDirectory} class="mt-4 flex flex-col gap-4">
    <div>
        <label for="dir">Path to a directory to sync</label>
        <input
            type="text"
            bind:value={$dirToSync}
            required={true}
            name="dir"
            class="p-1 bg-blue-200 text-black shadow-none focus:ring-4 ring-offset-0 focus:outline-none ring-blue-500"
        />
    </div>
    <button type="submit" class="px-4 py-2 bg-blue-500 text-black hover:bg-blue-600 transition-colors">SYNC</button>
</form>
