<script lang="ts">
    import type { SimpleStatement } from "$lib/classes/Statement";
    import type { StatementStore } from "$lib/stores/structogram";

    export let statement: StatementStore<SimpleStatement>;
</script>

<div class="simple">
    <input type="text" name="content" bind:value={$statement.content}>
</div>

<style lang="scss">
    .simple {
        @include s_input;
        box-sizing: border-box;
        height: 100%;
        text-align: center;
    }
</style>
