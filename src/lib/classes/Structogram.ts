import SwitchElement from "$lib/elements/statements/SwitchElement.svelte";
import { readonly } from "svelte/store";
import { Branch, IfStatement, LoopStatement, SimpleStatement, Statement, SwitchStatement } from "./Statement"

export type StructogramVariants = "program" | "function" | "async";

export default class Structogram {
    private STATEMENT_ID: number = 0;
    private statementList: Map<number,Statement>;
    variant: StructogramVariants;
    signature: string;
    statements: Statement[];


    constructor(signature: string = "", variant: StructogramVariants = "function", statements: Statement[] = []) {
        this.signature = signature;
        this.statements = statements;
        this.variant = variant;
        this.statementList = new Map();
    }

    getStatementById(id: number): Statement | undefined {
        return this.statementList.get(id);
    }

    createSimpleStatement(content: string | undefined): SimpleStatement {
        let statement = new SimpleStatement(this.STATEMENT_ID, content);
        this.statementList.set(this.STATEMENT_ID, statement);
        this.STATEMENT_ID++;
        return statement;
    }

    createIfStatement(condition: string, block: Statement[], elseblock: Statement[]): IfStatement {
        let statement = new IfStatement(this.STATEMENT_ID, condition, block, elseblock);
        this.statementList.set(this.STATEMENT_ID, statement);
        this.STATEMENT_ID++;
        return statement;
    }

    createLoopStatement(condition: string, block: Statement[], reversed: boolean = false) {
        let statement = new LoopStatement(this.STATEMENT_ID, condition, reversed, block);
        this.statementList.set(this.STATEMENT_ID, statement);
        this.STATEMENT_ID++;
        return statement;
    }

    createSwitchStatement(branches: Branch[] = [new Branch()]) {
        let statement = new SwitchStatement(this.STATEMENT_ID, branches);
        this.statementList.set(this.STATEMENT_ID, statement);
        this.STATEMENT_ID++;
        return statement;
    }

}