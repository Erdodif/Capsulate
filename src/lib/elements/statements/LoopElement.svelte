<script lang="ts">
    import type { LoopStatement } from "$lib/classes/Statement";
    import type { StatementStore } from "$lib/stores/structogram";
    import CustomTextArea from "../CustomTextArea.svelte";
    import Statement from "../Statement.svelte";

    export let statement: StatementStore<LoopStatement>;
</script>

<div class={`${$statement.reversed ? "loop__reversed" : ""} loop`}>
    <div class="condition">
        <CustomTextArea name="simple" bind:value={$statement.condition} />
    </div>
    <div class="block">
        {#each $statement.block.map( (stmt) => statement.getStoreOf(stmt) ) as element}
            <Statement statement={element} />
        {/each}
    </div>
</div>

<style lang="scss">
    .loop {
        display: grid;
        grid-template-columns: 2em 1fr;
        grid-template-rows: fit-content 1fr;
        grid-template-areas: "condition condition" "border block";
        &::before {
            grid-area: border;
            height: 100%;
            content: "";
            border-bottom: $struc-border;
        }
        > .condition {
            padding-inline: $struc-padding-inline;
            padding-block: $struc-padding-block;
            grid-area: condition;
            text-align: center;
        }
        > .block {
            grid-area: block;
            border-top: $struc-border;
            border-left: $struc-border;
        }
        &__reversed {
            grid-template-rows: 1fr fit-content;
            grid-template-areas: "border block" "condition condition";
            &::before {
                border-bottom: unset;
            }
            > .block {
                border-bottom: $struc-border;
                border-top: unset;
            }
        }
    }
    :global(.dragged) {
        & > .loop {
            background-color: $secondary-variant;
            border: 0.2em dashed $struc-border-color;
            max-width: 15em;
            height: fit-content !important;
            .block {
                & > :global(:not(:first-child)) {
                    display: none;
                }
                & > :global(:first-child) {
                    width: 100%;
                }
            }
        }
        & > :global(*) .loop {
            height: 1.8em !important;
            .condition {
                padding-block: 0.2em;
                font-size: 0.8em;
            }
            .block {
                & > :global(:not(:first-child)) {
                    display: none;
                }
                & > :global(:first-child) {
                    color: transparent;
                    background: transparent;
                    height: 1em;
                    :global(*) {
                        display: none;
                    }
                }
            }
        }
    }
</style>
