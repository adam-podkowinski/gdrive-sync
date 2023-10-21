<script lang="ts">
  import "../styles.css";

  let showSettings = false;

  const toggleSettings = () => {
    showSettings = !showSettings;
  };
</script>

<div class="bg-blue-950 min-h-screen text-blue-100">
  <header class="bg-blue-900 flex justify-between p-8 items-center">
    <h1 class="text-xl font-bold tracking-wide text-white">GDRIVE-SYNC</h1>
    <button on:click={toggleSettings} class="text-2xl bg-slate-800 p-2">⚙️</button>
  </header>
  {#if showSettings}
    <div class="w-[70%] h-[70%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] absolute bg-slate-900 p-8">
      <div class="flex items-center justify-between">
        <h2 class="font-bold text-xl">SETTINGS</h2>
        <div class="p-2 bg-slate-800">
          <button on:click={toggleSettings}>❌</button>
        </div>
      </div>
    </div>
  {/if}
  <main class="p-8">
    <slot />
  </main>
</div>
