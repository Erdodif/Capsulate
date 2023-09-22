<script lang="ts">
    import type { IfStatement } from "$lib/classes/Statement";
    import Statement from "../Statement.svelte";

    export let statement: IfStatement;
</script>

<div class="if">
    <div class="condition">
        <textarea name="condition" rows="1" bind:value={statement.condition}/>
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
        grid-template-columns: 1fr $struc-border-width 1fr;
        grid-template-areas: "condition condition condition" "true border false";
        &::before {
            content: "";
            grid-area: border;
            background-color: $struc-color;
        }
        .condition {
            @include s_input;
            position: relative;
            grid-area: condition;
            text-align: center;
            resize: both;
            &::before {
                @include s_if_pseudo(25,2, left);
            }
            border-bottom: $struc-border;
            &::after {
                @include s_if_pseudo(-25, -2, right);
            }
        }
        .true {
            grid-area: true;
            display: grid;
            align-items: stretch;
        }
        .false {
            grid-area: false;
            display: grid;
            align-items: stretch;
        }
    }
</style>
