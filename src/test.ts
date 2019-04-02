import * as fsp from "./index"
import * as assert from "assert"

describe("readFile", () => {
    it("src/index.ts", async () => {
        const result = await fsp.readFile("src/index.ts")
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
        const result = await fsp.readdir("./", { withFileTypes: true })
        const nm = result.filter(d => d.isDirectory() && d.name === "node_modules")
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
        assert.deepStrictEqual(v, true)
    })
})

describe("exists", () => {
    it("src/index.ts", async () => {
        const result = await fsp.exists("src/index.ts")
        assert.deepStrictEqual(result, true)
    })
    it("unknown", async () => {
        const result = await fsp.exists("unknown")
        assert.deepStrictEqual(result, false)
    })
})

describe("recursiveRmdir", () => {
    it("create and delete", async () => {
        await fsp.mkdir("tmp")
        await fsp.writeFile("tmp/a.json", "{}")
        await fsp.mkdir("tmp/b")
        assert.deepStrictEqual(await fsp.exists("tmp"), true)
        await fsp.recursiveRmdir("tmp")
        assert.deepStrictEqual(await fsp.exists("tmp"), false)
    })
})
