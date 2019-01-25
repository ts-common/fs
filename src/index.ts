import * as fs from "fs"
import * as path from "path"
import * as asyncIt from "@ts-common/async-iterator"

type Callback<T> = (err: NodeJS.ErrnoException, result: T) => void

const toPromise = <T>(f: (callback: Callback<T>) => void) =>
    new Promise<T>((resolve, reject) =>f((err, result) => err ? reject(err) : resolve(result)))

type CallbackVoid = (err: NodeJS.ErrnoException) => void

const toPromiseVoid = (f: (callback: CallbackVoid) => void) =>
    new Promise<void>((resolve, reject) =>f((err) => err ? reject(err) : resolve()))

export const readFile = (pathStr: string): Promise<Buffer> =>
    toPromise(callback => fs.readFile(pathStr, callback))

export const writeFile = (pathStr: string, data: string): Promise<void> =>
    toPromiseVoid(callback => fs.writeFile(pathStr, data, callback))

export const readdir = (pathStr: string): Promise<ReadonlyArray<fs.Dirent>> =>
    toPromise(callback => fs.readdir(pathStr, { withFileTypes: true }, callback))

export const recursiveReaddir = (dir: string): AsyncIterable<string> =>
    asyncIt.flatMap(
        asyncIt.fromPromise(readdir(dir)),
        f => {
            const p = path.join(dir, f.name)
            return f.isDirectory() ?  recursiveReaddir(p) : asyncIt.fromSequence(p)
        }
    )

export const exists = (dir: string): Promise<boolean> =>
    new Promise(resolve => fs.exists(dir, resolve))
