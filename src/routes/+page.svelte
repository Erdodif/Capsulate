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
                                    ],
                                },
                                {
                                    condition: "2",
                                    block: [
                                        {
                                            type: "simple",
                                            content: "Maybe",
                                        },
                                    ],
                                },
                                {
                                    condition: "3",
                                    block: [
                                        {
                                            type: "simple",
                                            content: "No",
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
