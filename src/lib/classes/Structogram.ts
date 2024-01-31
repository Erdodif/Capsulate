import { AwaitStatement, Branch, IfStatement, LoopStatement, ParallelStatement, SimpleStatement, Statement, SwitchStatement } from "./Statement"

export type StructogramVariants = "program" | "function" | "async";

export default class Structogram {
    private STATEMENT_ID: number = 0;
    private statementList: Map<number, Statement>;
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

    has(id: number): boolean {
        return this.statementList.has(id);
    }

    addStatement(statement: Statement) {
        this.statementList.set(statement.id, statement);
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

    removeStatementById(id: number): Statement | undefined {
        if (!this.has(id)) {
            return undefined;
        }
        for (let i = 0; i < this.statements.length; i++) {
            if (this.statements[i].id == id) {
                let statement = this.statements[i];
                this.statements.splice(i, 1);
                this.statementList.delete(id);
                return statement;
            }
            else {
                let statement = this.removeFromAnyStatement(id, this.statements[i]);
                if (statement !== null) return statement;
            }
        }
        return undefined; // not found so far - unreachable
    }

    protected removeFromAnyStatement(id: number, holder: Statement): Statement | null {
        if (holder instanceof LoopStatement) {
            return this.removeFromLoopStatement(id, holder as LoopStatement);
        }
        if (holder instanceof SwitchStatement) {
            return this.removeFromSwitchStatement(id, holder);
        }
        if (holder instanceof IfStatement) {
            return this.removeFromIfStatement(id, holder as IfStatement);
        }
        if (holder instanceof ParallelStatement) {
            return this.removeFromParallelStatement(id, holder as ParallelStatement);
        }
        return null; // holder instanceof AwaitStatement || holder instanceof SimpleStatement
    }

    protected removeFromIfStatement(id: number, holder: IfStatement): Statement | null {
        for (let i = 0; i < holder.block.length; i++) {
            if (holder.block[i].id == id) {
                let statement = holder.block[i];
                holder.block.splice(i, 1);
                return statement;
            }
            else {
                let statement = this.removeFromAnyStatement(id, holder.block[i]);
                if (statement !== null) return statement;
            }
        }
        for (let i = 0; i < holder.elseblock.length; i++) {
            if (holder.elseblock[i].id == id) {
                let statement = holder.elseblock[i];
                holder.elseblock.splice(i, 1);
                return statement;
            }
            else {
                let statement = this.removeFromAnyStatement(id, holder.elseblock[i]);
                if (statement !== null) return statement;
            }
        }
        return null;
    }

    protected removeFromLoopStatement(id: number, holder: LoopStatement): Statement | null {
        for (let i = 0; i < holder.block.length; i++) {
            if (holder.block[i].id == id) {
                let statement = holder.block[i];
                holder.block.splice(i, 1);
                return statement;
            }
            else {
                let statement = this.removeFromAnyStatement(id, holder.block[i]);
                if (statement !== null) return statement;
            }
        }
        return null;
    }

    protected removeFromSwitchStatement(id: number, holder: SwitchStatement): Statement | null {
        for (let i = 0; i < holder.cases.length; i++) {
            for (let j = 0; j < holder.cases[i].block.length; j++) {
                if (holder.cases[i].block[j].id == id) {
                    let statement = holder.cases[i].block[j];
                    holder.cases[i].block.splice(j, 1);
                    return statement;
                }
                else {
                    let statement = this.removeFromAnyStatement(id, holder.cases[i].block[j]);
                    if (statement !== null) return statement;
                }
            }
        }
        return null;
    }

    protected removeFromParallelStatement(id: number, holder: ParallelStatement): Statement | null { return null; } // TODO
}