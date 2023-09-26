<script lang="ts">
    import type { SimpleStatement } from "$lib/classes/Statement";
    import type { StatementStore } from "$lib/stores/structogram";
    import CustomTextArea from "../CustomTextArea.svelte";

    export let statement: StatementStore<SimpleStatement>;

    let rows: number;

    $: rows = ($statement.content.match(/\n/g)?.length ?? 0) + 1;
</script>

<div class="simple">
    <CustomTextArea name="simple" bind:value={$statement.content} />
</div>

<style lang="scss">
    .simple {
        padding-inline: $struc-padding-inline;
        padding-block: $struc-padding-block;
        box-sizing: border-box;
        height: 100%;
        text-align: center;
    }
</style>
