# gobha-file-to-path

A [Metalsmith](www.metalsmith.io) plugin to convert all files into permalink for seo optimisation

**Example**: `/test/demo.md` will become `/test/demo/index.md` so the site can be reached via `/test/demo/`  
Only files that match the `extension` option will be modified  

**The plugin will not change the extension of the files!**

## Installation

	$ npm install gobha-file-to-path

## Javascript Usage

```js
let file_to_path = require('gobha-file-to-path')

metalsmith.use(file_to_path())
```

## Options

```js
{
	extension: "html|php|md|hbs"
}
```
#### extension

The plugin checks every file extension and when the extension matches the regex it will process the file and modify the path, otherwise the file will be ignored and can be modified by the next plugin.


## License
MIT