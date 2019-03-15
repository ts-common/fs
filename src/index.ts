import * as fs from "fs"
import * as path from "path"
import * as asyncIt from "@ts-common/async-iterator"
import * as util from "util"

export const readFile = util.promisify(fs.readFile)

export const writeFile = util.promisify(fs.writeFile)

export const exists = util.promisify(fs.exists)

export const readdir = util.promisify(fs.readdir)

export const recursiveReaddir = (dir: string): asyncIt.AsyncIterableEx<string> =>
    asyncIt.fromPromise(readdir(dir, { withFileTypes: true })).flatMap(
        f => {
            const p = path.join(dir, f.name)
            return f.isDirectory() ?  recursiveReaddir(p) : asyncIt.fromSequence(p)
        }
    )

