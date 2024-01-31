<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    export let value: string;
    export let name: string;

    let colCount = writable(5);
    const input = () => {
        element.style.height = "0px";
        element.style.height = element.scrollHeight + "px";
    };

    onMount(() => {
        input();
    });

    let element: HTMLTextAreaElement;
</script>

<svelte:window on:resize={() => input()} />

<textarea
    bind:this={element}
    {name}
    rows={1}
    on:input={input}
    bind:value
    on:drop|capture={(e) => {
        if (e.dataTransfer?.getData("application/structogram")) return false;
    }}
/>

<style lang="scss">
    :global(.dragged) {
        textarea {
            text-overflow: ellipsis;
            width: 80%;
            white-space: nowrap;
            max-width: 90% !important;
            height: min-content !important;
            overflow: hidden;
        }
    }
    textarea {
        width: 100%;
        margin: 0;
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
        user-select: text;
    }
</style>
