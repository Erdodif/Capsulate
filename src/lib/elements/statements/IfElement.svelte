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
        grid-template-columns: 1fr $struc-border-width 1fr;
        grid-template-areas: "condition condition condition" "true border false";
        &::before {
            content: "";
            grid-area: border;
            background-color: $struc-color;
        }
        .condition {
            padding-block: 0.425em;
            padding-inline: 1em;
            position: relative;
            grid-area: condition;
            text-align: center;
            resize: both;
            &::before {
                position: absolute;
                top: 0;
                left: 0;
                transform: skewX(25deg) translateX(420%);
                content: "";
                width: $struc-border-width;
                height: 100%;
                background: $struc-border-color;
            }
            border-bottom: $struc-border-width solid $struc-border-color;
            &::after {
                position: absolute;
                top: 0;
                right: 0;
                transform: skewX(-25deg) translateX(-420%);
                content: "";
                width: $struc-border-width;
                height: 100%;
                background: $struc-border-color;
            }
        }
        .true {
            grid-area: true;
        }
        .false {
            grid-area: false;
        }
    }
</style>
