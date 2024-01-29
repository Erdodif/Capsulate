<script lang="ts">
    import {
        SwitchStatement,
        IfStatement,
        LoopStatement,
        SimpleStatement,
        Statement as StatementClass
    } from "$lib/classes/Statement";
    import IfElement from "./statements/IfElement.svelte";
    import LoopElement from "./statements/LoopElement.svelte";
    import SimpleElement from "./statements/SimpleElement.svelte";
    import SwitchElement from "./statements/SwitchElement.svelte";
    import { StatementSerializer } from "$lib/classes/StatementSerializer";
    import { statementPreview } from "$lib/stores/dndStatementPreview";

    /**
     * Don't beleive TypeScript, it just cannot type-check generics correctly
     */
    export let statement: any; //: AnyStatementStore;

    let dragged: boolean = false;

    const dragStart = (e: DragEvent | null) => {
        //alert("Drag started")
        if (e?.dataTransfer == null) {
            return;
        }
        $statementPreview = statement as StatementClass;
        e.dataTransfer.setData("text", "statement");
        e.dataTransfer.setData("text/plain", ($statement as StatementClass).type);
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
        dragged = true;
        setTimeout(() => {
            dragged = false;
        }, 0);
    };
</script>

<svelte:window />

<div
    class={`statement ${dragged ? "dragged" : ""}`}
    draggable="true"
    on:dragend={() => {
        dragged = false;
    }}
    on:dragstart|stopPropagation|capture|self={dragStart}
    role="cell"
    tabindex="0"
    on:dragend|preventDefault
    on:drop|preventDefault
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
    :global(.statement.dragged) {
        box-sizing: border-box;
        border: $struc-border;
    }
    .statement {
        color: $struc-color;
        background: $struc-background;
    }
</style>
