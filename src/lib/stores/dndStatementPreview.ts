import type { Statement } from "$lib/classes/Statement";
import { writable, type Writable } from "svelte/store";

export let statementPreview: Writable<Statement | null> = writable(null);
export let previewID: Writable<number> = writable(-1);
export let currentDropzoneID: Writable<number> = writable(-1);

export let dropzoneID = new class {
    #value = 0;
    next: (() => number) = () => {
        return this.#value++;
    }
};
