<script lang="ts">
    import { onMount } from "svelte";

    export let value: string;
    export let name: string;

    const input = () => {
        element.style.height = "0px";
        element.style.height =
            element.scrollHeight + "px";
    };

    onMount(()=>{
        input();
    })

    let element: HTMLTextAreaElement;
</script>

<svelte:window on:resize={()=>input()}/>

<textarea bind:this={element} {name} rows={1} on:input={input} bind:value />

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
