<script lang="ts">
    import type { SwitchStatement } from "$lib/classes/Statement";
    import Statement from "../Statement.svelte";

    export let statement: SwitchStatement;
</script>

<div class="switch">
    {#each statement.cases as caseblock}
        <div class="case">
            <div
                class={`condition  ${
                    caseblock.condition == "else" ? "condition__else" : ""
                }`}
            >
                <input type="text" bind:value={caseblock.condition} />
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
        gap: 4px;
        background: $struc-color;
        .case {
            input {
                background: transparent;
                width: 100%;
                height: 100%;
                font-size: 1em;
                border: unset;
                text-align: center;
                padding-block: 0.425em;
                padding-inline: 1em;
                box-sizing: border-box;
            }
            background-color: $struc-background;
            .condition {
                position: relative;
                text-align: center;
                @include s_border;
                &::before {
                    @include s_if_pseudo(20, 0.6, left);
                }
                border-bottom: $struc-border;
                &__else {
                    input {
                        color: transparent;
                    }
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
