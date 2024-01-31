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
    } from "$lib/stores/dndStatementPreview";
    import { writable } from "svelte/store";

    /**
     * Don't beleive TypeScript, it just cannot type-check generics correctly
     */
    export let statement: any; //: AnyStatementStore;
    export let preview = false;
    let element: HTMLDivElement;

    const dragStart = (e: DragEvent | null) => {
        //alert("Drag started")
        if (e?.dataTransfer == null) {
            return;
        }
        let dt = e.dataTransfer;
        statementPreview.set(statement as StatementClass);
        setTransferImage(dt);
        dt.setData("text", "statement");
        dt.setData("text/plain", ($statement as StatementClass).type);
        let json: any = StatementSerializer.toJson($statement);
        json.id = $statement.id;
        dt.setData("application/json", JSON.stringify(json));
        dt.setData(
            "application/structogram",
            JSON.stringify({
                id: statement.id,
                statement: JSON.stringify(json),
            })
        );
        dt.effectAllowed = "move";
    };

    const setTransferImage = (dt: DataTransfer) => {
        let clone = element.cloneNode(true) as HTMLDivElement;
        let holder = document.createElement("div");
        clone.className = "";
        clone.classList.add("statement");
        clone.classList.add("dragged");
        holder.style.position = "absolute";
        holder.style.right = "-1px";
        document.body.appendChild(holder);
        holder.append(clone);
        dt.setDragImage(clone, clone.clientWidth / 2, 0);
        setTimeout(() => {
            document.body.removeChild(holder);
        }, 1);
    };

    const dragReset = (_: DragEvent) => {
        $statementPreview = null;
        $currentDropzoneID = -1;
    };
</script>

<svelte:window />

<div
    class={`statement ${
        !preview && ($statementPreview?.id ?? -1) == $statement.id
            ? "under-preview"
            : ""
    }`}
    draggable="true"
    role="row"
    tabindex="0"
    on:dragstart|capture|self={dragStart}
    on:dragend|preventDefault={dragReset}
    on:drop|preventDefault={dragReset}
    bind:this={element}
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
            opacity: 0.9 !important;
            height: 100% !important;
            display: block !important;
        }
        99% {
            height: 0% !important;
            opacity: 0 !important;
            display: block !important;
            position: relative !important;
        }
        100% {
            position: absolute !important;
            visibility: none !important;
            display: none;
            z-index: -1000 !important;
        }
    }
    .statement {
        cursor: grab;
        color: $struc-color;
        display: block;
        background: $struc-background;
        &.dragged {
            text-overflow: ellipsis;
            background: $secondary-variant !important;
            box-sizing: border-box;
            max-width: 10em;
            border: 0.2em dashed $struc-border-color !important;
        }
    }
    .statement.under-preview {
        background: transparent;
        animation: remove 250ms linear 65ms forwards;
        :global(.dropzone) {
            display: none;
        }
    }
</style>
