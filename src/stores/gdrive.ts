import {writable} from "svelte/store";

export const user = writable<string | undefined>(undefined);

export const drives = writable<[] | undefined>(undefined);