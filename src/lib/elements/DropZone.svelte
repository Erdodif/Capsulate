<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { writable } from "svelte/store";
    const dispatch = createEventDispatcher();

    export let mimes: string[] = ["text"];

    let data: Map<string, string> = new Map();

    let accept = writable(false);

    let above = writable(false);
</script>

<svelte:window
    on:dragstart={(e) => {
        if (
            mimes.findIndex(
                (mime) => e.dataTransfer?.getData(mime) ?? "" !== ""
            ) !== -1
        ) {
            setTimeout(() => {
                $accept = true;
            }, 3);
        } else {
            $accept = false;
        }
    }}
    on:dragend|capture={(e) => {
        $accept = false;
    }}
/>

<aside
    class={`dropzone ${$above ? "above" : ""} ${
        $accept ? "show" : "behind-all"
    }`}
    on:dragenter|preventDefault={(e) => {
        if (mimes.map((mime) => e.dataTransfer?.getData(mime))) {
            $above = true;
        }
        dispatch("dragenter", e);
    }}
    on:dragleave|preventDefault={(e) => {
        $above = false;
        dispatch("dragleave", e);
    }}
    on:dragexit|preventDefault={(e) => {
        $above = false;
    }}
    on:dragover|preventDefault={(e) => {
        if (mimes.map((mime) => e.dataTransfer?.getData(mime))) {
            $above = true;
        }
    }}
    on:drop|capture={(e) => {
        for (const mime of mimes) {
            if (e.dataTransfer && e.dataTransfer.getData(mime) !== "") {
                data.set(mime, e.dataTransfer.getData(mime));
            }
        }
        dispatch("drop", data);
        return true;
    }}
>
    <slot />
</aside>

<style lang="scss">
    //Other style shall be set in :global() context
    .dropzone {
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        &.show {
            z-index: 10;
            background: $secondary;
        }
        &.behind-all {
            z-index: -1;
            color: transparent;
            background-color: transparent;
        }
    }
</style>
