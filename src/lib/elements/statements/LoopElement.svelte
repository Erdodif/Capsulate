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
    .loop {
        display: grid;
        grid-template-columns: 2em 1fr;
        grid-template-rows: fit-content 1fr;
        grid-template-areas: 'condition condition' '_ block';
        .condition {
            grid-area: condition;
            text-align: center;
        }
        .block {
            grid-area: block;
            @include s_border;
        }
        &__reversed {
            grid-template-rows: 1fr fit-content;
        grid-template-areas: '_ block' 'condition condition';
        }
    }
</style>
