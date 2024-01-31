<script lang="ts">
    import { StructogramSerializer } from "$lib/classes/StatementSerializer";
    import Structogram from "$lib/elements/Structogram.svelte";
    import { StructogramStore } from "$lib/stores/structogram";

    let struk = new StructogramStore(
        StructogramSerializer.fromJson({
            type: "function",
            signature: "idk man",
            statements: [
                {
                    type: "loop",
                    condition: "if true",
                    block: [
                        {
                            type: "if",
                            condition: "if this is it",
                            block: [
                                {
                                    type: "loop",
                                    condition: "if true",
                                    block: [
                                        {
                                            type: "simple",
                                            content: "just loopin' around",
                                        },
                                    ],
                                },
                            ],
                            elseblock: [
                                {
                                    type: "skip",
                                    content: "SKIP",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "switch",
                    cases: [
                        {
                            condition: "1",
                            block: [
                                {
                                    type: "simple",
                                    content: "Yes",
                                },
                                { type: "simple", content: "More yes" },
                            ],
                        },
                        {
                            condition: "2",
                            block: [
                                {
                                    type: "if",
                                    condition: "Is yes?",
                                    block: [
                                        {
                                            type: "simple",
                                            content: "good",
                                        },
                                    ],
                                    elseblock: [
                                        { type: "skip", content: "SKIP" },
                                    ],
                                },
                            ],
                        },
                        {
                            condition: "3",
                            block: [
                                {
                                    type: "loop",
                                    condition: "no?",
                                    block: [
                                        {
                                            type: "simple",
                                            content: "ok",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "loop-reverse",
                    condition: "Are you done yet?",
                    block: [
                        {
                            type: "switch",
                            cases: [
                                {
                                    condition: "1",
                                    block: [
                                        {
                                            type: "simple",
                                            content: "Yes",
                                        },
                                        { type: "simple", content: "More yes" },
                                    ],
                                },
                                {
                                    condition: "2",
                                    block: [
                                        {
                                            type: "if",
                                            condition: "Is yes?",
                                            block: [
                                                {
                                                    type: "simple",
                                                    content: "good",
                                                },
                                            ],
                                            elseblock: [
                                                {
                                                    type: "skip",
                                                    content: "SKIP",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    condition: "3",
                                    block: [
                                        {
                                            type: "loop",
                                            condition: "no?",
                                            block: [
                                                {
                                                    type: "simple",
                                                    content: "ok",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        })
    );
</script>

<Structogram structogram={struk} />
