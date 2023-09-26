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
    import { writable } from "svelte/store";

    let struk = writable(StructogramSerializer.fromJson(
    {
        type:"function",
        signature:"idk man",
        statements:[
            {
                type:"if",
                condition: "if this is it",
                block:[
                    {
                        type:"loop",
                        condition:"if true",
                        block:[
                           {
                            type:"simple",
                            content:"just loopin' around"
                           } 
                        ]
                    }
                ],
                elseblock:[
                    {
                        type:"skip",
                        content:"SKIP"
                    }
                ]
            },
            {
                type:"loop-reverse",
                condition:"Are you done yet?",
                block:[
                    {
                        type:"switch",
                        cases:[
                            {
                                condition:"1",
                                block:[
                                    {
                                        type:"simple",
                                        content:"Yes"
                                    }
                                ]
                            },
                            {
                                condition:"2",
                                block:[
                                    {
                                        type:"simple",
                                        content:"Maybe"
                                    }
                                ]
                            },
                            {
                                condition:"3",
                                block:[
                                    {
                                        type:"simple",
                                        content:"No"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
    ));
</script>

<Structogram structogram={struk} />

<code>
    {JSON.stringify(StructogramSerializer.toJson($struk))}
</code>
