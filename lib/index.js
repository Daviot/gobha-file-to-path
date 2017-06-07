/////
// Dependencies
/////
let each = require('async').each

// expose plugin
module.exports = plugin

/**
 * Metalsmith plugin to convert named files into seo paths
 * @param {Object} options
 *   @property {String} extension (optional)
 *   @property {Boolean} logging (optional)
 * @return {Function}
 */
function plugin(opts) {
    // default values
    opts = opts || {}

    let ext = opts.extension || 'html|php|md|hbs',
        logging = opts.logging || false

    // plugin action
    return (files, metalsmith, done) => {
        if(logging) {
            console.log(' ')
            console.log('[Plugin] file-to-path')
        }
        let keys = Object.keys(files),
            htmlFiles = []

        // iterate over all items to filter html files, exclude assets and other stuff
        keys.forEach((file) => {
            let regex = `.*\.(${ext})`

            if (file.match(new RegExp(regex, 'i')) !== null) {
                
                htmlFiles.push(file)
            }
        })

        // process the files
        each(Object.keys(htmlFiles), (file, next) => {
            convert(htmlFiles[file], next)
        }, done)


        function convert(file, next) {
			let doConvert = files[file].fileToPath != false
            if(logging) {
                console.log('>', file)
            }
            // create nice permalinks
            if(true) {
                // check if the file is an endpoint otherwise create folder and add it via index as endpoint
                if (file.indexOf('index') < 0) {
                    var modFile = file.split('.')
                    if (modFile.length >= 2) {
                        // add index
                        modFile[modFile.length - 2] += '/index'
                        // clone entry
                        files[modFile.join('.')] = files[file]
                        if(logging) {
                            console.log('  >', 'repath', file, 'to', modFile.join('.')) 
                        }
                        // delete old entry
                        delete files[file]
                        // make new the current
                        file = modFile.join('.')
                    }
                }
            } else {
                // doConvert is false
                if(logging) {
                    console.log('  >', 'ignored')
                }
            }
            // next
            next()
        }
    }
}