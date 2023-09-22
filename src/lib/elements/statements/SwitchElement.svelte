<script lang="ts">
    import type { SwitchStatement } from "$lib/classes/Statement";
    import Statement from "../Statement.svelte";

    export let statement: SwitchStatement;
</script>

<div class="switch">
    {#each statement.cases as caseblock, index}
        <div class="case">
            <div class="condition">
                #{index} - {caseblock.condition}
            </div>
            <div class="block">
                {#each caseblock.block as statement}
                    <Statement {statement} />
                {/each}
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    .switch {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: stretch;
        .case {
            .condition{
                text-align: center;
                @include s_border;
            }
            flex: 1;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
        }
    }
</style>
