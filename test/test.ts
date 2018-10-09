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