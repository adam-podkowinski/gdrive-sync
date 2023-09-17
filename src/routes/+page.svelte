<script lang="ts">
    import { loggedIn, user } from "../stores/gdrive.js";
</script>
<main class="bg-green-950 min-h-screen text-green-200 p-12">
    Welcome!
    <p>User: {$loggedIn} ({$user})</p>
    <a href="/login">LOGIN</a>
</main>
