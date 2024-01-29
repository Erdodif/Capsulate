<script lang="ts">
    import type { Statement as StatementClass } from "$lib/classes/Statement";
    import { createEventDispatcher } from "svelte";
    import { readonly, writable, type Writable } from "svelte/store";
    import Statement from "./Statement.svelte";
    import {
        StatementSerializer,
        type StatementJson,
    } from "$lib/classes/StatementSerializer";
    import type { StatementStore } from "$lib/stores/structogram";
    import {
        statementPreview,
        previewID,
        currentPreviewID,
    } from "$lib/stores/dndStatementPreview";
    const dispatch = createEventDispatcher();

    let ID = previewID.next();

    export let mimes: string[] = ["text"];

    let data: Map<string, string> = new Map();

    let accept = writable(false); // TODO - Enforce in events
    let above = writable(false);
    let preview = writable(false);
    let statement: Writable<StatementClass> = writable();
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
        $preview = false;
    }}
/>

<aside
    class={`dropzone ${$above ? "above" : ""} ${
        !$preview && $accept ? "show" : "behind-all"
    } ${$preview ? "preview" : ""}`}
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
    on:dragover|preventDefault={(e) => {
        if (mimes.find((mime) => mime == "application/structogram")) {
            $above = true;
            $currentPreviewID = ID;
            setTimeout(() => {
                if ($above && $currentPreviewID == ID && !$preview) {
                    preview.set(true);
                    statement.set($statementPreview);
                }
                else{
                    preview.set(false);
                }
            }, 500);
        }
    }}
    on:drop|capture={(e) => {
        for (const mime of mimes) {
            if (e.dataTransfer && e.dataTransfer.getData(mime) !== "") {
                data.set(mime, e.dataTransfer.getData(mime));
            }
        }
        dispatch("drop", data);
        $above = false;
        $preview = false;
        return true;
    }}
>
    {#if $preview && $currentPreviewID == ID}
        <div class="preview">
            <Statement statement={$statement} />
        </div>
    {/if}
</aside>

<style lang="scss">
    //Other style shall be set in :global() context
    .dropzone {
        min-height: 0.25em;
        height: 0.5em;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        //bottom: 0;
        &.show {
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
            border-top: $struc-border;
            margin-top: 0em;
            z-index: 100;
            height: 2em;
            position: relative;
        }
    }
</style>
