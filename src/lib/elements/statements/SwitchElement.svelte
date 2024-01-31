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
        .case {
            &:global(:not(:first-child)) {
                border-inline-start: $struc-border;
            }
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
            .block {
                //:global(.statement)
                > :global(:not(:last-child)) {
                    border-block-end: $struc-border;
                }
            }
        }
    }
    :global(.dragged) {
        & > .switch,
        > :global(*) .switch {
            box-sizing: border-box;
            border: 0.2em dashed $struc-border-color;
            background: $secondary;
            max-width: 15em;
            height: fit-content !important;
            gap: 0;
            > .case {
                &:global(:not(:first-child)) {
                    border-inline-start: $struc-border;
                }
                height: 5.25em;
                border: unset;
                > .condition {
                    background: $secondary-variant;
                }
                > .block {
                    height: 2em;
                    border: unset;
                    > :global(:not(:first-child)) {
                        display: none;
                    }
                    > :global(:last-child) {
                        border-bottom: unset;
                    }
                    > :global(.statement) {
                        border-bottom: unset;
                    }
                }
            }
            > .case:not(:nth-child(-n + 4)) {
                display: none;
            }
        }
        & > :global(*) .switch {
            margin: 0;
            border: unset;
            background: transparent;
            height: fit-content;
            box-sizing: border-box;
            width: 100% !important;
            > .case:not(:nth-child(-n + 2)) {
                display: none;
            }
            > .case:nth-child(-n + 2) {
                height: 2em;
                > .condition {
                    font-size: 0.8em;
                    background: transparent;
                    height: 1.25em;
                    padding-block: 0.2em;
                }
                > .block {
                    :global(*) {
                        display: none;
                    }
                }
            }
        }
    }
</style>
