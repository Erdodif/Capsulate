import type { Statement } from "$lib/classes/Statement";
import { writable, type Writable } from "svelte/store";

export let statementPreview: Writable<Statement> = writable();
export let currentPreviewID: Writable<number> = writable(0);

export let previewID = new class {
    #value = 0;
    next: (() => number) = () => {
        return this.#value++;
    }
};
