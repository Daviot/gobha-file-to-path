/////
// Dependencies
/////
var each = require('async').each,
    extend = require('extend'),
    handlebars = require('handlebars'),
    jetpack = require('fs-jetpack')

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

    var ext = opts.extension || 'html|php|md|hbs|htaccess',
        logging = opts.logging || false

    // plugin action
    return (files, metalsmith, done) => {
        if(logging) {
            console.log(' ')
            console.log('[Plugin] file-to-path')
        }
        var metadata = metalsmith.metadata(),
            keys = Object.keys(files),
            htmlFiles = [],
            params = {},
            partialsList = null

        // iterate over all items to filter html files, exclude assets and other stuff
        keys.forEach((file) => {
            var data = files[file],
                regex = `.*\.(${ext})`

            if (file.match(new RegExp(regex, 'i')) !== null) {
                
                htmlFiles.push(file)
            }
            if (file == '.htaccess') {
                
            }
        })

        // process the files
        each(Object.keys(htmlFiles), (file, next) => {
            convert(htmlFiles[file], next)
        }, done)


        function convert(file, next) {
			var extension = 'html',
                doConvert = files[file].fileToPath != false
            if(logging) {
                console.log('>', file)
            }
            // create nice permalinks
            if(doConvert) {
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
            
                // process the "ext" option in the file
                if(files[file].hasOwnProperty('ext')) {
                    extension = files[file].ext
                }
                
                var reformat = file.split('.')
                // change extension
                reformat[reformat.length - 1] = extension
                // clone entry
                files[reformat.join('.')] = files[file]
                if(logging) {
                    console.log('  >', 'reformat', file, 'to', reformat.join('.')) 
                }
                // delete old entry
                delete files[file]
                // make new the current
                file = reformat.join('.')
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