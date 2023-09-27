<script lang="ts">
    import type {
        IfStatement,
        Statement as StatementClass,
    } from "$lib/classes/Statement";
    import type { StatementStore } from "$lib/stores/structogram";
    import CustomTextArea from "../CustomTextArea.svelte";
    import Statement from "../Statement.svelte";

    export let statement: StatementStore<IfStatement>;
</script>

<div class="if">
    <div class="condition">
        <CustomTextArea name="condition" bind:value={$statement.condition} />
    </div>
    <div class="true">
        {#each $statement.block.map( (stmt) => statement.getStoreOf(stmt) ) as element}
            <Statement statement={element} />
        {/each}
    </div>
    <div class="false">
        {#each $statement.elseblock.map( (stmt) => statement.getStoreOf(stmt) ) as element}
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
            padding-inline: $struc-padding-inline;
            padding-block: $struc-padding-block;
            padding-inline: 2em;
            position: relative;
            grid-area: condition;
            text-align: center;
            resize: both;
            &::before {
                content: "";
                position: absolute;
                top: calc($struc-border-width / -2);
                bottom: calc($struc-border-width / -2);
                left: .725em;
                width: 1.125em;
                background-repeat: no-repeat;
                background-size: cover;
                background-size: 100% 100%;
                transform: scaleY(-1);
                background-image: url("/diag.svg");
            }
            border-bottom: $struc-border;
            &::after {
                //@include s_if_pseudo(-25, -2, right);
                content: "";
                position: absolute;
                top: calc($struc-border-width / -2);
                bottom: calc($struc-border-width / -2);
                right: .725em;
                width: 1.125em;
                background-repeat: no-repeat;
                background-size: cover;
                background-size: 100% 100%;
                background-image: url("/diag.svg");
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
