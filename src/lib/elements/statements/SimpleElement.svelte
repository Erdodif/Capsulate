<script lang="ts">
    import type { SimpleStatement } from "$lib/classes/Statement";

    export let statement: SimpleStatement;
</script>

<div class="simple">
    {statement.content}
</div>

<style lang="scss">
    .simple{
        text-align: center;
    }
</style>
