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
                padding-inline: $struc-padding-inline;
                padding-block: $struc-padding-block;
                &::before {
                    @include s_if_pseudo(20, 0.6, left);
                }
                border-bottom: $struc-border;
                &__else {
                    &::before {
                        content: unset;
                    }
                    &::after {
                        @include s_if_pseudo(-20, -0.6, right);
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
