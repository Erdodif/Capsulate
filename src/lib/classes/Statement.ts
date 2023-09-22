export type AnyStatement = SimpleStatement | IfStatement | SwitchStatement | LoopStatement

interface Statement { }

export class Branch implements Statement {
    condition: string;
    block: Statement[];

    constructor(condition: string = "", statements: Statement[] = []) {
        this.condition = condition;
        this.block = statements;
    }
}

export class SimpleStatement {
    content: string;

    constructor(content: string = "") {
        this.content = content;
    }
}

export class IfStatement extends Branch {
    elseblock: Statement[];

    constructor(condition: string = "", success: Statement[] = [], fail: Statement[] = []) {
        super(condition, success);
        this.elseblock = fail;
    }

}

export class SwitchStatement implements Statement {
    cases: Branch[];

    case(index: number): Branch {
        if (index < 0 || index > this.cases.length - 1) {
            throw new Error(`SwitchStatement got indexed outside it's boundaries (got: ${index}, length: ${this.cases.length})`)
        }
        return this.cases[index];
    }

    setCase(index: number, value: Branch) {
        this.cases[index] = value;
    }

    addCase(value: Branch) {
        if (this.cases[this.cases.length - 1]) {

        }
    }

    constructor(branches: Branch[] = [new Branch()]) {
        this.cases = branches;
    }
}

export class LoopStatement extends Branch {
    reversed: boolean;

    constructor(condition: string = "", reversed: boolean = false, statements: Statement[] = []) {
        super(condition, statements);
        this.reversed = reversed;
    }
}
