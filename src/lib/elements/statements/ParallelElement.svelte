<script lang="ts">
    import type { ParallelStatement } from "$lib/classes/Statement";
    import type { StatementStore } from "$lib/stores/structogram";
    import Statement from "../Statement.svelte";
    //TODO - Make it look parallel

    export let statement: StatementStore<ParallelStatement>;
</script>

<div class="switch">
    {#each $statement.threads as threads, i (i)}
        <div class="thread">
            {#each threads.map( (stmt) => statement.getStoreOf(stmt) ) as stmt}
                <Statement statement={stmt} />
            {/each}
        </div>
    {/each}
</div>

<style lang="scss">
    //TODO - design with the signature parallel lines between the blocks
</style>
