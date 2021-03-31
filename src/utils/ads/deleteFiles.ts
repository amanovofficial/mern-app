import fs from "fs";
const deleteFiles = (files: string[] | undefined, cb: (err: string | null) => void): void => {
    const path:string = require.main?.path + '\\..\\images\\ads\\'
    if (files) {
        files.forEach(filename => {
            fs.unlink(path + filename, (err) => {
                if (err) {
                    cb(err.message)
                    return
                } else {
                    console.log(`File - ${filename} deleted success!`);
                }
            })
        })
    }
    cb(null)
}

export default deleteFiles