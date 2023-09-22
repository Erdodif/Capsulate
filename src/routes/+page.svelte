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
    import { json } from "@sveltejs/kit";

    let struk = new Structorgram("Idk man", "function", [
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
    ]);
</script>

<span>TO JSON</span>
<code>
    {JSON.stringify(struk)}
</code>
<span>WITH SERIALIZER</span>
<code>
    {StructogramSerializer.toJson(struk)}
</code>
<span>FROM JSON</span>
<code>
    <button on:click={()=>console.log(JSON.parse(JSON.stringify(struk)))}>print</button>
</code>
<span>WITH SERIALIZER</span>
<code>
    <button on:click={()=>console.log(StructogramSerializer.fromJson(StructogramSerializer.toJson(struk)))}>print</button>
</code>
<span>
    Strukki
</span>
<Structogram structogram={struk}/>