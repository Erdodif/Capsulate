<script lang="ts">
    import {
        Branch,
        IfStatement,
        LoopStatement,
        SimpleStatement,
        SwitchStatement,
    } from "$lib/classes/Statement";
    import { StructogramSerializer } from "$lib/classes/StatementSerializer";
    import Structorgram from "$lib/classes/Structogram";
    import Structogram from "$lib/elements/Structogram.svelte";
    import { StructogramStore } from "$lib/stores/structogram";
    import { writable } from "svelte/store";

    let struk = new StructogramStore(
        new Structorgram("Idk man", "function", [
            new SimpleStatement("Meh"),
            new IfStatement(
                "if this is it",
                [
                    new LoopStatement("that is loop", false, [
                        new SimpleStatement("Just loopin' around"),
                    ]),
                ],
                [new SimpleStatement("SKIP")]
            ),
            new LoopStatement("Reverse funny", true, [
                new SwitchStatement([
                    new Branch("1", [new SimpleStatement("yes")]),
                    new Branch("2", [new SimpleStatement("maybe")]),
                    new Branch("else", [new SimpleStatement("no")]),
                ]),
            ]),
        ])
    );
</script>

<Structogram structogram={struk} />

<code>
    {JSON.stringify(StructogramSerializer.toJson($struk))}
</code>
