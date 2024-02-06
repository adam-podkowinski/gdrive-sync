import { goto } from "$app/navigation";
import { derived, writable } from "svelte/store";

export const user = writable<string | undefined>();
export const dirToSync = writable<string | undefined>();

user.subscribe(async (user) => {
    if (user) {
        await goto("/homepage");
    } else {
        await goto("/");
    }
});

export const clientId = writable<string>("");
export const clientSecret = writable<string>("");

export const drives = writable<[] | undefined>();

export const signedIn = derived(user, (u) => u !== undefined);
