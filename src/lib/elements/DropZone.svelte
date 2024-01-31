<script lang="ts">
    import type { Statement as StatementClass } from "$lib/classes/Statement";
    import { createEventDispatcher } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import Statement from "./Statement.svelte";
    import {
        statementPreview,
        dropzoneID,
        currentDropzoneID
    } from "$lib/stores/dndStatementPreview";
    const dispatch = createEventDispatcher();
    const PREVIEW_TRIGGER_DELAY = 210;

    let ID = dropzoneID.next();

    export let exclude: number[] = [];
    export let mimes: string[] = ["text"];

    let data: Map<string, string> = new Map();

    let accept = writable(false); // TODO - Enforce in events
    let statement: Writable<StatementClass | null> = writable();
</script>

<svelte:window
    on:dragstart={(e) => {
        if (
            mimes.findIndex(
                (mime) => e.dataTransfer?.getData(mime) ?? "" !== ""
            ) !== -1 &&
            //!exclude.find((id) => ($statementPreview?.id ?? -1) == id)
        !exclude.find((id) => ($statementPreview?.id ?? -1) == id)
        ) {
            $accept = true;
        } else {
            $accept = false;
        }
    }}
    on:dragend|capture={(_) => {
        $accept = false;
        $currentDropzoneID = -1;
        $statementPreview = null;
    }}
    on:drop|capture={(_) => {
        $currentDropzoneID = -1;
        $statementPreview = null;
        console.log("global drop");
    }}
/>

<aside
    class={`dropzone ${
        $currentDropzoneID == ID ? "preview" : $accept ? "show" : "behind-all"
    }`}
    on:dragenter|preventDefault={(e) => {
        dispatch("dragenter", e);
    }}
    on:dragleave|preventDefault={(_) => {
        if (!($currentDropzoneID == ID)) {
            $currentDropzoneID = -1;
        }
    }}
    on:dragover|preventDefault={(_) => {
        if ($currentDropzoneID != ID && $accept) {
            if (mimes.find((mime) => mime == "application/structogram")) {
                let above = true;
                $statement = $statementPreview;
                setTimeout(() => {
                    if (above) {
                        if ($currentDropzoneID != ID) {
                            $currentDropzoneID = ID;
                        }
                    } else {
                        if ($currentDropzoneID == ID) {
                            $currentDropzoneID = -1;
                        }
                    }
                }, PREVIEW_TRIGGER_DELAY);
            }
        }
    }}
    on:drop|capture={(e) => {
        for (const mime of mimes) {
            if (e.dataTransfer && e.dataTransfer.getData(mime) !== "") {
                data.set(mime, e.dataTransfer.getData(mime));
            }
        }
        dispatch("drop", data);
        if ($currentDropzoneID == ID) {
            $currentDropzoneID = -1;
        }
        return true;
    }}
>
    {#if $currentDropzoneID == ID && $statementPreview}
        <div
            id="preview target"
            on:dragleave|capture={(e) => {
                if ($currentDropzoneID == ID) {
                    $currentDropzoneID = -1;
                }
                dispatch("dragleave", e);
            }}
            on:drop|capture={(e) => {
                for (const mime of mimes) {
                    if (e.dataTransfer && e.dataTransfer.getData(mime) !== "") {
                        data.set(mime, e.dataTransfer.getData(mime));
                    }
                }
                dispatch("drop", data);
                if ($currentDropzoneID == ID) {
                    $currentDropzoneID = -1;
                }
                return true;
            }}
            role="presentation"
        >
            <Statement statement={$statement} preview />
        </div>
    {/if}
</aside>

<style lang="scss">
    .dropzone {
        min-height: unset !important;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        &.show {
            height: 0.35em !important;
            margin-top: -1.5 * $struc-border-width;
            z-index: 100;
            background: $secondary;
            opacity: 0.1;
            border: 0.2em dashed $struc-border-color;
        }
        &.behind-all {
            margin-top: -0.5em;
            z-index: -1;
            color: transparent;
            background-color: transparent;
        }
        &.preview {
            min-height: 1em;
            margin-top: 0em;
            z-index: 100;
            height: auto;
            display: block;
            position: relative;
            border-bottom: $struc-border;
        }
    }
</style>
