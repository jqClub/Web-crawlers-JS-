//获取应用实例
var app = getApp()
let swan = wx 

var	uesr_erro_num = 0

var page = undefined;
var doommList = [];
var danmu_Timeout;
var danmu_num = 0;
var doomm_danmu_Timeout = 0;
class Doomm {
    constructor(text, top, time) {
        this.text = text;
        this.top = top;
        this.time = time;
        let that = this;
        doomm_danmu_Timeout = setTimeout(function() {
            doommList.splice(doommList.indexOf(that), 1); //动画完成，从列表中移除这项
            page.setData({
                doommData: doommList
            })
        }, this.time * 1000) //定时器动画完成后执行。
    }
}

var util = require("../../utils/util.js")  //版本控制相关

 //10.15新增缓存内容
var wcache = require("../../utils/wcache.js") 

var log = console.log.bind(console)

//11.06新增//关于微信授权的获取
var getWx = require("../../utils/getWx.js")

//11.06新增引入ajax请求
var wxRequest = require("../../utils/wxRequest.js")

var innerAudioContext

//11.14新增，使用2个innerAudioContext
var innerAudioContext1

//11.09新增一个定时器，去判断进入的时间
var enterTimer

//12.11修改，播放音乐的问题，ios的使用这个方式去播放
var backgroundAudioManager = swan.getBackgroundAudioManager();

//ip屏蔽功能
import getShowYouDaoNew from '../../utils/getShowYouDaoNew.js'

//其他页面js文件
var index_other = require("./index_other.js")  //08.17其他位置


//11.22api接口数据
import apiAsk from '../../utils/apiAsk'

var content = require("../../utils/content.js")  //版本控制相关

import VideoAdHelper from '../../scripts/videoAdHelper'

import InterstitialAd from '../../utils/InterstitialAd'  //插屏广告

var pageParameter = {
//Page({
	data: {
		pageName: 'index',
		index: 'index',
		userInfo: '',
		//登录提示
		initial_show: false,
		//请求返回信息
		indexdl:'',
		is_qiuzhutishi:true,
		is_coufen	: false,
		is_share_reward_two : false,
		//题目
		subject: '',
		//答题信息
		save_record:'',
		DoubtShow: false,
		button_list: [], //按钮
		danmuShow: 0,
		doommData: [],
		money: 0,
		input_list: [], //答题按钮
		subject: {},
		style: false,  //是否转动
		initialPassMsg: {}, // 进入关卡的初始信息， 重设的时候用
		insufficient: false, //提示分数不够
		error: false, //答题错误提示
		game_state: 0,
		//09.20按钮按原来的显示
		newUserGuide: true,
		//09.26断网判断处理
		nonet: false,
		//11.05是否有点击过
		hasClick: false,
		//11.09新增，是否显示签到的弹窗
		showSign: false,
		//用户是否已签到过
		today_sign: 0,
		//11.09新增提示信息
		hintData: {
			time: 20000,
			//1.音符≥30，【提示按钮】提示 “喵鹰鹰：不懂可以使用提示喔”
//			2.音符＜30时，【分享按钮】提示 “喵鹰鹰：分享获得音符，既可使用提示啦”
//			3.分享已达上限，【每日领音符】提示“喵鹰鹰：每日签到，即可领取音符得提示”
			hintStyle: 0,
		},
		//11.12新增用户的世界排名
		userPos: 0,
		//用户的世界排名，是否增加或减少了
		worldRankStyle: '',
		
		//11.23新增，显示广告在底部（正确的弹窗）
		endList: false,
		
		//11.30是否显示过需要登录app的弹窗（本地存储）
		showLoginPop: 0,
		
		//12.18新增，需要扣除的音符数量
		needNum: 50,
		
		//19.1.28新增跳转链接
		appLists: [
			//语音
			{
				img: 'https://static.zuiqiangyingyu.cn/wb_webview/shuangshuangIMG/clickLingqu.gif',
				appKey: 'N220ccbtxFv72vsK84TzXiAvjIK4TIxW',
				path: 'pages/pay/pay',
			},
//			//拼图
			{
				img: 'https://static.zuiqiangyingyu.cn/wb_webview/shuangshuangIMG/clickLingqu.gif',
				appKey: 'U2Cuw3kaO5nKsD61MQ4NjlKre5e6mzCU',
				path: 'pages/userMatching/userMatching',
			},
		],
		//随机显示一个
		chooseApp: {
			img: 'https://static.zuiqiangyingyu.cn/wb_webview/shuangshuangIMG/clickLingqu.gif',
			appKey: 'N220ccbtxFv72vsK84TzXiAvjIK4TIxW',
			path: 'pages/pay/pay',
		},
		//是否显示广告
		showAd: {},
		//每隔多少题去刷新广告
		bannerTime: 3,
				
		//第多少题后出现广告
		showAdLast: 3,
		
		//新增一条广告去处理
		adType: 0,
		
//		//19.2.13新增，切换广告的id
//		apids: [6052105, 6052496, 6052503],
		
		
        //12.21新增广告列表
        bmsAdData: {},
        //用来控制显示图片和按钮等
        loopControl: {
        	showContent: false,
        },
        //所有轮播的列表数据
        background: [1, 2, 3, 4, 6, 7, 8, 9, 10],
        //所有的音频文件
        musics: {
        	anser_click: 'https://static.zuiqiangyingyu.cn/wb_webview/baidu_program/music/anser_click.mp3',
        	answer_win: 'https://static.zuiqiangyingyu.cn/wb_webview/baidu_program/music/answer_win.mp3',
        	answer_wrong: 'https://static.zuiqiangyingyu.cn/wb_webview/baidu_program/music/answer_wrong.mp3',
        	energy_kouchu: 'https://static.zuiqiangyingyu.cn/wb_webview/baidu_program/music/energy_kouchu.mp3',
        	get_red: 'https://static.zuiqiangyingyu.cn/wb_webview/baidu_program/music/get_red.mp3',
        	open_libao: 'https://static.zuiqiangyingyu.cn/wb_webview/baidu_program/music/open_libao.mp3',
        	libao: 'https://static.zuiqiangyingyu.cn/wb_webview/baidu_program/music/libao.mp3',
        	open_red: 'https://static.zuiqiangyingyu.cn/wb_webview/baidu_program/music/open_red.mp3',
        	other_click: 'https://static.zuiqiangyingyu.cn/wb_webview/baidu_program/music/other_click.mp3',
        },
        
        
        vertical: true,  //滑动方向是否为纵向
	    autoplay: true,  //是否自动切换
	    circular: true,  //是否采用衔接滑动
	    interval: 3000,  //自动切换时间间隔
	    duration: 500,  //动画时长
	    
	    bmsControl: {
	    		sound:  1,
		    	banner: 1,
		    	banner_result: 1,
		    	banner_touch:1,
	    },
},
	onLoad(options) {
		console.log('song options', options)
		var that = this
		page = this
		that.setData({
			options				: options || {},
			userInfo			: app.data.userInfo || {},
			//用户增加的音符数量
			addYnfu: app.data.addYnfu,
			
			//11.30新增，用户当前是否有登录app
			loginApp: app.data.loginApp,
			//设置是否测试
			trialData: app.data.trialData,
		})
		
				//注册函数,判断是否是函数
		if(typeof that.aboutPassNum == 'function') {
			that.aboutPassNum()
		}
		if(typeof that.saveLocalUser == 'function') {
			that.saveLocalUser()
		}
		//首次进入的话，直接获取本地数据，不要重复请求，题目数会乱
		that.openFirst()
		
		that.onLoadFun()
		////	//测试函数
		that.testFun()
		
		
		//19.8.6新增广告
    this.pickVideoAd = new VideoAdHelper({
      needToLookAdCount: 1,
      storageName: 'pickSuccessCount',
      adUnitId: 'ae5d019ba31792cb57024bf19f7f4e89',
      showModalContent: '看15秒广告，今日可无限次查看答案~',
    })
    
    getApp().$appList.setList((res) => {
    		log(99999, res)
        this.setData({
            appList : res
        })
    })
    
    try{
    		this.insertAd = new InterstitialAd(getApp().data.interstitialAdId)
    }catch(e){}
	},
	//12.12把部分请求放到onready里面
	onReady: function() {
		var that = this
		that.onReadyFirst()

		var getSystemInfo = app.data.getSystemInfo || {}
		if(getSystemInfo.windowHeight < 700) {
			that.setData({
				smallScreen: true,
			})
		}
	},

	//onShow加载
	onShow() {
		var that = this
		return
		//11.27新增，去除loading的动画，防止登录后，还是会出现这个
		app.loading.hide()
		
		//11.07修改减少判断的长度
		let token = app.data.userInfo.token
		if(token) {
			//06.08新增首先获取的
			that.getFirst()
			
			//11.07加一个是否需要更新indexdl的函数（重新请求的index接口）
			that.updataIndexdl()
		} else {
		}
		
		//11.2新增，再其他页面的时候（已经连接上网络了），所以这里需要关闭弹窗
		if(app.data.isNet) {
			that.setData({
				network: false,
			})
		}
	},

	//onShow加载
	onHide() {
		var that = this;	
		log('--onHide函数--')
//		//关闭音乐
		that.stopVideo();

		//11.13新增，清空打印的信息
		that.clearTime()
	},

	onUnload: function() {
		var that = this;
		// 页面关闭
		console.log('onUnload');
		//关闭音乐
		that.stopVideo();
		
//		//11.09新增
		innerAudioContext.destroy();
		
		//11.14新增
		innerAudioContext1.destroy();
		
		//11.13新增，清空打印的信息
		that.clearTime()
		
		//取消定时器
    clearTimeout(danmu_Timeout);
	},


	////////////////////////////////////////////////////
	/////登录
	//06.08新增首先获取的
	getFirst: function() {
		var that = this
	},

	//监听登录事件
	onlogin : function(e){
		var that = this ;
		that.setData({
			userInfo: app.data.userInfo,
			initial_show: false,
//			hasAccredit: true, //是否有授权
			hasAccredit: app.data.hasAccredit ||false,
		})
//		app.data.hasAccredit = true
		
		var onLoginStyle = that.data.onLoginStyle
		if(onLoginStyle == 'rank_new') {
			//11.16新增判断，是点击的按钮，就直接进去页面
			that.onloginOther()
			return
		}
		
		//只取一次的接口
		that.onReadyLogin()
		
		//06.08新增首先获取的
		that.getFirst()
	},
	//11.16新增判断，是点击的按钮，就直接进去页面
	onloginOther: function() {
		var that = this ;
		//说明需要去处理回调函数
		app.bindViewTap_three('rank_new','','',that.data.index);
		
		//设置onLoginStyle为空
		that.setData({
			onLoginStyle: '',
		})
	},	
	//11.16新增关闭登陆的弹窗
	on_close_login: function(e){
		var that = this ;
		//关闭登陆的弹窗
		that.setData({
			initial_show: false
		})
	},
	//重新授权
	get_grant_again: function() {
		var that = this;
//		方法3，直接显示登录的按钮--使用这个方法，直接登录完后，直接开始题目
		that.setData({
			initial_show: true
		})
		log('-------------------------')
	},
	
	//11.30新增一个下拉刷新的功能
	onPullDownRefresh: function() {
		var that = this
		//下拉刷新功能
		that.onLoadFun()
		that.onReadyFirst()
		
		setTimeout(function() {
			swan.stopPullDownRefresh()
		}, 1000)
	},
	////////////////////////////////////////////////////
	///分享信息
	onShareAppMessage: function(e) {
		var that = this;
		return {
			title: "快来做猜歌达人，现金等你来拿",
      path: "/pages/index/index",
      success: function(t) {},
      fail: function(t) {}
		}
	},
	//成功后的分享处理
	challenge_end : function(let_path, type) {
	},
	// 10.30新增获取分享的类型
	getShareType : function(e) {
		var that = this
		//默认是右上角的分享按钮
		let type = 'menu'
		let shareFrom = e.from
		
		if(shareFrom.from == 'button') {
			//说明是普通的分享按钮
			type = shareFrom.target.currentTarget.dataset.type
		}
		return type
	},
	//通关的提示
	toCustoms: function() {
		var that = this
		app.showToastNew('您已通关')
	},
	//提交答案
	SAVE_RECORD: function(style,type) {
		var that = this,
			warp = {
				isWarp: true,
				state: 2
			};
//			share = that.data.share;
		var	let_data = {
				answer		: that.data.subject.answer.name,
				wechat_type	: 'wechat_song',
				token		: app.data.userInfo.token,
				user_id		: app.data.userInfo.user_id,
				sid			: that.data.subject.id,
		};
		if( style == 3) { let_data.answer = '错误';}
		swan.request({
			url: app.data.API.SAVE_RECORD,
			data: let_data,
			header: {'content-type': 'application/json'},
			success: function(res) {
				log('SAVE_RECORD', res.data)
				if(res.data.c == '0') {
					///处理帮助回答过的
					try{
						//判断已经回答过
						if( res.data.m ){
							if( res.data.m.indexOf('已经回答') > 0) {
								console.log( res.data.m )
//								that.setData({is_helpold:  true,tips_msg : res.data.m})
								return
							}
						}
						//判断回答错误
						if( res.data.m ){
							if( res.data.m.indexOf('错误') > 0) {
								console.log( res.data.m )
								return
							}
						}
					}catch(e){}

					var data = res.data.d;

					if( style != 3) {
						that.succeedFun('add', data)
					}

					//加分
					that.setData({
						'user_msg.add_score'	: data.user.add_score,
						save_record	:	data,
					});

					
					//08.30新增
					let pass_next = data.user.pass_next
				}else{
					try {
						if(res.data.c == '500') {
							//报错了，直接返回
							var dayn = `${JSON.stringify(let_data)},${JSON.stringify(res)},${JSON.stringify(res.data.m)}`
							app.showModalNew(dayn)
							return
						} else if(res.data.c == '4') {
//							//需要重新登录
							that.get_grant_again();
						} else {
							//09.03直接返回错误
							app.showModalNew(res.data.c+res.data.m)
						}
						console.log( "错误 " + 'SAVE_RECORD' + res.data.m , res , let_data );
					} catch(err){
						app.showModalNew(err.message)
					}
				}

			},
			//11.30新增，请求的判断
			fail: function(e) {
				app.reQequestFail(that, e)
			},
		})
	},
	//////////////////////////////////////////////////////
	//////操作
	//19.2.11新增，每隔多少题，去刷新请求广告
	getNewAd: function(passNow) {
		var that = this
		var bannerTime = that.data.bannerTime
		log('切换广告当前题', passNow)
		log('切换广告间隔', bannerTime)
		passNow = passNow - (that.data.showAdLast + 1)
		//这里也加上1,因为是间隔
		bannerTime = bannerTime + 1

		var multiple = passNow % bannerTime
		log(`${passNow}是${bannerTime}的${multiple}倍`)
		if(multiple == 0) {
			log('到题目数量了, 去切换广告')
			//切换广告
			that.showNewAd()
		}
	},

	//从 题库列表 导入 题目
	import_subject: function(res) {
		console.info('从 题库列表 导入 题目', res)
		var that = this,
			//更新数据
			button_list = [],
			wordsList = res.words,
			input_list = [];
		//列出选择按钮
		for(var i = 0; i < wordsList.length; i++) {
			button_list[i] = {
				state: 1,
				targeid: i,
				code: wordsList[i]
			}
		}
		//创建空答题框
		for(var i = 0; i < res.num_answer; i++) {
			input_list[i] = {
				state: '',
				targeid: '',
				code: ''
			}
		}

		//控制器
		var subject = {
			answer: {
				name: res.answer,
				length: res.num_answer,
			},
			input_length		: 0,
			delete_targe		: [],
		}
		//19.2.21处理数据
		subject = Object.assign(subject, res)
		subject.answer = {
			name: res.answer,
			length: res.num_answer,
		}
		log('button_list', button_list)
		log('input_list', input_list)

		//预设信息
		var initialPassMsg = {
			button_list: button_list,
			input_list: input_list,
			subject: subject,
		}
//11.20新增，不存在本地里面，直接保存在这里
		var oldInitialPassMsg = JSON.parse(JSON.stringify(initialPassMsg))

		//存入当前库中
		that.setData({
			subject					: subject,
			button_list				: button_list,
			input_list				: input_list,
			//11.20新增，不存在本地里面
			oldInitialPassMsg : oldInitialPassMsg,
		})

		that.playMusic()
	},
	//////////////////
		/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//	audioPlayClick: function(playType) {
//		var that = this
//		
//		if(!app.data.bmsControl.sound) {
//			return
//		}
//		
//		var musics = that.data.musics
//		var let_url = musics[playType]
//		if(!let_url) {
//			return 
//		}
////		var innerAudioContext = swan.createInnerAudioContext();
//		//11.14修改
//		if(innerAudioContext) {
//			//如果已经有了,不去设置
//			innerAudioContext.destroy()
//			//在这里去获取createInnerAudioContext音频
//			innerAudioContext = swan.createInnerAudioContext()
//		} else {
//			//在这里去获取createInnerAudioContext音频
//			innerAudioContext = swan.createInnerAudioContext()
//		}
//		innerAudioContext.src = let_url;
//		innerAudioContext.autoplay = true;
//		innerAudioContext.obeyMuteSwitch = false	
//		innerAudioContext.play()
//	},
	//////////////////////////////////////////
	//11.14新增,使用innerAudioContext
	audioPlay: function(playType) {
		var that = this
		if(!app.data.bmsControl.sound) {
			return
		}
		
		try{
			that.insertAd.show()
  		}catch(e){
  			
  		}

		var musics = that.data.musics
		var let_url = musics[playType]
		if(!let_url) {
			return
		}
		
//		//11.20这里先去处理下,如果有就直接去播放,不用去删除了(iOs和安卓的处理不同)--ios上用不了
//		var system_str = app.data.getSystemInfo.system_str
//
////		//12.11修改,因为在ios会卡,所以使用下面的去播放点击的音效
//		if(system_str == 'ios') {
//			if(!backgroundAudioManager) {
//				backgroundAudioManager = swan.getBackgroundAudioManager();
//			}
//			backgroundAudioManager.title = '此时此刻';
//			backgroundAudioManager.epname = '此时此刻';
//			backgroundAudioManager.singer = '许巍';
//			backgroundAudioManager.coverImgUrl = 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000';
//			
////			backgroundAudioManager.src = let_url;
////			//12.11修改,如果是有,就不用去设置新的了
//			if(!backgroundAudioManager.src) {
//				backgroundAudioManager.src = let_url;
//			}
//			backgroundAudioManager.play()
//			return
//		}

//		if(innerAudioContext && system_str != 'ios') {
//			var oldSrc = innerAudioContext.src
//			if(oldSrc == let_url) {
//				innerAudioContext.play()
//				return
//			}
//		}
		
		//11.14试试先去销毁,再去设置
		that.destroyInnerAudioContext()
		innerAudioContext.src = let_url
		innerAudioContext.autoplay = true
		innerAudioContext.obeyMuteSwitch = false	
		innerAudioContext.play()
  	},
	audioPlayNew: function(playType, time) {
		var that = this
		time = time || 100 

		setTimeout(function() {
			that.audioPlay(playType)
		}, time)
	},
	/////////////////////////////////
	//11.14新增,在使用的时候,先去销毁这个试试
	destroyInnerAudioContext: function() {
		var that = this
		//11.14修改
		if(innerAudioContext) {
			//如果已经有了,不去设置
			innerAudioContext.destroy()
			//在这里去获取createInnerAudioContext音频
			innerAudioContext = swan.createInnerAudioContext()
		} else {
			//在这里去获取createInnerAudioContext音频
			innerAudioContext = swan.createInnerAudioContext()
		}		
	},
	destroyInnerAudioContext1: function() {
		var that = this
				//11.14修改
		if(innerAudioContext1) {
//			如果已经有了,不去设置
       innerAudioContext1.destroy()
		} else {}
		
		//在这里去获取createInnerAudioContext音频
        innerAudioContext1 = swan.createInnerAudioContext()

        innerAudioContext1.onPlay(() => {
          console.log('开始播放')
          setTimeout(function() {
          	 //设置播放状态
            that.setData({
                style: true
            })
          }, 500)
          
          //设置播放状态
            that.setData({
                style: true
            })
        })
        innerAudioContext1.onEnded(() => {
          console.log('自然停止')
          	//设置播放状态
            that.setData({
                style: false
            })
        })
        innerAudioContext1.onPause(() => {
          console.log('暂停了')
          //设置播放状态
            that.setData({
                style: false
            })
        })
	},
	/////////////////////////////////
		//07.19修改，处理音频状态
	dealVideo: function() {
		var that = this
		//获取当前的播放状态
		var videoStyle = that.data.style
		//如果是播放，那就暂停，否则重新开始播放
		if(videoStyle) {
			that.stopVideo()
		} else {
			this.playMusic()
		}
	},
	playMusic() {
		var that = this
		//11.14试试先销毁,再去使用
			that.destroyInnerAudioContext1()
			innerAudioContext1.src = that.data.subject.question
			innerAudioContext1.autoplay = true
			innerAudioContext1.obeyMuteSwitch = false
			innerAudioContext1.play()
	},

	//暂停
	stopVideo: function() {
		var that = this;
//		//11.14修改,先只暂停
		if(innerAudioContext1) {
			//11.14修改,先只暂停
			innerAudioContext1.pause()
		}
		
		//设置播放状态
		that.setData({
			style: false
		})
	},

	/////////////////////////////////////////
	//功能


	////////////////////////////////////////
	///猜歌操作

	//点击字消失
	click_button: function(e) {
		var that = this	
		
		var targe_id = e.target.dataset.index
			
		that.clickGoto(targe_id)
		that.audioPlay('anser_click')
	},
	//去下一首歌
	toNext: function() {
		var that = this;
		log('--进入下一题--')
		
		//06.25新增处理预警群里的bug
//		try{
			if( that.data.user_msg.total_pass ==  app.data.userInfo.pass  ) {
				that.toCustoms()
				//通关跳转
	//			app.bindViewTap_three('clearance','?type=share&uid2=' + that.data.userInfo.user_id + '&pass=' + that.data.subject.pass + '&nickName=' + that.data.userInfo.nickName,'',that.data.index)
	//			return
			}
			
			//在当前的
			that.aboutPassNum.changePass(1)
	},

	////////////////////////////////////////////////////
	/////收到提示

	///收到提示 模拟点击字块
	get_prompt: function(promptmsg) {

		console.info(promptmsg)
		var that = this,
			button_list = {},
			answer = that.data.subject.answer.name,
			old_x;

		//重设 输入框
		that.delete_data();

		//button_list
		button_list = that.data.button_list;
		
		log('-get_prompt-', promptmsg.length, button_list.length)

		//遍历所有字
		var let_num=0;
		//遍历所有提示
		for(var x = 0; x < promptmsg.length; x++) {
			for(var i = 0; i < button_list.length; i++) {
				//如果是已经选过的,跳过
				if(button_list[i].state == 0) {
					continue
				}
				
				if(promptmsg[x] == button_list[i].code && x != old_x) {
					let_num = let_num-0+1
					old_x = x;
					var targe_id = i,
						//记录button_list targe
						button_obj = button_list[targe_id],
						button_str = 'button_list[' + targe_id + ']',
						//获得控制器
						subject = that.data.subject;

					if(subject.input_length < subject.answer.length) {
						//input_list
						var input_list = that.data.input_list,
							//提示倒叙显示
							input_targe = subject.answer.length - 1 - subject.input_length,

							//记录input_list targe
							input_obj = input_list[input_targe],
							input_str = 'input_list[' + input_targe + ']';

						//改变 input_list targe属性
						input_obj = {
							state: 1,
							targeid: button_obj.targeid,
							code: button_obj.code
						};

						//改变 button_list targe属性
						button_obj.state = 0;
						
//						--------------------------
						//11.20修改设置方式
						var len = subject.input_length
						len += 1
						var str = 'subject.input_length';
						that.setData({
					      [str]: len,
					    })
		
						if(subject.delete_targe.length != 0) {
							subject.delete_targe = subject.delete_targe.splice(1, subject.delete_targe.length);
						}
						
						//11.20修改设置方式
						var str1 = 'subject.delete_targe';
					    that.setData({
					      [str1]: subject.delete_targe,
					    })
//						--------------------------

//						console.log('预设数据 initialPassMsg 1',JSON.stringify(that.data.initialPassMsg.input_list))
						//更新数据
						that.setData({
							[button_str]: button_obj,
							[input_str]: input_obj,
//							subject: subject
						})
//						console.log('预设数据 initialPassMsg 2 ',JSON.stringify(that.data.initialPassMsg.input_list))

						if(subject.input_length == subject.answer.length) {
							//对比答案
							that.contrast_answer();
						}

					} else {
						console.log('满了')
					}

				}
			}
		}
		console.log('找到--',let_num,'个字');
		if( let_num < 1 ){
			that.INDEXDL()
		}
	},


	///重设
	delete_data: function(e) {
		var that = this;
		
		//19.2.27新增音效
  		that.audioPlay('other_click')
		
		//11.20,不使用本地文件,直接保存
		var oldInitialPassMsg = that.data.oldInitialPassMsg || {}
		var initialPassMsg = JSON.parse(JSON.stringify(oldInitialPassMsg))	
		
		console.log('-点击了重设按钮-')

		//11.20新增,先去判断是否相等,再去设置新的值
		var button_list = that.data.button_list 
		var input_list = that.data.input_list
		var subject = that.data.subject
		var isError = that.data.error
		
		var old_button_list = initialPassMsg.button_list
		var old_input_list = initialPassMsg.input_list
		var old_subject = initialPassMsg.subject
		
		if(!util.isEquals(button_list, old_button_list)) {
			that.setData({
				button_list: old_button_list || [],
			})
		}
		if(!util.isEquals(input_list, old_input_list)) {
			that.setData({
				input_list: old_input_list || [],
			})
		}
		if(!util.isEquals(subject, old_subject)) {
			that.setData({
				subject: old_subject || [],
			})
		}
		that.setData({
			error: false
		})
	},

	//点击输入框删除
	click_input: function(e) {
		var that = this;

		var targe_id = e.target.dataset.index;
		
		//input_list
		var input_list = that.data.input_list;
		//记录input_list targe
		var input_obj = input_list[targe_id];
		var input_str = 'input_list[' + targe_id + ']';
		//button_list
		var button_list = that.data.button_list;
		//记录button_list targe

		var targe_obj = button_list[input_obj.targeid];
		var targe_str = 'button_list[' + input_obj.targeid + ']',
			//获得控制器
			subject = that.data.subject;

		console.info(targe_id, input_obj, targe_obj)
		try{
			if(input_obj.state) {
				//改变targe属性
				input_obj = {
					state: '',
					targeid: '',
					code: ''
				};
				//改变 button_list targe属性
				targe_obj.state = 1;
				//						--------------------------
					//11.20修改设置方式
					var len = subject.input_length
					len -= 1
					var str = 'subject.input_length';
					that.setData({
				      	[str]: len,
				      
				      	[targe_str]: targe_obj,
						[input_str]: input_obj,
						error: false,
				   })
//						--------------------------
				that.audioPlay('other_click')
			} else {
				console.log('空的')
			}
		} catch(err){
			app.showModalNew(err.message)
		}
	},

	//判断答案
	contrast_answer: function(e) {
		var that = this,
//			share = that.data.share,
			input_list = that.data.input_list,
			input_text = '',
			subject = that.data.subject;

		that.setData({
			error: false
		})

		for(var i = 0; i < input_list.length; i++) {
			input_text += input_list[i].code;
		}

		console.log(subject.answer.name, input_text)

		if(subject.answer.name == input_text) {
			console.log('答对了');
			uesr_erro_num = 0;

			that.audioPlayNew('answer_win')
			
			setTimeout(function() {
				//成功的函数
				that.succeedFun()
			}, 500)
			
		} else {
			console.log('答错了');
			
			that.audioPlayNew('answer_wrong')
			
			setTimeout(function() {
				that.setgame_state(3)
			}, 500)
	}
		//暂停音乐
			that.stopVideo()
	},


	///加分动画
	num_animation : function(f_num,l_num,time,targrname){
		var that = this;
		var set_time = time ? time : 20;
		f_num = f_num-0; l_num = l_num-0;
//		console.log(f_num,l_num)
		if( f_num != l_num ){
			f_num = f_num-0 < l_num-0 ? f_num+1 : f_num-1 ;
//			set_time = set_time-1;
			that.setData({[targrname]:f_num})
			setTimeout(function(){
				that.num_animation(f_num,l_num,set_time,targrname)
			},set_time)
		}else{
//			console.log("bingo")
			that.setData({ is_share_reward_two:true })
			setTimeout(function(){
				that.setData({ is_share_reward_two:false  })
			},200)
		}
	},

	//////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////


	//页面跳转 3
	bindViewTap_three: function(e) {
		var that = this;
//		//11.12加上一个频率控制---在app.bindViewTap_three函数里有,有控制,所以不用去设置了
//		if( app.gettimestamp() - app.data.function_time < app.data.frequency ){return}
//		app.data.function_time = app.gettimestamp();
		
		
		//获得临时对象
		var targe_id = e.target.dataset.targe;
		var data = e.target.dataset.data;
		var type = e.target.dataset.type;


		app.bindViewTap_three(targe_id,data,type,that.data.index)
	},
	////////////////////////////////
	///////////////////////////////
	//设置状态
	setgame_state : function(code){
	    var that = this ;
	    try{code = code.target.dataset.code? code.target.dataset.code : code;   }catch(e){}
	    that.setData({game_state    :   code,})
	    
	    
	    if(code == 2 || code == 3) {
	    	//		/11.27新增，显示广告，在闯关模式结束后，弹窗出现后出现
			that.aboutAd.showEndAd(that)
	    }
	    
	    //打开的时候，去开启定时器。否则关闭定时器
	    that.openInter(code)
	},
	 clickGoto : function(targe_id) {
		var that = this

			try{
				//		console.info('点击字消失----')
				var that = this
	
				var button_list = that.data.button_list
				//记录button_list targe
				var targe_obj = button_list[targe_id]
				var targe_str = 'button_list[' + targe_id + ']'
				//获得控制器
				var subject = that.data.subject || []
				var answerLg = subject.answer.length
	
				//console.log( targe_obj );
				if(subject.input_length == answerLg) {
					return
				}

				if(subject.input_length < answerLg) {
	
					//重新排序
					subject.delete_targe = subject.delete_targe.sort();
	
					//input_list
					var input_list = that.data.input_list;
					var input_targe;
	
					//由0-3检查哪个是空的，优先填最前的
	
					//			console.info('检查哪个是空的，优先填最前的')
					var let_off = 1;
					for(var i = 0; i < answerLg; i++) {
						if(!input_list[i].code && let_off == 1) {
							input_targe = i;
							let_off = 0;
							
							//11.20新增,一个结束
							break
						}
					}
	
					//记录input_list targe
					var input_obj = input_list[input_targe];
					var input_str = 'input_list[' + input_targe + ']';
					//改变 input_list targe属性
					input_obj = {
						state: 1,
						targeid: targe_id,
						code: targe_obj.code
					};
		//			console.log(input_obj, input_str)
	
					//改变 button_list targe属性
					targe_obj.state = 0;
					//改变 input 长度
//					subject.input_length += 1;

					//11.20修改设置方式
					var len = subject.input_length
					len += 1
					var str = 'subject.input_length';
					that.setData({
				      [str]: len,
				    })
	
					if(subject.delete_targe.length != 0) {
						subject.delete_targe = subject.delete_targe.splice(1, subject.delete_targe.length);
					}
					
					//11.20修改设置方式
					var str1 = 'subject.delete_targe';
				    that.setData({
				      [str1]: subject.delete_targe,
				    })
	
					//更新数据
					that.setData({
						[targe_str]: targe_obj,
						[input_str]: input_obj,
//						subject: subject,  //10.20修改,去掉这个设置,减少内存
					})
					let_off = 1
					
					if(subject.input_length == answerLg) {
						//对比答案
						that.contrast_answer();

					} else {
					}
				} else {
					console.log('满了')
				}
			} catch(err){
				app.showModalNew(err.message)
			}
	},
	//10.31新增分享的数据
	onReadyLogin : function() {
		var that = this
		///首次进入 查询题目
		log('getFirst_INDEXDL', that.data.options)
		that.INDEXDL(that.data.options); 	
    	
    	//19.2.19出现宝箱后,不再出现宝箱(注册函数)
    	that.setLocalGrade()
	},
	//11.2新增新增弱网判断
	v_goback: function() {
		var that = this
//		net.v_goback(that)
	},
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
	//4.找到所有的index
	findIndex : function(arr1, words) {
		var that = this
		var result = {}
		var allIndex = []
		for(var i = 0; i < arr1.length; i++) {
			var a = arr1[i]
			var value = words.indexOf(a)
			result[value] = a
			allIndex.push(value)
		}
		that.setData({
			answerObj: result
		})
		return allIndex
	},
	//根据答案，去写一个数组，包含index
	setNuwuser : function(pass, list) {
		var that = this
		log('第几关', pass)
		if(pass != 1) {
			//说明不是第一关，不显示手指引导点击
			//已经点击过按钮
			that.setHasClick()
			return
		}
		if(that.data.hasClick) {
			return
		}
		
		
//		var query_idiom = that.data.query_idiom[0]
		var query_idiom = list[0]
		
		//1.得到答案
		var answer = query_idiom.answer || []
		var len = answer.length
		//2.得到答案的字符串数组
		var arr1 = answer.slice('')
		//3.得到所有的选项
		var words = query_idiom.words
		//4.找到所有的index
		var allIndex = that.findIndex(arr1, words)
		that.setData({
			allIndex,
			answerAll: arr1,
		})
		//设置只取第一个
		that.showDaan()
	},
	//只取第一个
	showDaan : function() {
		var that = this
	
		var allIndex = that.data.allIndex
//		log(2222, allIndex)
		var indexNow = allIndex.splice(0, 1)[0]
//		log(1111, allIndex)
		//设置数组
		that.setData({
			indexNow,
		})
	},
	//是否有点击过按钮
	setHasClick: function() {
		var that = this
		var hasClick = that.data.hasClick
		if(hasClick) {
			return
		}
		wcache.put('hasClick', true)
		that.setData({
			hasClick: true
		})
	},
	/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
	//////////////////////////////////////////
	//点击排行榜，提示授权的弹窗
	//10.09新增公用的点击事件
  clickAll: function(e) {
  	var that = this
  	
  	try{
  			that.insertAd.show()
  		}catch(e){
  			
  		}
  	
  	var clickType = e.target.dataset.clicktype
  	log('点击的事件名称', clickType)
  	that.clickEvent(clickType)
  	
  	//11.09操作后,就不去显示提示信息了
  	that.clearTime()
  	
  	//19.2.27新增音效
  	that.audioPlay('other_click')
  },
  clickEvent: function(clickType) {
  	var that = this
  	if(!clickType) {
  		return
  	}
  	var events = {  	
	  	//19.2.21新增,查看答案
	  	lookAnswer: function() {
	  		//bms控制
	  		if(!that.data.bmsControl.energy) {
	  			//	  		//显示正确答案
	  			that.setgame_state(1)
	  			return
	  		}
	  		
	  		that.LOOK_ANSWER(function() {
	  			//设置用户的值
				app.setUser(that)
	  			//	  		//显示正确答案
	  			that.setgame_state(1)
	  		})
	  	},
	  	//打开分享界面
	  	openShare: function() {
	  		var self = this
	  		log('打开分享界面')
	  		var result = {
  				success: function() {
  					log('分享成功了')
  				},
  			}
  			//打开分享的界面
  			app.openShare(result)
	  	},
	  	//重新回答当前题目
	  	reset: function() {
	  		that.aboutPassNum.changePass(0)
	  	},
	  	//跳过当前题目
	  	skip_game: function() {
	  		log('跳过当前题目')
	  		var self = this
	  		//bms控制
	  		if(!that.data.bmsControl.energy) {
	  			//	  		//显示正确答案
	  			that.toNext()
	  			return
	  		}
	  		
	  		that.LOOK_ANSWER(function() {
	  			//设置用户的值
				app.setUser(that)
	  			//	  		//显示正确答案
	  			that.toNext()
	  		})
	  	},
	  	//打开投诉界面
	  	complaint: function() {
	  		//说明是游客模式
			app.bindViewTap_three('report','','','');
	  	},
	  	openCustoms: function() {
	  		//打开关卡模式
	  		that.customs()
	  	},
	  	//打开能量值
	  	showPower: function() {
//	  		//打开能量弹窗
//	  		that.setgame_state(7)
			//		//11.5新增下雨组件
			that.power = that.selectComponent('#power');
			//获取本地数据，打开时候去设置
			that.power.firstSet(that)
		},
	  	close: function() {
	  		//关闭弹窗
	  		that.setgame_state(0)
	  	},
	  	
	  	//测试数据
	  	clear: function() {
	  		//清空数据
	  		wcache.clear()

	  		//设置当前的题目数量
			that.setData({
				passNum: 1,
			})
			//直接去请求下一题题目
			that.INDEXDL()
	  	},
	  	//查看余额
	  	lookBalance: function() {
	  		var self = this
//	  		如果没有余额就显示出来
	  		if(!that.data.userInfo.balance) {
	  			//如果没有点击过
	  			that.showRed(1, true)
	  			
//	  			//		//11.05点击就去设置本地缓存，否则还可以点击
//				that.setHasClick()
	  			return 
	  		}

			//打开余额界面
	  		that.showRed(6)
	  	},
	  	
	  	//打开红包
	  	openred: function() {
	  		that.showResult(1)
	  	},
	  	openlibao: function() {
	  		that.showResult(2)
	  	},
	  }
  	
	  	if(typeof events[clickType] == 'function') {
	  		events[clickType]()
	  	}
  },

  //判断是否授权的操作
	callButton: function() {
		var that = this
		//12.03新增,如果登录过,需要使用下面的
		app.isLoginApp()
		
		var loginApp = app.data.loginApp
		
		if(!loginApp) {
			//说明是游客模式
			app.bindViewTap_three('rank_new','','',that.data.index);
			return 
		}
		
		log('callButton1', app.data.hasAccredit)
//		//如果没有授权过
		if(!app.data.hasAccredit) {
			log('没有授权过, 显示登陆的弹窗')
			that.setData({
				initial_show: true,
				//11.16新增设置页面,调整去处理回调函数
				onLoginStyle: 'rank_new',
			})
		} else {
			app.bindViewTap_three('rank_new','','',that.data.index);
		}
		
//		//11.15新增统计数据
//		statisticsAmendAll.submitMta('chuangguan_rank')
	},
			
	/////////////////////////////////////////////////////
/////////////////////////////////////////////////////		
	//11.07加一个是否需要更新indexl的函数
	updataIndexdl: function() {
		var that = this
		
		//这个是是否需要更新的标志
		var songInfo = app.data.songInfo || {}
		var updateIndexl = songInfo.updateIndexl
		var type = songInfo.type
		log('-songInfo-', songInfo)
		
		//判断是否需要去更新用户的信息
		if(updateIndexl) {
//			需要去更新
			//		//说明是从关卡地图进来的
			var options = that.data.options || {}
			var optionsType = songInfo.type || ''
			var optionsSid = songInfo.sid || ''
			var optionsPass = songInfo.pass || ''
			options.type = optionsType
			options.sid = optionsSid
			options.pass = optionsPass
			
			that.setData({
				options: options,
			})
			//去查询题目
			that.INDEXDL()
			//更新的状态需要改变下
			app.data.songInfo.updateIndexl = false
		}
	},
	/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
	//////////////////////////////////////////
	//11.09回答错误后的音效
	answerFail: function() {
		var that = this
		app.showToastNew('答错了，请重新再答', 1000)
		setTimeout(function() {
			//清空内容
			that.delete_data()
		}, 1000)
	},	
		/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
	//////////////////////////////////////////
//	11.09提示信息的显示
	enterTime: function() {
		var that = this
		//11.21处理前10题的时候出现
		var pass = that.data.subject.pass
		var userData = that.data.user_msg || {}
		if(!pass) {
			return
		}

		log('-用户当前的题目-', pass, pass > 10)
		//		//通关先10关,才出现
		if(pass > 10) {
			log('-超过了第10首,不显示-')
			//并且要先关闭之前的定时器
			that.clearTime()
			return
		}
		
		//11.13修改,先关闭之前的定时器,再开一个新的定时器
		that.clearTime()
		
		app.data.share_times = userData.share_times
		enterTimer = setTimeout(function() {
			//进入20秒,没有任何操作的时间,会给提示信息
			//进入4个icon(左边3个,右边1个.)提示按钮+分享按钮+答题按钮+清空按钮+下面的10个选项按钮+播放和暂停按钮
//			1.音符≥30，【提示按钮】提示 “喵鹰鹰：不懂可以使用提示喔”
//			2.音符＜30时，【分享按钮】提示 “喵鹰鹰：分享获得音符，既可使用提示啦”
//			3.分享已达上限，【每日领音符】提示“喵鹰鹰：每日签到，即可领取音符得提示”
			log('进入20s了,显示提示信息了')
			that.setHint()
		}, that.data.hintData.time)
	},
	clearTime: function() {
		var that = this
		if(enterTimer) {
			log('清空定时器-不显示提示信息')
			clearTimeout(enterTimer)
			
			enterTimer = null
		}
		
		//11.28修改,先进行判断,再去设置新的值
		var hintStyle = that.data.hintData.hintStyle
		if(hintStyle != 0) {
			//设置成不显示(hintStyle)
			var str = 'hintData.hintStyle';
			that.setData({
		      [str]: 0
		    })
		}
	},
	setHint: function() {
		var that = this
		//用户音符数量
		var money = that.data.money
		money = Number(money)
		//用户剩余的分享次数
		var share_times = app.data.share_times
		
		var prompt_need_score = that.data.prompt_need_score*-1 || 0
		
		var str = 'hintData.hintStyle';
		if(money >= prompt_need_score) {
			that.setData({
		      [str]: 1
		    })
		} else {
			//判断提示分享信息
			if(share_times) {
				that.setData({
			      [str]: 2
			    })
			} else {
				that.setData({
			      [str]: 3
			    })
			}
		}
	},
			/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
	//////////////////////////////////////////
	animationEffect: function(posNew) {
		var that = this
		var posOld = that.data.userPos || 0
		posNew = posNew || 0
		posOld = Number(posOld)
		posNew = Number(posNew)
		log('用户排名', posOld, posNew)
		if(isNaN(posNew)) {
			log('posNew是非数字', posOld, posNew)
			return
		}
		if(isNaN(posOld)) {
			log('posOld是非数字', posOld, posNew)
			return
		}
		
//		//开始的时候,不去显示动画,防止卡顿
		if(posOld == 0) {
			that.setData({
				worldRankStyle: '',
				userPos: posNew,
			})
			return 
		}
		//说明没有变化
		if(posOld == posNew) {
			that.setData({
				worldRankStyle: '',
			})
			return 
		} 
		
		if(posOld < posNew) {
			//说明上升
			that.setData({
				worldRankStyle: 'down'
			})
		} else if(posOld > posNew)  {
			//说明下降了
			that.setData({
				worldRankStyle: 'up'
			})
		}
		log('用户排名1', posOld, posNew, that.data.worldRankStyle)
		//11.21新增,删除这个标识
		setTimeout(function(){
			that.setData({
				worldRankStyle: ''
			})
		}, 3000)
		
//		//刷新分数数量(第4个参数是,需要设置data名字)
//		setTimeout(function(){that.num_animation(posOld, posNew,'','userPos');},100)
		that.setData({
			userPos: posNew,
		})
	},
	/////////////////////////////////////////////////////
	
	//11.27新增，正确弹窗显示广告
	aboutAd : {
		//09.14新增，显示广告，在闯关模式结束后，弹窗出现后出现
		showEndAd: function(that) {
			//2019.2.11新增,版本控制
			var show_ad = app.data.bmsControl.banner_touch
			log('-show_ad弹窗-', show_ad)
			if(!show_ad) {
				return
			}
			
//			//19.2.11新增_设置随机的时间
			var m = that.data.bmsControl.bannerRound * 1000 || 1100	
			var n = that.data.bmsControl.bannerMin * 1000 || 600
			var setTime = Math.random()*(m-n)+n
			setTime = Math.round(setTime)
			log('-定时时间-', setTime)
			
			//先显示在底部，然后弹上去
			that.setData({
				endList: true,
			})
			setTimeout(function() {
				that.setData({
					endList: false,
				})
			}, setTime)
		},
	},
	///////////////////////////////
	//12.12优化
	//设置_是否显示登录的弹窗
	gotoLoginApp_isShowLoginPop: function() {
		var that = this
		var showNum = ['5']
		
		var tsgoNum = that.data.subject.pass
		//11.30游客和普通用户需要分开处理----说明已经登录过账号
		var loginApp = app.data.loginApp
		if(loginApp) {
			//说明不是游客模式,直接使用原来的
			return 
		}				
		//是否显示过,如果显示过,就不展示了
		var showLoginPop = that.data.showLoginPop
		if(showLoginPop) {
			return
		}				
		var resultShow = false
		//说明是第5首
		if(showNum.indexOf(tsgoNum) > -1) {				
			resultShow = true
			//说明已经出现过,就不再出现了
			wcache.put('showLoginPop', 1)
			that.setData({
				showLoginPop: 1,
			})
		}
		return resultShow
	},
	//获取本地缓存
	gotoLoginApp_getLocal: function() {
		var that = this
		//11.30新增,一个是否弹出过弹窗
		var showLoginPop = wcache.get('showLoginPop') || 0
		that.setData({
			showLoginPop: showLoginPop,
		})
		log('-showLoginPop-', that.data.showLoginPop)
	},
	///////////////////////////////
	//19.1.9新增，收集formId
  	formSubmitHandle :function(event) {
	 	var that = this
//	    formId.saveFromId(that, {
//	      	event: event,
//	    })
	},
	
  	//19.2.13新增, 判断去显示新的一条广告内容
  	showNewAd: function() {
  		var that = this
  		
  		//根据ID获取组件对象
    	var showTwo = this.selectComponent('#myShow');
    	//19.2.13不用切换
    	if(showTwo) {
    		showTwo.showNewAd()
    	}
  	},
  	
  	/////////////////////////////////////////////
	//19.2.15新增,宝箱功能
	closegrade: function() {
		var that = this
		//关闭宝箱弹窗,并进入下一题
		that.toNext()
	},
	//宝箱功能
	showGrade: function() {
		var that = this
		//新增音效
		that.audioPlayNew('libao')
		
		//11.20修改，不去判断点击的频率
		if( app.gettimestamp() - app.data.function_time < 2){return}
		app.data.function_time = app.gettimestamp();
		
		//显示宝箱
		that.setData({
			game_state: 10,
		})
		 //获得挑战机会+1 dialog组件
		 if(!that.grade) {
		 	that.grade = this.selectComponent("#grade");
		 }
//  	var money = that.data.money
    	
		var money = content.getEnergyRange().energyNum
    	
		//显示宝箱的弹窗
    	that.grade.showRedpacketIcon({
    		money,
    		page: that, 
    	})
	},
	//红包功能
	showRed: function(type, noNext) {
		var that = this
		//11.20修改，不去判断点击的频率
		if( app.gettimestamp() - app.data.function_time < 2){return}
		app.data.function_time = app.gettimestamp();

		 //获得挑战机会+1 dialog组件
		 if(!that.redpacket) {
		 	that.redpacket = this.selectComponent("#redpacket");
		 }

		//显示宝箱的弹窗
    	that.redpacket.showRedpacketFirst({
    		type: type || '',  //打开弹窗的类型
    		page: that, 
    		noNext: noNext, //是否去到下一题
    	})
	},
	//礼包功能
	showLibao: function(type) {
		var that = this
		//11.20修改，不去判断点击的频率
		if( app.gettimestamp() - app.data.function_time < 2){return}
		app.data.function_time = app.gettimestamp();

		 //获得挑战机会+1 dialog组件
		 if(!that.gift) {
		 	that.gift = this.selectComponent("#gift");
		 }
    	
		//显示宝箱的弹窗
    	that.gift.showRedpacketFirst({
    		type: type || '',  //打开弹窗的类型
    		page: that, 
    	})
	},
	
	succeedFunNew: function() {
//		var that = this
////		//剩余的次数
//////		var openTime = wcache.get('openTime') || 10
////		var draw_num = that.data.draw_num
////		log('剩余开宝箱的次数', draw_num)
////		if(draw_num && that.appearContent() && that.data.bmsControl.box) {
////			log('开宝箱了')
////			//19.2.19新增,如果是存在本地,就不去显示
////			var judge = that.setLocalGrade.judge(that.data.subject.pass)
////			log('judge', judge)
////			if(!judge) {
////				//			19.2.15新增,出现弹窗
////				that.showGrade()
////				return
////			}
////		}
//		
//		 //这里是原来的成功逻辑
//		that.setgame_state(2)
////		/11.27新增，显示广告，在闯关模式结束后，弹窗出现后出现
//		that.aboutAd.showEndAd(that)
	},
//	宝箱出现的数量
	appearContent: function() {
		var that = this
		var result = false
		var passTimu = that.data.subject.pass || 0
		passTimu = Number(passTimu)
		//1-100 (逢6尾数)
		//101-500 (十位数为双数, 个位数为6)
		//501- (十位数逢4和8, 个位数为6)
		if(passTimu <= 100) {
			passTimu = '' + passTimu
			if(passTimu.slice(-1) == 6) {
				result = true
			}
		} else if(passTimu < 500) {
			passTimu = '' + passTimu
			if(passTimu.slice(-1) == 6 && Number(passTimu.slice(-2, -1)) %2 == 0) {
				result = true
			}
		} else {
			passTimu = '' + passTimu
			var tiuus = ['4', '8']
			var tiuu = tiuus.indexOf(passTimu.slice(-2, -1))
//			log(tiuu, passTimu.slice(-2, -1))
			if(passTimu.slice(-1) == 6 && tiuu > -1) {
				result = true
			}
		}
		log('是否在指定题目', result)
		return result
	},
	setDrawNum: function(user) {
		var that = this
		app.data.draw_num = user.draw_num
		that.setData({
			draw_num: user.draw_num,
		})
	},
	//19.2.19出现宝箱后,不再出现宝箱
	setLocalGrade: function() {
		var that = this
		var result = {
			save: function(pass) {
				var self = this
				var passLocal = self.get()
				passLocal.push(pass)
				wcache.put('passLocal', passLocal)
			},
			get: function() {
				var self = this
				var passLocal = wcache.get('passLocal') || []
				return passLocal
			},
			//判断题目数并处理
			judge: function(pass) {
				var self = this
				var passLocal = self.get()
				//是否是存在的
				var res = false
				pass = pass + ''
				if(passLocal.indexOf(pass) > -1) {
					//说明已经存在
					res = true
				} else {
					//说明不存在
					self.save(pass)
				}
				return res
			}
		}
		that.setLocalGrade = result
	},
	/////////////////////////////////////
//	广告相关
	setBms() {
		var that = this
	    const { bmsAd } = app
	    if(!bmsAd) {
	    	//没有不显示
	    	return
	    }
		
		bmsAd.getMsg('index_ads', true).then((res) => {
	    	log('-导流位数据-', res)
	    	that.setData({
	    		bmsAdIndexaIcon: res || [],
	    	})
	   })
		
		bmsAd.getMsg('passlevel', true).then((res) => {
	    	log('-导流位数据bmsAdPasslevel-', res)
	    	that.setData({
	    		bmsAdPasslevel: res || [],
	    	})
	   })
		
		//6个导流位置
		for(var i = 0; i < 6; i++) {
			that.setIcon(i)
		}
	  },
	  setIcon: function(i) {
	  	var that = this
	    const { bmsAd } = app
	    if(!bmsAd) {
	    	//没有不显示
	    	return
	    }
		
	    //设置广告内容
	  	bmsAd.getMsg(`icon${(i+1)}`, true).then((res) => {
		    	log('-导流位数据-' + `icon${(i+1)}`, res)
		    	var str = `bmsAdIcon${(i+1)}`
		    	that.setData({
		    		[str]: res || [],
		    	})
		   })
	  },
	  
	  	
		//滚动播报
    radio_box: function() {
        var that = this,
            time = 3;

        //取消定时器
        clearTimeout(danmu_Timeout);

        //没有则退出
        //      if(!app.data.activity_config.reward_list){return}
        //      var radio_list = app.data.activity_config.reward_list ;
        //这里是设置获取到的列表数据，先判断是否为空。不为空，再进行下面的操作（注意，这里的数据名字需要你修改）
        if(!that.data.Winners_List){return}   
        var radio_list = that.data.Winners_List

        doommList.push(new Doomm(radio_list[danmu_num], Math.ceil(Math.random() * 86), time));

        that.setData({
                doommData: doommList
        })
//      log(111111, doommList)
        danmu_num++;
        if(danmu_num == radio_list.length) {
            danmu_num = 0;
        }
        danmu_Timeout = setTimeout(function() {
            that.radio_box()
        }, time * 1000);
    },
    /////////////////////////////////////////////////////
/////////////////////////////////////////////////////
	//////////////////////////////////////////
     //19.3.11重启小程序
    applyUpdate: function() {
    	var that = this
//  	//使用后,ios的也会出现没有广告
		app.bindViewTap_three('index', '', 'reLaunch')	
    },
	/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
	//////////////////////////////////////////
//测试函数
	testFun : function(){
		var that = this
//		log(that.hasNoUbqr)
		
//		that.aboutPassNum.setPassNum(1)
		
//		that.setgame_state(2)
	},
//})
}

Object.assign(pageParameter, index_other)

//配置文件
Page(pageParameter)
