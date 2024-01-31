<script lang="ts">
    import InputOverlay from "./InputOverlay.svelte";
    import Statement from "./Statement.svelte";
    import type { Statement as StatementClass } from "$lib/classes/Statement";
    import type { StructogramStore } from "$lib/stores/structogram";
    import DropZone from "./DropZone.svelte";
    import { statementPreview } from "$lib/stores/dndStatementPreview";
    import {
        StatementSerializer,
        type StatementJson,
    } from "$lib/classes/StatementSerializer";

    export let structogram: StructogramStore;

    const storeOf = (statement: StatementClass) =>
        structogram.getStoreOf(statement);

    const handleDrop = (
        data: CustomEvent<Map<string, string>>,
        index: number
    ) => {
        if (
            data.detail.get("application/structogram") ||
            data.detail.get("application/json")
        ) {
            let json = JSON.parse(
                data.detail.get("application/structogram") ??
                    data.detail.get("application/json") ??
                    "{}"
            );
            let statement: StatementClass;
            let behind = false;
            if ($structogram.has(json.id)) {
                let pos = $structogram.statements.findIndex(
                    (statement) => statement.id == json.id
                );
                behind = pos !== -1 && pos < index;
                statement = $structogram.removeStatementById(json.id)!;
            } else {
                let serializer = new StatementSerializer($structogram);
                statement = serializer.fromJson(json);
            }
            structogram.insertAt(index + (behind ? 0 : 1), statement);
            //TODO addin
            console.log(`insert at ${index + 1}`);
        }
    };

    const excludeAt: (_: number) => number[] = (index: number) => {
        let ids: number[] = [];
        if (index >= 0 && $structogram.statements.length > 0) {
            ids.push($structogram.statements[index].id);
        }
        if (index < $structogram.statements.length - 1) {
            ids.push($structogram.statements[index + 1].id);
        }
        return ids;
    };
</script>

<div class="struktogram">
    <InputOverlay />
    {#if $structogram.variant == "function"}
        <div class="struktogram__signature">
            <input type="text" bind:value={$structogram.signature} />
        </div>
    {/if}
    <div class="struktogram__block">
        <DropZone
            on:drop={(data) => handleDrop(data, -1)}
            mimes={["text", "application/json", "application/structogram"]}
            exclude={excludeAt(-1)}
        />
        {#each $structogram.statements.map( (statement) => storeOf(statement) ) as statement, index (statement.id)}
            <Statement {statement} />
            <DropZone
                on:drop={(data) => handleDrop(data, index)}
                mimes={["text", "application/json", "application/structogram"]}
                exclude={excludeAt(index)}
            />
        {/each}
    </div>
</div>

<style lang="scss">
    :global(.struktogram, .statement) {
        font-size: 1rem;
        font-family: monospace;
    }
    .struktogram {
        margin: 1em;
        color: $struc-color;
        width: min(95dvw, 45rem);
        &__signature {
            input {
                @include s_input;
            }
            padding-inline: $struc-padding-inline;
            padding-block: $struc-padding-block;
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
            position: relative;
            border: $struc-border;
            background-color: $struc-background;
            :global(> .statement) {
                border-bottom: $struc-border;
                &:last-child {
                    border-bottom: unset;
                }
            }
        }
        .dropzone.preview {
            border-bottom: $struc-border;
        }
    }
</style>
