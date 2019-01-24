import * as fsp from "../index"
import { assert } from "chai"

describe("readFile", () => {
    it("index.ts", async () => {
        const result = await fsp.readFile("index.ts")
        assert.notStrictEqual(result.toString(), undefined)
    })
    it("unknown", async () => {
        try {
            await fsp.readFile("unknown")
            assert.fail()
        } catch (e) {
        }
    })
})

describe("readdir", () => {
    it("read current dir", async () => {
        const result = await fsp.readdir("./")
        const nm = result.filter(d => d.isDirectory && d.name === "node_modules")
        assert.strictEqual(nm.length, 1)
    })
})

describe("recursiveReaddir", () => {
    it("read current dir recursively", async () => {
        const result = fsp.recursiveReaddir("./")
        let v = false
        for await (const file of result) {
            v = v || file.includes("node_modules") && file.includes("typescript")
        }
        assert.isTrue(v)
    })
})

describe("exists", () => {
    it("index.ts", async () => {
        const result = await fsp.exists("index.ts")
        assert.isTrue(result)
    })
    it("unknown", async () => {
        const result = await fsp.exists("unknown")
        assert.isFalse(result)
    })
})