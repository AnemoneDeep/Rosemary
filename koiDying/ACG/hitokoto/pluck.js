/*
 *  pluck Method options
 *  	gather stop  status
 *
 * Copyright(c) 2009-2333 by Github
 * MIT Licensed
 */
const path = require('path')
const fs = require('fs')
const md5 = require('Algae/lib/arithmetic/md5')
const Crab = require('Algae/lib/net/crab')
let lowDBClient = require('Algae/lib/aDB')
let hitokotoDB = null

class getAPI extends Crab {
	parse(res) { //get complete requst infomation add second argument
		let mode = this.options.mode;
		if (!this[mode]) return console.log('don\'t have mach method');
		switch (res) {
			case 'letGo':
				
				return
				break
		}
		
		if (typeof res == 'object') {
			// if object not need parse it
			console.log('res is object');
		} else {
			console.log('res is string');
			try {
				res = JSON.parse(res);
				//    console.log('after parse', res)
			} catch (e) { // result first is ''  disturb
				try {
					res = res.substring(1, res.length);
					res = JSON.parse(res);
				} catch (e) {
					//   console.log('JSON parse err again res is : ', res)
					//   console.log('typeof : ', typeof res);
					return null;
				}
				//  return fasle;
			}
		}
		this.res = res
	}
	
	analyzeData() {
		let onePiece = this[this.options.mode](this.res);
		this.storeMethod(onePiece);
	}
	
	txt(res) {
		let onePiece = {
			hitokoto: res
		};
		return onePiece
	}
	
	hitokoto(res) {
		let onePiece = {
			hitokoto: res.hitokoto,
			catname: res.type,
			source: res.from
		};
		return onePiece
	}
	
	imiliy(res) {
		let onePiece = {
			hitokoto: res.text,
			catname: res.catname,
			source: res.source
		};
		return onePiece
	}
	
	imjad(res) {
		let onePiece = {
			hitokoto: res.hitokoto,
			catname: res.catname,
			source: res.source
		};
		return onePiece
	}
	
	satori(res) {
		let onePiece = {
			hitokoto: res.hitokoto,
			catname: res.cat,
			source: res.source
		};
		return onePiece
	}
	
	addItem(res) {
		let {hitokoto, catname, source} = res
		this.storeMethod({hitokoto, catname, source})
	}
	
	storeMethod(res) {
		let MD5 = md5(res.hitokoto);
		let result = {
			mgs: ''
		}
		console.log('check ==> save it', res)
		let existMD5 = hitokotoDB.get('hitokoto.' + MD5).value();
		if (existMD5) {
			result.mgs = 'item data is alread exist => pass'
			console.log('item data is alread exist => pass')
		} else {
			db.set('hitokoto.' + MD5, res).write();
			result.mgs = 'insert item,MD5 is: ' + MD5
			console.log('insert item,MD5 is: ', MD5)
		}
		if (res.callback) {
			callback(result)
		}
	}
}

class pluck {
	constructor(cmd, options = {}, callThis) {
		this.status = 0
		this.TimeID = null
		this.en = ['stop', 'runing']
		this.options = options
		hitokotoDB = lowDBClient(callThis.options.dbPath) // get db path
		hitokotoDB.defaults({hitokoto: {}, creatBy: 'Github NO.T233'})
		this.init(cmd)
	}
	
	init(cmd) {
		try {
			return this[cmd]()
		} catch (e) {
			console.log('cmd no fund', cmd) // throw 'cmd no fund'
		}
		return this
	}
	
	gather() {
		this.status = 1
		launch()
		
		function launch() {
			console.log('gather launch ......')
			let runIT1 = new getAPI({
				mode: 'hitokoto',
				url: 'https://sslapi.hitokoto.cn/?encode=json'
			})
		}
	}
	
	addItem() {
		new getAPI({
			mode: 'addItem',
			data: { }
		})
	}
	
	state() {
		let onePiece = this.en[this.status]
		return onePiece
	}
	
	stop() {
	}
}

module.exports = pluck