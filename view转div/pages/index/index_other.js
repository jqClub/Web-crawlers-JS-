//获取应用实例
var app = getApp()
let swan = wx 

var	uesr_erro_num = 0

var util = require("../../utils/util.js")  //版本控制相关

 //10.15新增缓存内容
var wcache = require("../../utils/wcache.js") 

var log = console.log.bind(console)

////11.06新增登陆的函数
//var loginNew = require("../../utils/loginNew.js")

//11.06新增//关于微信授权的获取
var getWx = require("../../utils/getWx.js")

//11.06新增引入ajax请求
var wxRequest = require("../../utils/wxRequest.js")

var innerAudioContext

//11.14新增，使用2个innerAudioContext
var innerAudioContext1

//11.09新增一个定时器，去判断进入的时间
var enterTimer

////11.22新增，登录的逻辑
//var loginFun = require("../../utils/loginFun.js")

//12.11修改，播放音乐的问题，ios的使用这个方式去播放
var backgroundAudioManager = swan.getBackgroundAudioManager();

////19.1.9新增,收集fromId
//var formId = require("../../utils/formId.js") 

//ip屏蔽功能
import getShowYouDaoNew from '../../utils/getShowYouDaoNew.js'

//11.22api接口数据
import apiAsk from '../../utils/apiAsk'

var content = require("../../utils/content.js")  //版本控制相关

var result = {
	
	onLoadFun: function() {
		var that = this
		////          //设置轮播列表数据
            that.setLoop()
		
//		//第一个参数是bms配置的唯一标识，第二个参数是版本号
		getShowYouDaoNew.run(getApp().data.appName, getApp().data.versionNumber)
		  .then(res=> {
			console.log('getShowYouDao结果', res)
			app.data.bmsControl = res
			that.setData({
				bmsControl: res,
			})
			log('bms控制', that.data.bmsControl, that.data.appLists)
	
//	//			//设置轮播列表数据
				that.setLoop()
		  })
	},
	
	//如果金额到达了额度，显示弹窗
	turnEnergy: function() {
		var that = this
		//获取用户的信息
	    var prom = apiAsk('GETCONFIG', {});
	    // 题目
	    prom.then(res => {
	    	if(res.data.c == '0') {
				var userInfo = app.data.userInfo
				var balance = Number(userInfo.balance)
				if(26 <= balance && balance <= 28) {
					that.showRed(5)
				}
			}
	    })
	},
	onReadyFirst: function() {
		var that = this
		//判断余额是否转能量值
	    that.turnEnergy()
	},
	//首次进入时的判断
	openFirst: function() {
		var that = this
//		//11.05新增（是否有点击过按钮（选择字））--这里改成了，是否第一次显示红包打开界面
//		var hasClick = wcache.get('hasClick') || false
//		that.setData({
//			hasClick: hasClick
//		})
//		log('是否第一次显示红包打开界面', hasClick)
		
		
		//1.获取本地最大的题目
		var getMaxNum = that.saveLocalUser.getMaxNum() + 1
		//2.获取本地数据
		that.aboutPassNum.setPassNum(getMaxNum)
		
		//获取用户的信息
	    var prom = apiAsk('GETCONFIG', {});
	    // 题目
	    prom.then(res => {
	    	if(res.data.c == '0') {
	    		//11.20新增修改，设置一个常量
				var getData = res.data.d
				//设置总的值
				app.setUser(that)
	    	}
	    })
	},
	aboutPassNum: function() {
		var that = this
		//判断是否有，有就不去设置
		if(typeof that.aboutPassNum != 'function') {
			return 
		}
		var result = {
			//跳过或其他，可以设置跳过第几题
			changePass: function(num) {
				var self = this
				//num可正可负,跳过 幅度
				var passNum =  that.data.passNum || 1
				passNum += num
				self.setPassNum(passNum)
			},
			//设置passNum的值，并且取取题
			setPassNum: function(passNum) {
				var self = this
				//保存在本地
				that.saveLocalUser.saveMaxNum()
				//设置当前的题目数量
				that.setData({
					passNum,
				})
				
				//增加延迟时间
				setTimeout(function() {
					//直接去请求下一题题目
					that.INDEXDL()
				}, 500)
			}
		}
		that.aboutPassNum = result
	},
	clearAllAnser: function() {
		var that = this;
		var str = 'subject.question'
		//清空按钮
		that.setData({
//			button_list:[],
//			input_list: [],
			
			//19.2.27新增——清空题目数据
			[str]: '',
		})
	},
	//首次进入 查询题目
	INDEXDL: function() {
		var that = this;
		log('--INDEXDL_new--', app.data.userInfo)
		that.clearAllAnser()
		
		// 如果为答题状态
	    let prom = apiAsk('guess', {
	    	passNum: that.data.passNum || 1, //获取第几题
	    });
	    // 题目
	    prom.then(res => {	
				console.log('INDEXDL 首次进入 查询题目', res)
				//11.20新增修改，设置一个常量
				var getData = res.data.d
				if(res.data.c == '0') {
					//09.10修改，在0的时候，才会返回
					if( res.data.d.isPass ){
//						if( res.data.d.indexOf('通关') > -1) {
//							//通关后的逻辑
//							that.setgame_state(5)
//							return
//						}
						//通关后的逻辑
						that.setgame_state(5)
						that.setData({
							//19.2.21新增设置信息
							userData: getData.userData,
						})
						return
					}
					
					
					var list = getData.list,
						user = getData.user;
					//清除题库
//					12.12修改,去除share的判断
					var pass = user.pass_next
					
					that.setData({
						money					:	getData.user.score,
						user_msg				:	user,
						
//						game_state: 0,
						
						prompt_need_score: getData.prompt_need_score || 0,
						
						//19.2.21新增设置信息
						userData: getData.userData,
					})
					log(typeof that.data.userData.level)
					that.setgame_state(0)
					
					//11.20修改
					var answerList = list[0]
					//导入题目
					that.import_subject(answerList);
					var let_answer = answerList.answer;
					let_answer = let_answer.slice( let_answer.length - user.prompt_num );
					var let_answer_arr = let_answer.split("");
					let_answer_arr = let_answer_arr.reverse();
					if( let_answer_arr.length > 0 ){
						//遍历按钮
						that.get_prompt(let_answer_arr);
					}
				} else {
			}
	
//			//			//设置轮播列表
//			that.setLoop()
		})
	},
	//减少能量值的动效
	deductEnergy: function() {
		var that = this 
		var deductNum = content.levels.deductNum
		var oldPowerValue = that.data.userInfo.powerValue
		var newPowerValue = Number(oldPowerValue) - deductNum
		setTimeout(function(){that.num_animation(oldPowerValue,newPowerValue,'','userInfo.powerValue');},100)
	},
//	LOOK_ANSWER: function(fun) {
	LOOK_ANSWER_NEW: function(fun) {
		var that = this
		//减少能量值的动效
		that.deductEnergy()
		
		//【答题页】点击“查看答案”，左边爱心飞向“查看答案”按钮，然后弹提示语“能量值-8”，然后再弹出答案提示框
		//新增动效
		that.setData({
			leftshiAM: true,
		})
		setTimeout(function() {
			that.setData({
				leftshiAM: false,
			})
			var deductNum = content.levels.deductNum
			
			app.showToastNew('能量值-' + deductNum, 1000)
			setTimeout(function() {
				//新增音效
			    that.audioPlay('energy_kouchu')
			    
//			    that.LOOK_ANSWER_NEW(fun)
				fun()	
			}, 1000)
		}, 1000)
		return
//		//新增音效
//	    that.audioPlay('energy_kouchu')
//	    
//	    that.LOOK_ANSWER_NEW(fun)
	},
	LOOK_ANSWER: function(fun) {
		var that = this
		//非广深地区,先判断用户的能量值,如果有,就直接扣,没有就先打开弹窗
	    let prom = apiAsk('LOOK_ANSWER', {});
	    // 题目
	    prom.then(res => {
	    	if(res.data.c == '0') {
	    		//11.20新增修改，设置一个常量
				var getData = res.data.d
				if(getData == 'succeed') {
					that.LOOK_ANSWER_NEW(fun)
//					fun()	
				} else {
					that.clickEvent('showPower')
				}
	    	}
	    })
	},
	
	//关闭所有的弹窗
	closeAllPop: function(e) {
		var that = this
		var type = e.target.dataset.type;
		log('-type-', type)
		//如果是有内容的，就不关闭了
		if(type) {
			return 
		}
		that.setgame_state(0)
	},
	openPop: function() {
		var that = this
		that.setgame_state(5)
	},
	//获取自定义组件
	customs: function() {
		var that = this
		//		//11.5新增下雨组件
		that.myCustoms = that.selectComponent('#myCustoms');
		//获取本地数据，打开时候去设置
		var maxNum = wcache.get('maxNum') || 1
		that.myCustoms.firstSetNum({
			num: maxNum,
			page: that,
		})
	},
	//打开题目界面（关卡地图的回调函数）
	openTimu: function(e) {
		var that = this
		const item = e.detail.item
		that.aboutPassNum.setPassNum(item)
	},
	//更新用户的值，因为改变了用户的能量值
	closePower: function() {
		var that = this
		app.setUser()
	},
	//保存用户信息数据
	saveLocalUser: function() {
		var that = this
		//判断是否有，有就不去设置,否则再去设置新的
		if(typeof that.saveLocalUser != 'function') {
			return 
		}
		//保存用户题目在本地
		var result = {
			//保存本地数据
			saveMaxNum: function() {
				var self = this
				let result = false
				/*和本地数据对比，然后存在本地*/
				var maxNum = self.getMaxNum()
				var passNum = that.data.passNum
				//如果大于本地就去更新
				if(passNum > maxNum) {
					result = true
					//保存在本地
					wcache.put('maxNum', passNum)
				}
				return result
			},
			getMaxNum: function() {
				var self = this
				//获取本地数据，设置数据
				var maxNum = wcache.get('maxNum') || 0
				maxNum = Number(maxNum)
				return maxNum
			},
		}
		that.saveLocalUser = result
	},
	succeedFun: function() {
		var that = this
		//如果已经通关了
		//19.2.21新增,存储本地数据(是否需要保存在本地)
		var isSave = that.saveLocalUser.saveMaxNum() ///判断当前题是否比实际的大， 大的话才去设置宝箱和红包，礼包等
		if(isSave) {
			that.showPrizeType() 
		} else {
			//这里是原来的成功逻辑
			that.setgame_state(2)
		}
	},
	//展示不同宝箱.礼包或红包
	showPrizeType: function() {
		var that = this
		var passNum = that.data.passNum
		//2019.2.11新增,版本控制
		var bmsControl = app.data.bmsControl
		if(content.appearBox(passNum)) {
			if(bmsControl.box) {
				//展示宝箱功能
				that.showGrade()
				return 
			}
		}
		if(content.appearRedGift(passNum)) {
			//展示红包功能
			var showType = that.showRedOrLibao()
			if(showType) {
				that.showResult(showType)
				return 
			}
		}
		
		//原来的弹窗(正确的逻辑)
		that.showPop()
	},
	showResult: function(type) {
		var that = this
//		type为1,出现红包,否则出现礼包
		if(type == 1) {
						//		增加音效
//			that.audioPlay('open_red')
			that.audioPlayNew('get_red')
			
			that.showRed()
		} else {
						//		增加音效
//			that.audioPlay('open_libao')
			that.audioPlayNew('libao')
			
			that.showLibao()
		}
	},
	
	//是展示红包还是礼包
	showRedOrLibao: function() {
		var that = this
		var type = 0
		
		var bmsControl = app.data.bmsControl
		var red_probability = bmsControl.redbag6_40 * 100
		var userInfo = app.data.userInfo
		
		//2.如果是在概率中，就显示相应的弹窗
		//取一个随机值，看是在哪个区间内
		var suiji = util.randomNumDecimal(0, 100)
		log(111111, suiji, red_probability, bmsControl.red)
		log(222222, userInfo.isClearBalance != 1, userInfo.balance <= 28)
		//如果red_probability，出现红包，否则出现礼包
		if(suiji <= red_probability) {
////			出现红包
//			type = 1
			//1.如果出现红包
			if(bmsControl.red) {
				//如果没有清空
				if(userInfo.isClearBalance != 1) {
					//如果余额小于28才出现
					if(userInfo.balance <= 28) {
						type = 1
					}
				}
			}
		} else {
//			//出现礼包
//			type = 2
			if(bmsControl.energy) {
				type = 2
			}
		}
////		3.如果是设置的不出现红包,只出现礼包（bms控制）--//1.如果已经转能量值，就不显示红包
//		if(!bmsControl.red || app.data.userInfo.isClearBalance == 1) {
//			type = 2
//		} else {
//			type = 0
//		}
////		4.如果是设置的不出现礼包,只出现红包（bms控制）
//		if(!bmsControl.energy) {
//			if(app.data.userInfo.isClearBalance == 0) {
//				type = 1
//			} else {
//				type = 0
//			}
//		} else {
//			type = 0
//		}
		log(333333, type)
		return type
	},
	//展示不同弹窗
	showPop: function() {
		var that = this
		var upgradeOrPass = content.upgradeOrPass(that.data.passNum)
		var result = {
			//原来普通模式下环境
			common: function() {
				var self = this
				//这里是原来的成功逻辑
				that.setgame_state(2)
			},
			//通关了
			player: function() {
				var self = this
				that.setgame_state(5)
			},
			//解锁下一关
			unlock: function() {
				var self = this
				that.setgame_state(4)		
			},
		}
		result[upgradeOrPass]()
	},
//	//设置列表数据
//	if(app.data.bmsControl.red) {
//		
//	}
	setLoop: function() {
		var that = this
		var result = 0
		if(app.data.bmsControl.red) {
			result = 1
		}
//		that.setData({
//			looptype: result,
//			background: content.setLoopList(result),
//		})
		
		var that = this
        //请求接口并设置到data数据里面（注意：这里需要你去请求接口）
        //getApi(function(res) {
        //回调里面去设置数据，并调用接口
        that.setData({
        	looptype: result,
            Winners_List: content.setLoopList(result)
        })
        //调用radio_box方法
        that.radio_box() 
	},
	
	//////////////////////////////////
	//19.2.28新增——打开的时候，去开启定时器。否则关闭定时器（设置广告顺序抖动）
	openInter: function(code) {
		var that = this
		if(code == 2 || code == 3 ||  code == 4) {
	    	//		/11.27新增，显示广告，在闯关模式结束后，弹窗出现后出现
			that.setInter(6)
	   } else {
	   		//		/11.27新增，显示广告，在闯关模式结束后，弹窗出现后出现
			that.clearTimer()
	   }
	},
	//开始定时器
    setInter(len) {
    	var that = this
    	var i = 0
    	that.clearTimer()
    	
    	that.timer = setInterval(function() {
//  		log('-开启定时器-')
    		i++
    		if(i > len) {
    			i = 0
    		}
    		that.setData({
    			showIndex: i,
    		})
    	}, 500)
    },
    //关闭定时器
    clearTimer() {
    	var that = this
    	if(that.timer) {
    		log('-关闭定时器-')
    		clearInterval(that.timer)
    	}
    },
	///////////////////////////////////////////
	//测试数据
	inputTitle: function (e) {
	    this.setData({
	      title: e.detail.value
	    })
	 },
	  save: function (e) {
	  	var that = this
	    var title = this.data.title;
	    title = Number(title)
	    //2.获取本地数据
		that.aboutPassNum.setPassNum(title)
	  }
}


module.exports = result