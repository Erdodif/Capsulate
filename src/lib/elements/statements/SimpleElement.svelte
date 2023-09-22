<script lang="ts">
    import type { SimpleStatement } from "$lib/classes/Statement";

    export let statement: SimpleStatement;
</script>

<div class="simple">
    <input type="text" name="content" bind:value={statement.content}>
</div>

<style lang="scss">
    .simple {
        @include s_input;
        box-sizing: border-box;
        height: 100%;
        text-align: center;
    }
</style>
