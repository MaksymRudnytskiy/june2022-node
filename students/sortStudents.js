const fs = require("fs");

function femaleSort() {
    fs.readdir('./students/female', {withFileTypes: true}, (err, files) => {

        for (const file of files) {

            fs.readFile(`./students/female/${file.name}`, (err1, data) => {
                const student = JSON.parse(data)

                if (student.gender === "male") {

                    fs.rename(`./students/female/${file.name}`, `./students/male/${file.name}`, err2 => {
                        console.log(err2);
                    })
                }
            })
        }
    })
}

function maleSort() {
    fs.readdir('./students/male', {withFileTypes: true}, (err, files) => {

        for (const file of files) {

            fs.readFile(`./students/male/${file.name}`, (err1, data) => {
                const student = JSON.parse(data)

                if (student.gender === "female") {

                    fs.rename(`./students/male/${file.name}`, `./students/female/${file.name}`, err2 => {
                        console.log(err2);
                    })
                }
            })
        }
    })
}

module.exports = {
    femaleSort,
    maleSort
}