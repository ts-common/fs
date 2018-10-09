import * as fs from "fs"

export const readFile = (pathStr: string): Promise<Buffer> =>
    new Promise(
        (resolve, reject) => fs.readFile(
            pathStr,
            (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            }
        )
    )

export const exists = (dir: string): Promise<boolean> =>
    new Promise<boolean>(resolve => fs.exists(dir, resolve))
