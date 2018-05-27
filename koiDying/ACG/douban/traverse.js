/*
 * traverse all user id
 *    Method Detail 
 * Copyright(c) 2009-2333 by Github NO.T233
 * MIT Licensed
 */
let RoseMongo = require('../../mongoDB')
const Crab = require('Algae/lib/net/crab')

/**
 *  1. get user id
 *  2. push to getUser.inserArray
 */
class GetUserID extends Crab {
	parse(res){
		res = JSON.parse(res)
		if(res.id) {
			res._id = res.id
			this.storeMethod(res)
		}
		if(res.code == 112){
			// "msg":"rate_limit_exceeded
			// Crab too many, exit process
			rosemaryDB.close();
			process.exit(112)
		}
	}
	storeMethod(res) {
		getUser.inserArray.push(res)
	}
}
/**
 * if getUser.inserArray.length > 10
 * call inserArray fn save it
 * @type {{num : number, init : getUser.init, getNum : getUser.getNum}}
 */
let getUser = {
	num:1000001,
	inserArray: [],
	init: function(){
		getUser.getNum()
		getUser.timeId = setInterval(()=>{
			if(getUser.inserArray.length > 10){
				var item = getUser.inserArray
				RoseMongo.insertMany(global.rosemaryDB,'douban.user',item,()=>{ console.log('done insert one piece')})
				getUser.inserArray = [];
			}
			new GetUserID({
				url: 'https://api.douban.com/v2/user/' + getUser.num++
			})
			console.log('get user id: ',getUser.num)
		},7 * 1000)
	},
	getNum: function(){
		// comtunie last time already get user id num
		rosemaryDB.collection('douban.user').find({}).sort({_id: -1}).limit(1).toArray(function (err, docs) {
			if(docs && docs[0]){
				getUser.num = docs[0]._id * 1 // turn to number
			}
		})
	}
}

function name() {
	RoseMongo.connect(()=>{
		getUser.init()
	})
}

module.exports = name

// run place

RoseMongo.connect(()=>{
	getUser.init()
})

