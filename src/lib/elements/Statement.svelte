<script lang="ts">
    import {
        SwitchStatement,
        IfStatement,
        LoopStatement,
        SimpleStatement,
        Statement as StatementClass,
    } from "$lib/classes/Statement";
    import IfElement from "./statements/IfElement.svelte";
    import LoopElement from "./statements/LoopElement.svelte";
    import SimpleElement from "./statements/SimpleElement.svelte";
    import SwitchElement from "./statements/SwitchElement.svelte";
    import { StatementSerializer } from "$lib/classes/StatementSerializer";
    import {
        statementPreview,
        currentDropzoneID,
        previewID,
    } from "$lib/stores/dndStatementPreview";
    import { writable } from "svelte/store";

    /**
     * Don't beleive TypeScript, it just cannot type-check generics correctly
     */
    export let statement: any; //: AnyStatementStore;

    let dragged = writable(false);

    const dragStart = (e: DragEvent | null) => {
        $dragged = true;
        //alert("Drag started")
        if (e?.dataTransfer == null) {
            return;
        }
        statementPreview.set(statement as StatementClass);
        $previewID = ($statement as StatementClass).id;
        e.dataTransfer.setData("text", "statement");
        e.dataTransfer.setData(
            "text/plain",
            ($statement as StatementClass).type
        );
        e.dataTransfer.setData(
            "application/json",
            JSON.stringify(StatementSerializer.toJson($statement))
        );
        e.dataTransfer.setData(
            "application/structogram",
            JSON.stringify({
                id: statement.id,
                statement: JSON.stringify(
                    StatementSerializer.toJson($statement)
                ),
            })
        );
        e.dataTransfer.effectAllowed = "move";
        setTimeout(() => {
            $dragged = false;
        }, 1);
    };
</script>

<svelte:window />

<div
    class={`statement ${$dragged ? "dragged" : ""} ${
        !$dragged && $previewID == $statement.id
            ? "under-preview"
            : ""
    }`}
    draggable="true"
    on:dragend={() => {
        $dragged = false;
    }}
    on:dragstart|capture|self={dragStart}
    role="cell"
    tabindex="0"
    on:dragend|preventDefault={(_)=>{
        $previewID = -1;
        $statementPreview = null;
        $currentDropzoneID = -1;
    }}
    on:drop|preventDefault={(_)=>{
        $previewID = -1;
        $statementPreview = null;
        $currentDropzoneID = -1;
    }}
>
    {#if $statement instanceof SwitchStatement}
        <!-- @ts-ignore -->
        <SwitchElement {statement} />
    {:else if $statement instanceof IfStatement}
        <!-- @ts-ignore -->
        <IfElement {statement} />
    {:else if $statement instanceof LoopStatement}
        <!-- @ts-ignore -->
        <LoopElement {statement} />
    {:else if $statement instanceof SimpleStatement}
        <!-- @ts-ignore -->
        <SimpleElement {statement} />
    {:else}
        {console.error(statement)}
    {/if}
</div>

<style lang="scss">
    @keyframes remove {
        0% {
            visibility: visible;
            opacity: 1;
            height: 100%;
            display: block;
        }
        99% {
            height: 0%;
            opacity: 0.5;
            visibility: visible;
            display: block;
        }
        100% {
            visibility: none;
            display: none;
            z-index: -1000;
        }
    }
    .statement {
        color: $struc-color;
        display: block;
        background: $struc-background;
        &.dragged {
            box-sizing: border-box;
            border: 0.2em dashed $struc-border-color !important;
        }
    }
    .statement.under-preview {
        animation: remove 600ms ease-in-out 65ms normal forwards;
        font-size: smaller;
        :global(.dropzone) {
            display: none;
        }
    }
</style>
