<script lang="ts">
    import type { IfStatement } from "$lib/classes/Statement";
    import Statement from "../Statement.svelte";

    export let statement: IfStatement;
</script>

<div class="if">
    <div class="condition">
        {statement.condition}
    </div>
    <div class="true">
        {#each statement.block as element}
            <Statement statement={element} />
        {/each}
    </div>
    <div class="false">
        {#each statement.elseblock as element}
            <Statement statement={element} />
        {/each}
    </div>
</div>

<style lang="scss">
    .if {
        display: grid;
        grid-template-rows: fit-content 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "condition condition" "true false";
        .condition{
            grid-area: condition;
            text-align: center;
        }
        .true {
            grid-area: true;
        }
        .false {
            grid-area: false;
        }
    }
</style>
