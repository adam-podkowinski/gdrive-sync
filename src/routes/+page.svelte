<script lang="ts">
    import { invoke } from "@tauri-apps/api/tauri";
    import { clientId, clientSecret, user } from "../stores/gdrive.js";

    invoke("check_cache")
        .then((email) => {
            if (email) {
                $user = email as string;
            }
        })
        .catch(() => {});

    let loading = false;
    const signIn = async () => {
        loading = true;
        $user = await invoke("sign_in", {
            clientId: $clientId.length > 0 ? $clientId : undefined,
            clientSecret: $clientSecret.length > 0 ? $clientSecret : undefined
        });
        loading = false;
    };
</script>

<h1 class="font-bold text-2xl">Welcome!</h1>
<p class="mb-8 mt-1">
    Please, provide mandatory variables for connecting with Google Drive (OAuth app) or leave form inputs blank to use
    environment variables (CLIENT_ID and CLIENT_SECRET variables). After clicking "Submit" a Google OAuth site should
    pop up and you will be able to sign in to a Google account you want to use GDrive-Sync with. <br />Program will
    create a file at ~/.config/google_tokens. Keep it secure because sensitive data will be kept there for caching purposes.
</p>
<form on:submit|preventDefault={signIn} class="flex flex-col gap-4 bg-slate-900 p-4">
    <h2 class="font-bold text-xl">GOOGLE OAUTH</h2>
    <div>
        <label for="clientId">CLIENT ID: </label>
        <input bind:value={$clientId} class="border-4 border-blue-200 bg-slate-800 p-1" type="text" name="clientId" />
    </div>
    <div>
        <label for="clientSecret">CLIENT SECRET: </label>
        <input
            bind:value={$clientSecret}
            class="border-4 border-blue-200 bg-slate-800 p-1"
            type="text"
            name="clientSecret"
        />
    </div>
    {#if !loading}
        <button type="submit" class="self-start px-8 py-2 my-2 bg-blue-600 font-bold text-white">Submit</button>
    {:else}
        <p>Loading...</p>
    {/if}
</form>
