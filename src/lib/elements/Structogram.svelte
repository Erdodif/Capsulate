<script lang="ts">
    import type Structogram from "$lib/classes/Structogram";
    import Statement from "./Statement.svelte";

    export let structogram: Structogram;
</script>

<div class="struktogram">
    {#if structogram.variant == "function"}
        <div class="struktogram__signature">
            {structogram.signature}
        </div>
    {/if}
    <div class="struktogram__block">
        {#each structogram.statements as statement}
            <Statement {statement} />
        {/each}
    </div>
</div>

<style lang="scss">
    :global(.struktogram__block) {
        > .statement {
            border-bottom: $struc-border-width solid $struc-border-color;
            &:last-child {
                border-bottom: unset;
            }
        }
    }
    .struktogram {
        color: $struc-color;
        &__signature {
            position: relative;
            border-radius: 2em;
            width: fit-content;
            padding-inline: 1em;
            padding-block: 0.5em;
            margin-inline: auto;
            margin-block-end: 1em;
            border: $struc-border-width solid $struc-border-color;
            &::before {
                position: absolute;
                top: 100%;
                left: 50%;
                content: "";
                width: $struc-border-width;
                height: 1.2em;
                background-color: $struc-border-color;
            }
            background-color: rgb(52, 3, 3);
        }
        &__block {
            border: $struc-border-width solid $struc-border-color;
            background-color: rgb(52, 3, 3);
        }
    }
</style>
