// dependencies
const fs = require('fs')
const path = require('path')

// module scaffolding
const lib = {}

// base directory of data files
lib.basedir = path.join(__dirname, '/../../.data/')
lib.file_type = '.json'

// write data to file
lib.create = (dir, file, data, callback) => {
    fs.open(fileName(dir, file, lib.file_type), 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            const data_str = JSON.stringify(data)
            fs.writeFile(fileDescriptor, data_str, (write_err) => {
                if(!write_err){
                    fs.close(fileDescriptor, (close_err) => {
                        if(!close_err) {
                            callback(false)
                        } else {
                            callback('Failed to close the file!')
                        }
                    })
                } else {
                    callback('Failed to write in the file!')
                }
            })
        } else {
            callback('Failed to create new file, the file may already be exist!')
        }
    })
}

// read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(fileName(dir, file, lib.file_type), 'utf8', (err, data) => {
        callback(err, data)
    })
}

// update file data
lib.update = (dir, file, data, callback) => {
    fs.open(fileName(dir, file, lib.file_type), 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            const data_str = JSON.stringify(data)

            fs.ftruncate(fileDescriptor, 4, (truncate_err) => {
                if(!truncate_err){
                    fs.writeFile(fileDescriptor, data_str, (write_err) => {
                        if(!write_err){
                            fs.close(fileDescriptor, (close_err) => {
                                if(!close_err) {
                                    callback(false)
                                } else {
                                    callback('Failed to close the file!')
                                }
                            })
                        } else {
                            callback('Failed to write in the file!')
                        }
                    })
                } else {
                    callback('Failed to truncate file data')
                }
            })
        } else {
            callback('Failed to create new file, the file may already be exist!')
        }
    })
}

// delete file
lib.delete = (dir, file, callback) => {
    fs.unlink(fileName(dir, file, lib.file_type), (err) => {
        if(!err) {
            callback(false)
        } else {
            callback('Failed to delete file!')
        }
    })
}

const fileName = (dir, file, file_type) => {
    return lib.basedir+dir+'/'+file+file_type
}

//export module
module.exports = lib