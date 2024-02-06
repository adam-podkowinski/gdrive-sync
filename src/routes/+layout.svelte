<script lang="ts">
    import { invoke } from "@tauri-apps/api/tauri";
    import { signedIn, user } from "../stores/gdrive";
    import "../styles.css";

    let showSettings = false;

    const signOut = async () => {
        await invoke("sign_out");
        $user = undefined;
        toggleSettings();
    };

    const toggleSettings = () => {
        showSettings = !showSettings;
    };
</script>

<div class="bg-blue-950 min-h-screen text-blue-100">
    <header class="bg-blue-900 flex justify-between p-8 items-center">
        <h1 class="text-xl font-bold tracking-wide text-white">GDRIVE-SYNC</h1>
        <button on:click={toggleSettings} class="text-2xl bg-slate-800 p-2 hover:bg-slate-900 transition-colors"
            >⚙️</button
        >
    </header>
    {#if showSettings}
        <div
            class="w-[70%] h-[70%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] absolute bg-slate-900 p-8"
        >
            <div class="flex items-center justify-between">
                <h2 class="font-bold text-xl">SETTINGS</h2>
                <button class="p-2 bg-slate-800 hover:bg-slate-700 transition-colors" on:click={toggleSettings}
                    >❌</button
                >
            </div>
            {#if $signedIn}
                <button on:click={signOut} class="py-2 px-4 bg-blue-500 text-white mt-4">SIGN OUT</button>
            {/if}
        </div>
    {/if}
    <main class="p-8">
        <slot />
    </main>
</div>
