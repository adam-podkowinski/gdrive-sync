import { derived, writable } from "svelte/store";

export const user = writable<string | undefined>(undefined);

export const loggedIn = derived(user, (u) => u !== undefined);

export const drives = writable<[] | undefined>(undefined);
