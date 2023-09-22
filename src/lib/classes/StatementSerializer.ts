import { IfStatement, SimpleStatement, SwitchStatement, type Statement, LoopStatement, Branch } from "./Statement";
import Structogram, { type StructogramVariants } from "./Structogram";

export type StatementJson = SimpleStatementJson | SwitchStatementJson | IfStatementJson | LoopStatementJson;
export type SimpleStatementJson = { type: "simple" | "end" | "fail" | "return" | "skip", content?: string };
export type SwitchStatementJson = { type: "switch", cases: StatementBlockJson[] };
export type IfStatementJson = { type: "if", condition: string, block: StatementJson[], elseblock: StatementJson[] };
export type StatementBlockJson = { condition: string, block: StatementJson[] };
export type LoopStatementJson = { type: "loop" | "loop-reverse", condition: string, block: StatementJson[] };
export type StructogramJson = {
    type?: StructogramVariants,
    signature?: string,
    statements: StatementJson[],
};

/**
 * Structogram serializing and deserializing utility
 */
export class StructogramSerializer {

    /**
     * Deserializes a flat JS Object into Structogram
     */
    static fromJson(json: StructogramJson): Structogram {
        let structogram = new Structogram(json.signature, json.type)
        for (const statementJson of json.statements) {
            structogram.statements.push(statementJson);
        }
        return structogram
    }

    /**
     * Generates a flattened Json object, following the Kotlin made-up StructogramJSON standards
     * @param structogram The desired Structogram
     * @returns A JSON valid for reading back into Structogram or storing for later use
     */
    static toJson(structogram: Structogram): StructogramJson {
        const statementJsons: StatementJson[] = [];
        for (const item of structogram.statements) {
            statementJsons.push(StatementSerializer.toJson(item));
        }
        return { type: structogram.variant, signature: structogram.signature, statements: statementJsons }
    }
}

/**
 * Helper class to maintain contact with the outside world
 * 
 * With the help of `StatementSerializer`, 
 * Struktogram standard statements will be either generated, or flattened allowing reliable communication
 */
export class StatementSerializer {

    /**
     * Builds Statement from plain JS object (following the same way as the deserializing methods)
     * @param json The parsed, flat JS Object
     * @returns The type aware Statement
     */
    static fromJson(json: StatementJson): Statement {
        switch (json.type) {
            case "switch":
                return this.switchFromJson(json);
            case "if":
                return this.ifFromJson(json);
            case "loop":
                return this.loopFromJson(json);
            case "loop-reverse":
                return this.loopFromJson(json);
            default:
                return this.simpleFromJson(json);
        }
    }

    /**
     * Generates a flattened Json object, following the Kotlin made-up StructogramJSON standards
     * @param statement The given Statement
     * @returns A JSON valid for storing, respecting type recursively
     */
    static toJson(statement: Statement): StatementJson {
        if (statement instanceof SwitchStatement)
            return this.switchToJson(statement);
        if (statement instanceof IfStatement) return this.ifToJson(statement);
        if (statement instanceof LoopStatement)
            return this.loopToJson(statement);
        return this.simpleToJson(statement as SimpleStatement);
    }

    private static simpleFromJson(json: SimpleStatementJson): SimpleStatement {
        return new SimpleStatement(json.content);
    }

    private static simpleToJson(statement: SimpleStatement): SimpleStatementJson {
        return { type: "simple", content: statement.content }
    }

    private static switchFromJson(json: SwitchStatementJson): SwitchStatement {
        let statement = new SwitchStatement();
        for (const blockJson of json.cases) {
            let branch = new Branch(blockJson.condition);
            for (const statementJson of blockJson.block) {
                branch.block.push(this.fromJson(statementJson));
            }
            statement.addCase(branch);
        }
        return statement;
    }

    private static switchToJson(statement: SwitchStatement): SwitchStatementJson {
        const cases: StatementBlockJson[] = [];

        for (const block of statement.cases) {
            const statementJsons: StatementJson[] = [];
            for (const statement of block.block) {
                statementJsons.push(this.toJson(statement));
            }
            cases.push({ condition: block.condition, block: statementJsons });
        }
        return { type: "switch", cases: cases };
    }

    private static ifFromJson(json: IfStatementJson): IfStatement {
        const statement = new IfStatement(json.condition);
        for (const statementJson of json.block) {
            statement.block.push(this.fromJson(statementJson));
        }
        for (const statementJson of json.elseblock) {
            statement.elseblock.push(this.fromJson(statementJson));
        }
        return statement;
    }

    private static ifToJson(statement: IfStatement): IfStatementJson {
        const blockStatementJsons: StatementJson[] = [];
        for (const item of statement.block) {
            blockStatementJsons.push(this.toJson(item));
        }
        const elseStatementJsons: StatementJson[] = [];
        for (const item of statement.elseblock) {
            elseStatementJsons.push(this.toJson(item));
        }
        return { type: "if", condition: statement.condition, block: blockStatementJsons, elseblock: elseStatementJsons };
    }

    private static loopFromJson(json: LoopStatementJson): LoopStatement {
        const statement = new LoopStatement(json.condition);
        for (const statementJson of json.block) {
            statement.block.push(this.fromJson(statementJson));
        }
        return statement;
    }

    private static loopToJson(statement: LoopStatement): LoopStatementJson {
        const statementJsons: StatementJson[] = [];
        for (const item of statement.block) {
            statementJsons.push(this.toJson(item));
        }
        return { type: statement.reversed ? "loop-reverse" : "loop", condition: statement.condition, block: statementJsons };
    }

}