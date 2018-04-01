/*
 * 
 * Copyright(c) 2009-2333 by Github
 * MIT Licensed
 */
const path = require('path')
const fs = require('fs')
let lowDBClient = require('Algae/lib/aDB')

class pluck {
	constructor(optins = {}, cmd) {
		this.optins = optins
		this.init(cmd)
	}
	
	init(cmd) {
		try {
			this[cmd]()
		} catch (e) {
			throw 'cmd no fund'
		}
	}
	
	gather() {
		console.log('gather run')
	}
	
	cease() {
	
	}
}

module.exports = function (cmd) {
	return new pluck(this.optins, cmd)
}