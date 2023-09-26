import { IfStatement, type AnyStatement, type Statement, SimpleStatement, SwitchStatement, LoopStatement } from "$lib/classes/Statement";
import type Structogram from "$lib/classes/Structogram";
import { CustomDerivedStore, CustomStore } from "./CustomStore";

export type AnyStatementStore =
    StatementStore<SimpleStatement> |
    StatementStore<IfStatement> |
    StatementStore<SwitchStatement> |
    StatementStore<LoopStatement>

export class StructogramStore extends CustomStore<Structogram>{

    getStoreOf(statement: AnyStatement | Statement): AnyStatementStore {
        return this.getStatementStore(statement.id);
    }

    getStatementStore(id: number): AnyStatementStore {
        let statement = this._value.getStatementById(id);
        if (statement instanceof IfStatement) {
            return new StatementStore<IfStatement>(this, statement);
        }
        if (statement instanceof SwitchStatement) {
            return new StatementStore<SwitchStatement>(this, statement);
        }
        if (statement instanceof LoopStatement) {
            return new StatementStore<LoopStatement>(this, statement);
        }
        if (statement instanceof SimpleStatement) {
            return new StatementStore<SimpleStatement>(this, statement);
        }
        throw Error(`Cannot find statement on id:${id}`);
    }
}

export class StatementStore<T extends Statement> extends CustomDerivedStore<T, Structogram, StructogramStore>{
    
    readonly id:number;

    constructor(structogramStore: StructogramStore, initValue: T) {
        super(structogramStore, initValue);
        this.id = this._value.id;
    }

    protected parentChanged(newValue: Structogram): boolean {
        return this._value.equals(newValue.getStatementById(this._value.id));
    }

    getStoreOf(statement: AnyStatement | Statement): AnyStatementStore {
        return this._store.getStoreOf(statement);
    }

    getStatementStore(id: number): AnyStatementStore {
        return this._store.getStatementStore(id);
    }
}