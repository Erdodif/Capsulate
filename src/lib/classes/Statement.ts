export type AnyStatement = SimpleStatement | IfStatement | SwitchStatement | LoopStatement

let AUTO_INCREMENT = 0;

export abstract class Statement {
    readonly id: number

    constructor() {
        this.id = AUTO_INCREMENT++;
    }

    abstract getStatementById(id: number): Statement | undefined;
    abstract equals(other: Statement | undefined): boolean
}

export class Branch extends Statement {
    condition: string;
    block: Statement[];

    constructor(condition: string = "", statements: Statement[] = []) {
        super();
        this.condition = condition;
        this.block = statements;
    }

    getStatementById(id: number): Statement | undefined {
        return this.block.find(statement => statement.id == id);
    }

    equals(other: Statement | undefined): boolean {
        if (other == undefined || other.id !== this.id || !(other instanceof Branch)) {
            return false;
        }
        for (let i = 0; i < this.block.length; i++) {
            if (!this.block[i].equals(other.block[i])) {
                return false;
            }
        }
        return true;
    }
}

export class SimpleStatement extends Statement {
    content: string;

    constructor(content: string = "") {
        super();
        this.content = content;
    }

    getStatementById(id: number): Statement | undefined {
        return undefined;
    }

    equals(other: Statement | undefined): boolean {
        if (other == undefined || other.id !== this.id || !(other instanceof SimpleStatement)) {
            return false;
        }
        return this.content == other.content;
    }
}

export class IfStatement extends Branch {
    elseblock: Statement[];

    constructor(condition: string = "", success: Statement[] = [], fail: Statement[] = []) {
        super(condition, success);
        this.elseblock = fail;
    }

    getStatementById(id: number): Statement | undefined {
        return this.block.find(statement => statement.id == id) ??
            this.elseblock.find(statement => statement.id == id);
    }

    equals(other: Statement | undefined): boolean {
        if (other == undefined || other.id !== this.id || !(other instanceof IfStatement)) {
            return false;
        }
        for (let i = 0; i < this.block.length; i++) {
            if (!this.block[i].equals(other.block[i])) {
                return false;
            }
        }
        for (let i = 0; i < this.block.length; i++) {
            if (!this.elseblock[i].equals(other.elseblock[i])) {
                return false;
            }
        }
        return true;
    }
}

export class SwitchStatement extends Statement {
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
        super();
        this.cases = branches;
    }

    getStatementById(id: number): Statement | undefined {
        for (const block of this.cases) {
            let statement = block.block.find(statement => statement.id == id);
            if (statement) {
                return statement;
            }
        }
    }

    equals(other: Statement | undefined): boolean {
        if (other == undefined || other.id !== this.id || !(other instanceof SwitchStatement)) {
            return false;
        }
        for (let i = 0; i < this.cases.length; i++) {
            if (!this.cases[i].equals(other.cases[i])) {
                return false;
            }
        }
        return true;
    }
}

export class LoopStatement extends Branch {
    reversed: boolean;

    constructor(condition: string = "", reversed: boolean = false, statements: Statement[] = []) {
        super(condition, statements);
        this.reversed = reversed;
    }

    equals(other: Statement | undefined): boolean {
        if (other == undefined || other.id !== this.id || !(other instanceof LoopStatement) || this.reversed !== other.reversed) {
            return false;
        }
        for (let i = 0; i < this.block.length; i++) {
            if (!this.block[i].equals(other.block[i])) {
                return false;
            }
        }
        return true;
    }
}
