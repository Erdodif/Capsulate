<script lang="ts">
    import type { AwaitStatement } from "$lib/classes/Statement";
    import type { StatementStore } from "$lib/stores/structogram";
    import CustomTextArea from "../CustomTextArea.svelte";

    export let statement: StatementStore<AwaitStatement>;
</script>

<div class="await">
    <CustomTextArea name="guard" bind:value={$statement.guard} />
</div>

<style lang="scss">
    .await {
        // TODO arch over the guard
        padding-inline: $struc-padding-inline;
        padding-block: $struc-padding-block;
        box-sizing: border-box;
        height: 100%;
        text-align: center;
    }
</style>
