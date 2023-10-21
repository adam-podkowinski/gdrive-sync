<script lang="ts">
  import { loggedIn, user } from "../stores/gdrive.js";
</script>

<main class="min-h-screen text-blue-100 p-12">
  Welcome!
  <p>User: {$loggedIn} ({$user})</p>
  <a href="/login">LOGIN</a>
</main>
