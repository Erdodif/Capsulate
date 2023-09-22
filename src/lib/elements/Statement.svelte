<script lang="ts">
    import {
        SwitchStatement,
        IfStatement,
        LoopStatement,
        SimpleStatement,
        type Statement,
    } from "$lib/classes/Statement";
    import IfElement from "./statements/IfElement.svelte";
    import LoopElement from "./statements/LoopElement.svelte";
    import SimpleElement from "./statements/SimpleElement.svelte";
    import SwitchElement from "./statements/SwitchElement.svelte";

    export let statement: Statement;

    const variant = () => {
        if (statement instanceof SwitchStatement) return "switch";
        if (statement instanceof IfStatement) return "if";
        if (statement instanceof LoopStatement) return "loop";
        return "simple";
    };
</script>

<div class="statement">
    {#if variant() == "switch"}
        <SwitchElement {statement} />
    {:else if variant() == "if"}
        <IfElement {statement} />
    {:else if variant() == "loop"}
        <LoopElement {statement} />
    {:else}
        <SimpleElement {statement} />
    {/if}
</div>

<style lang="scss">
    .statement {
        border-collapse: collapse;
        color: $struc-color;
        border: $struc-border-width solid $struc-border-color;
    }
</style>
