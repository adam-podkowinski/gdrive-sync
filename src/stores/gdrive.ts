import { goto } from "$app/navigation";
import { derived, writable } from "svelte/store";

export const user = writable<string | undefined>();

user.subscribe((user) => {
  if (user) {
    goto("/homepage");
  } else {
    goto("/");
  }
});

export const clientId = writable<string>("");
export const clientSecret = writable<string>("");

export const drives = writable<[] | undefined>();

export const loggedIn = derived(user, (u) => u !== undefined);
