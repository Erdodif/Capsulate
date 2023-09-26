<script lang="ts">
    export let value: string;
    export let name: string;

    const handleChange = (e: Event) => {
        (e.target as HTMLElement).style.height = "0px";
        (e.target as HTMLElement).style.height =
            (e.target as HTMLElement).scrollHeight + "px";
    };
</script>

<textarea {name} rows={1} on:input={handleChange} bind:value />

<style lang="scss">
    textarea{
        width: 100%;
        margin:0;
        padding: 0;
        min-height: 1em;
        resize: none;
        font-family: inherit;
        font-size: 1em;
        text-align: center;
        background: unset;
        border: unset;
        outline: unset;
        box-sizing: border-box;
    }
</style>
