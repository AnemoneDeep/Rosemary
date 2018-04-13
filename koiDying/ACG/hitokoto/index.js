const monitor = require('./monitor')
const pluck = require('./pluck')
const api = require('./api')
const path = require('path')



let {lowDB: dbPath} = require('../../../config')

class hitokoto {
	constructor() {
		this.options = {
			dbPath: path.resolve(__dirname, dbPath.path + "/hitokoto/hitokoto.json")
		}
		this.status = {
			init: false,
			pluck: false
		}
		this.pluck = function (cmd,options) {
			return new pluck(cmd,options,this)
		}
		this.monitor = monitor
		this.init()
		// console.log('constructor', this)
	}
	
	init() {
		// this.status.init = true
		this.monitor.init(this.options)
	}
}

let Hitokoto = new hitokoto
/**
 * imitate call Hitokoto
 *
 */
// start Task : crab info
Hitokoto.pluck('gather')

// not yet
// Hitokoto.pluck('addItem',{})
// console.log(Hitokoto.pluck('state'), '----')
// call crab fn
// 