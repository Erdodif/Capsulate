<script lang="ts">
    import type { SimpleStatement } from "$lib/classes/Statement";
    import type { StatementStore } from "$lib/stores/structogram";
    import CustomTextArea from "../CustomTextArea.svelte";

    export let statement: StatementStore<SimpleStatement>;
</script>

<div class="simple">
    <CustomTextArea name="simple" bind:value={$statement.guard} />
</div>

<style lang="scss">
    :global(.dragged) > .simple {
        background-color: $secondary-variant !important;
        border: 0.2em dashed $struc-border-color !important;
        max-width: 10em;
        height: 2.25em;
        padding: .25em;
        :global(textarea) {
            text-overflow: ellipsis;
        }
    }
    .simple {
        padding-inline: $struc-padding-inline;
        padding-block: $struc-padding-block;
        box-sizing: border-box;
        height: 100%;
        text-align: center;
    }
</style>
