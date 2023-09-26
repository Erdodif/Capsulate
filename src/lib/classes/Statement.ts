export type AnyStatement = SimpleStatement | IfStatement | SwitchStatement | LoopStatement

export abstract class Statement {
    readonly id: number

    constructor(id: number) {
        this.id = id;
    }

    abstract equals(other: Statement | undefined): boolean
}

export class Branch extends Statement {
    condition: string;
    block: Statement[];

    constructor(id: number = 0, condition: string = "", statements: Statement[] = []) {
        super(id);
        this.condition = condition;
        this.block = statements;
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

    constructor(id: number, content: string = "") {
        super(id);
        this.content = content;
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

    constructor(id: number, condition: string = "", success: Statement[] = [], fail: Statement[] = []) {
        super(id, condition, success);
        this.elseblock = fail;
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

    constructor(id: number, branches: Branch[] = [new Branch()]) {
        super(id);
        this.cases = branches;
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

    constructor(id: number, condition: string = "", reversed: boolean = false, statements: Statement[] = []) {
        super(id, condition, statements);
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
