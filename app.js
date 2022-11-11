const fs = require('node:fs')
// const sort = require('./students/sortStudents')

fs.readdir('./students/female', {withFileTypes: true}, (err, files) => {

    for (const file of files) {

        fs.readFile(`./students/female/${file.name}`, (err1, data) => {
            const student = JSON.parse(data)

            if (student.gender === "male") {

                fs.rename(`./students/female/${file.name}`, `./students/male/${file.name}`, err2 => {
                    console.log(err2);
                })
            }else if (student.gender === "female") {

                fs.rename(`./students/male/${file.name}`, `./students/female/${file.name}`, err3 => {
                    console.log(err3);

                })
            }
        })
    }
})












