<script lang="ts">
    import type { LoopStatement } from "$lib/classes/Statement";
    import Statement from "../Statement.svelte";

    export let statement: LoopStatement;
</script>

<div class={`${statement.reversed ? "loop__reversed" : ""} loop`}>
    <div class="condition">
        {statement.condition}
    </div>
    <div class="block">
        {#each statement.block as element}
            <Statement statement={element} />
        {/each}
    </div>
</div>

<style lang="scss">
    :global(.loop) {
        > .block {
            //background: red;
            > .statement {
                border-bottom: $struc-border-width solid $struc-border-color;
                
            }
            > .statement:last-child {
                border-bottom: unset;
            }
        }
    }
    :global(.loop-reversed) {
        > .block {
            > .statement {
                border-top: $struc-border-width solid $struc-border-color;
                border-bottom: unset;
            }
            > .statement:last-child {
                border-top: unset;
            }
        }
    }
    .loop {
        display: grid;
        grid-template-columns: 2em 1fr;
        grid-template-rows: fit-content 1fr;
        grid-template-areas: "condition condition" "border block";
        &::before {
            grid-area: border;
            height: 100%;
            content: "";
            border-bottom: $struc-border-width solid $struc-border-color;
        }
        .condition {
            padding-block: 0.425em;
            padding-inline: 1em;
            grid-area: condition;
            text-align: center;
        }
        .block {
            grid-area: block;
            border-top: $struc-border-width solid $struc-border-color;
            border-left: $struc-border-width solid $struc-border-color;
        }
        &__reversed {
            grid-template-rows: 1fr fit-content;
            grid-template-areas: "border block" "condition condition";
            &::before {
                border-top: $struc-border-width solid $struc-border-color;
                border-bottom: unset;
            }
            .block {
                border-bottom: $struc-border-width solid $struc-border-color;
                border-top: unset;
            }
        }
    }
</style>
