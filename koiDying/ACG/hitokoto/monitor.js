let _fs = require('Algae/lib/core/fs')
let monitor = {
	init: function(options){
		this.checkPath(options.dbPath)
	},
	checkPath: function(dbPath){
		_fs.mkdirsSync(dbPath)
	}
}
module.exports = monitor