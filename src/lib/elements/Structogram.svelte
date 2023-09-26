<script lang="ts">
    import type Structogram from "$lib/classes/Structogram";
    import type { Writable } from "svelte/store";
    import InputOverlay from "./InputOverlay.svelte";
    import Statement from "./Statement.svelte";

    export let structogram: Writable<Structogram>;
</script>

<div class="struktogram">
    <InputOverlay/>
    {#if $structogram.variant == "function"}
        <div class="struktogram__signature">
            <input type="text" bind:value={$structogram.signature}>
        </div>
    {/if}
    <div class="struktogram__block">
        {#each $structogram.statements as statement}
            <Statement {statement} />
        {/each}
    </div>
</div>

<style lang="scss">
    :global(.struktogram, .statement) {
        font-size: 1rem;
        font-family: monospace;
    }
    .struktogram {
        margin:1em;
        color: $struc-color;
        width: min(95dvw, 45rem);
        &__signature {
            @include s_input;
            position: relative;
            border-radius: 2em;
            width: fit-content;
            margin-inline: auto;
            margin-block-end: 1em;
            border: $struc-border;
            &::before {
                position: absolute;
                top: 100%;
                left: 50%;
                content: "";
                width: $struc-border-width;
                height: 1.2em;
                background-color: $struc-border-color;
            }
            background-color: $struc-background;
        }
        &__block {
            border: $struc-border;
            background-color: $struc-background;
            :global(> .statement) {
                border-bottom: $struc-border;
                &:last-child {
                    border-bottom: unset;
                }
            }
        }
    }
</style>
