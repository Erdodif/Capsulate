<script lang="ts">
    import {
        SwitchStatement,
        IfStatement,
        LoopStatement,
        type AnyStatement,
        type Statement,
        SimpleStatement,
    } from "$lib/classes/Statement";
    import { error } from "@sveltejs/kit";
    import IfElement from "./statements/IfElement.svelte";
    import LoopElement from "./statements/LoopElement.svelte";
    import SimpleElement from "./statements/SimpleElement.svelte";
    import SwitchElement from "./statements/SwitchElement.svelte";

    export let statement: Statement;
</script>

<div class="statement">
    {#if statement instanceof SwitchStatement}
        <SwitchElement {statement} />
    {:else if statement instanceof IfStatement}
        <IfElement {statement} />
    {:else if statement instanceof LoopStatement}
        <LoopElement {statement} />
    {:else if statement instanceof SimpleStatement}
        <SimpleElement {statement} />
    {:else}
        @error("Invalid Statement inserted!")
        {console.error(statement)}
    {/if}
</div>

<style lang="scss">
    .statement {
        color: $struc-color;
        background: $struc-background;
    }
</style>
