<script lang="ts">
    import type { SwitchStatement } from "$lib/classes/Statement";
    import type { StatementStore } from "$lib/stores/structogram";
    import CustomTextArea from "../CustomTextArea.svelte";
    import Statement from "../Statement.svelte";

    export let statement: StatementStore<SwitchStatement>;
</script>

<div class="switch">
    {#each $statement.cases as caseblock, i (i)}
        <div class="case">
            <div
                class={`condition  ${
                    caseblock.condition == "else" ? "condition__else" : ""
                }`}
            >
                <CustomTextArea
                    name="simple"
                    bind:value={caseblock.condition}
                />
            </div>
            <div class="block">
                {#each caseblock.block.map( (stmt) => statement.getStoreOf(stmt) ) as stmt}
                    <Statement statement={stmt} />
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
        gap: 4px;
        background: $struc-color;
        .case {
            background-color: $struc-background;
            .condition {
                position: relative;
                text-align: center;
                @include s_border;
                padding-inline: 2em;
                padding-block: $struc-padding-block;
                &::before {
                    content: "";
                    position: absolute;
                    top: calc($struc-border-width / -2);
                    bottom: calc($struc-border-width / -2);
                    left: 0.725em;
                    width: 1.125em;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-size: 100% 100%;
                    transform: scaleY(-1);
                    background-image: url("/diag.svg");
                }
                border-bottom: $struc-border;
                &__else {
                    &::before {
                        content: unset;
                    }
                    &::after {
                        content: "";
                        position: absolute;
                        top: calc($struc-border-width / -2);
                        bottom: calc($struc-border-width / -2);
                        right: 0.725em;
                        width: 1.125em;
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-size: 100% 100%;
                        background-image: url("/diag.svg");
                    }
                }
            }
            flex: 1;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
        }
    }
</style>
