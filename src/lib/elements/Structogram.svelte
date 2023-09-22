<script lang="ts">
    import type Structogram from "$lib/classes/Structogram";
    import Statement from "./Statement.svelte";

    export let structogram: Structogram;
</script>

<div class="struktogram">
    {#if structogram.variant == "function"}
        <div class="struktogram__signature">
            {structogram.signature}
        </div>
    {/if}
    <div class="struktogram__block">
        {#each structogram.statements as statement}
            <Statement {statement} />
        {/each}
    </div>
</div>

<style lang="scss">
    .struktogram {
        color: $struc-color;
        background-color: rgb(52, 3, 3);
        &__signature {
            border-radius: 1em;
            //border: @include s_boder;
        }
        &__block {
            //border: @include s_boder;
        }
    }
</style>
