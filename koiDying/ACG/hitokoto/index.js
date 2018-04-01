const monitor = require('./monitor')
const pluck = require('./pluck')
const api = require('./api')
const path = require('path')

let {lowDB: dbPath} = require('../../../config')

class hitokoto {
	constructor() {
		this.optins = {
			dbPath: path.resolve(__dirname, dbPath.path + "/hitokoto/")
		}
		this.status = {
			init: false,
			pluck: false
		}
		this.pluck = pluck
		this.monitor = monitor
		this.init()
		// console.log('constructor', this)
	}
	
	init() {
		// this.status.init = true
		this.monitor.init(this.optins)
	}
}


let Hitokoto = new hitokoto

// commed run gather
Hitokoto.pluck('gather')
// call crab fn