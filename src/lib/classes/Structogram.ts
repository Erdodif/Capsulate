import type { Statement } from "./Statement"

export type StructogramVariants = "program" | "function" | "async";

export default class Structogram {
    variant: StructogramVariants;
    signature: string;
    statements: Statement[];


    constructor(signature: string = "", variant: StructogramVariants = "function", statements: Statement[] = []) {
        this.signature = signature;
        this.statements = statements;
        this.variant = variant;
    }
}