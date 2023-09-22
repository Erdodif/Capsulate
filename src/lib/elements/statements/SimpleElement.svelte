<script lang="ts">
    import type { SimpleStatement } from "$lib/classes/Statement";

    export let statement: SimpleStatement;
</script>

<div class="simple">
    {statement.content}
</div>

<style lang="scss">
    .simple {
        text-align: center;
        padding-block: 0.425em;
        padding-inline: 1em;
    }
</style>
