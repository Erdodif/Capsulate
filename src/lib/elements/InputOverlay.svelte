<script lang="ts">
    import agdaMode from "$lib/shortcuts/agda-mode.json";
    import latexMode from "$lib/shortcuts/latex-mode.json";
    import { writable } from "svelte/store";
    let active = false;
    let shortcut = writable("");

    const closeOnWill = (event: KeyboardEvent) => {
        if (active) {
            if (event.key == "Backspace") {
                if ($shortcut == "" || $shortcut == "\\") {
                    closeShortcut();
                    return;
                }
                $shortcut = $shortcut.slice(0, -1);
                event.preventDefault();
                return;
            }
            if (event.key == " " || event.key == "Enter") {
                event.preventDefault();
                closeShortcut();
                return;
            }
            if (event.key == "Escape" || event.key == "Delete") {
                event.preventDefault();
                active = false;
                $shortcut = "";
                return;
            }
        }
    };

    const handleInput = (event: InputEvent) => {
        if (active) {
            event.preventDefault();
            if (event.data == "null" || event.data == "Unidentified") {
                return;
            }
            if (event.data == "\\") {
                closeShortcut();
                return;
            }
            insertChar(event.data!);
        } else {
            if (event.data == "\\" && document.activeElement) {
                $shortcut = "\\";
                active = true;
                document.activeElement.addEventListener("blur", () => {
                    active = false;
                    $shortcut = "";
                });
                event.preventDefault();
                return;
            }
        }
    };

    const insertChar = (char: string) => {
        $shortcut = $shortcut.concat(char);
    };

    const closeShortcut = () => {
        active = false;
        let char = findCharacter($shortcut) ?? $shortcut;
        let inputNode = document.activeElement as HTMLInputElement;
        inputNode.value =
            inputNode.value.slice(0, inputNode.selectionStart!) +
            char +
            inputNode.value.slice(inputNode.selectionEnd!);
        inputNode.dispatchEvent(new InputEvent('input',{bubbles:true, cancelable:true}))
        $shortcut = "";
    };

    const toClipboard = (content: string) => {
        navigator.clipboard.writeText(content);
        closeShortcut();
    };

    const findCharacter = (binding: string) => {
        return (
            agdaMode.find((sc) => sc.keyBind == binding)?.character ??
            latexMode.find((sc) => sc.keyBind == binding)?.character
        );
    };

    const hasBinding = (binding: string) => {
        return (
            agdaMode.findIndex((sc) => sc.keyBind == binding) > -1 ||
            latexMode.findIndex((sc) => sc.keyBind == binding) > -1
        );
    };
</script>

<svelte:body
    on:beforeinput|capture={handleInput}
    on:keydown|capture={closeOnWill}
/>

{#if active}
    {#if hasBinding($shortcut)}
        <button
            class="char"
            on:click={() => {
                if (hasBinding($shortcut))
                    toClipboard(findCharacter($shortcut) ?? "");
            }}
        >
            {findCharacter($shortcut)}
        </button>
    {:else}
        <button class="shortcut" on:click={() => toClipboard($shortcut)}>
            {$shortcut}
        </button>
    {/if}
{/if}

<style lang="scss">
    .shortcut,
    .char {
        font-size: 1.5rem;
        z-index: 999;
        position: fixed;
        width: fit-content;
        top: 5%;
        left: 40%;
        padding-inline: 1em;
        padding-block: 0.2em;
        border-radius: 0.3em;
        border: 0;
        background: $secondary-variant;
    }
    .char {
        font-size: 2rem;
        z-index: 999;
        position: fixed;
        width: fit-content;
        top: 5%;
        left: 40%;
        background: $secondary;
    }
</style>
