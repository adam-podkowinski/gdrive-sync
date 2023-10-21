<script lang="ts">
  import "../styles.css";

  let showSettings = false;

  let clientId = "id";
  let clientSecret = "secret";

  const toggleSettings = () => {
    showSettings = !showSettings;
  };

  const saveSettings = () => {
    console.log(`CLIENTID: ${clientId}`);
    console.log(`CLIENTSECRET: ${clientSecret}`);
  };
</script>

<div class="bg-blue-950 min-h-screen text-blue-100">
  <header class="bg-blue-900 flex justify-between p-8 items-center">
    <h1 class="text-xl font-bold tracking-wide text-white">GDRIVE-SYNC</h1>
    <button on:click={toggleSettings} class="text-2xl bg-slate-800 p-2">⚙️</button>
  </header>
  {#if showSettings}
    <div class="w-[70%] h-[70%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] fixed bg-slate-900 p-8">
      <div class="flex items-center justify-between">
        <h2 class="font-bold text-xl">SETTINGS</h2>
        <div class="p-2 bg-slate-800">
          <button on:click={toggleSettings}>❌</button>
        </div>
      </div>
      <form class="p-4 mt-4 flex flex-col gap-4" on:submit={saveSettings}>
        <label for="clientId">CLIENT ID</label>
        <input bind:value={clientId} class="bg-slate-800 p-2" type="text" name="clientId" />
        <label for="clientSecret">CLIENT SECRET</label>
        <input bind:value={clientSecret} class="bg-slate-800 p-2" type="text" name="clientSecret" />
        <button type="submit" class="bg-blue-500 py-2 px-4 font-bold text-medium tracking-wide mt-6">SAVE</button>
      </form>
    </div>
  {/if}
  <main class="p-20">
    <slot />
  </main>
</div>
