<script lang="ts">
    import {
        SwitchStatement,
        IfStatement,
        LoopStatement,
        SimpleStatement,
    } from "$lib/classes/Statement";
    import IfElement from "./statements/IfElement.svelte";
    import LoopElement from "./statements/LoopElement.svelte";
    import SimpleElement from "./statements/SimpleElement.svelte";
    import SwitchElement from "./statements/SwitchElement.svelte";
    import type { AnyStatementStore } from "$lib/stores/structogram";

    /**
     * Don't beleive TypeScript, it just cannot type-check generics correctly
     */
    export let statement:any//: AnyStatementStore;
</script>

<div class="statement">
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
    .statement {
        color: $struc-color;
        background: $struc-background;
    }
</style>
