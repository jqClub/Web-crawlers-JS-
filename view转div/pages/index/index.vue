<template><div><form bindsubmit="formSubmit" report-submit="true">
  <div class="start_page">
    <div class="btn_top">
    	<!--投诉-->
    	<img v-show="{{bmsControl.feedbackBtn}}" style="margin-right: 0.17rem;" catchtap="clickAll" data-clicktype="complaint" class="btn_tousu" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/btn_tousu.png" ></img>
    	<!--关卡-->
    	<img catchtap="clickAll" data-clicktype="openCustoms" class="btn_tousu"  src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/btn_guanka.png" ></img>
    </div>
    <div class="display_flex guanka" style="margin-top: 0.13rem;">
    	第 <div class="guanka_num" style="margin: 0 0.13rem;"> {{passNum}} </div> 题
    </div>

    <!--答题的界面-->
    <div class="display_flex answer_area" style="margin-top: 0.20rem;">
    	<!--轮播的组件-->
    	<div class="answer_loop  ">
    		<img class="absolute_top icon_laba_new" style="margin-right: 0.27rem;" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/icon_laba.png" ></img>    		
    		<div class="icon_laba_loop  ">
    			<div style="height: 100%; overflow: hidden;">
				    <div v-for= "(item,index) in doommData}}"   style="animation:fadeInOut {{item.time}}s ease both;">
				        <!--{{item.span.nickname}}-->
				        <div v-show="{{looptype != 1}}" class="display_flex icon_span">
				           		{{item.span}}
				    		</div>
				    		
				    		<div wx:else class="display_flex icon_span">
				    			{{item.span.name}} 刚刚提现了
				    			<div style="color:#FFED57;">{{item.span.money}}</div>
				    			元
				    		</div>
				    </div>
				  </div>
    		</div>
    	</div>
    	<div class="song_page img_tu_div" >
    		<div class="page_top">
    			<div class="  idiom_mus scaleAM maincolor_bg_fff" style="overflow: hidden;">
					<div class="img_bg flex_center" style="width:4.80rem;height: 4.80rem; border-radius: 50%; flex-direction: row;">
						<img class="mus_bg {{style?'imgRotate':''}}" src="https://static.zuiqiangyingyu.cn/wechatApp/banma_song/src/public/imgs/music.gif" mode="widthFix"></img>

						<button catchtap="dealVideo" class="mus_op_new display_flex" style="z-index: 10; " hover-class="none"  form-type="submit">
							<img v-show="{{style}}" src="../assets/stop.png" mode="widthFix" style="width: 1.33rem; height: 1.33rem;" ></img>
							<img wx:else src="../assets/play.png" mode="widthFix" style="width: 1.33rem; height: 1.33rem;"></img>
						</button>
					</div>
				</div>
			</div>
    	</div>
    	<!--2个button按钮-->
    	<div class="display_flex" style="margin-top: 0.67rem;">
	    		<!--用户的能量值-->
	    	<button v-show="{{bmsControl.energy}}" catchtap="clickAll" data-clicktype="showPower" class="display_flex btn_2_new  " style="margin-right: 0.40rem;">
	    			<!--显示的星星-->
						<div data-clicktype="showPower" style="margin-top: -0.13rem;">
							<div  data-clicktype="showPower" class="icon_div" style="display: inline-template;">
								{{userInfo.powerValue || 0}}
								<img  data-clicktype="showPower" class="icon_aixin" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/icon_aixin.png" ></img>
								<img  data-clicktype="showPower" class="img_jia" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/img_jia.png" ></img>
							</div>
						</div>
	    	</button>
	    	<!--飞入右边的动画效果-->
	    	<img v-show="{{leftshiAM}}" class="icon_aixin_new {{leftshiAM ? 'ShangleftshiAM' : ''}}" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/icon_aixin.png" ></img>
	    	
	    	<!--查看答案-->
	    	<button catchtap="clickAll" data-clicktype="lookAnswer">
	    		<img  data-clicktype="lookAnswer" class="btn_2" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/btn_2.png" ></img>
	    	</button>
			</div>
			
			<!--答题区-->
    	<div class="display_flex  " style="margin-top: 0.32rem; flex-wrap: wrap">
    		<template v-for= "(item,index) in input_list}}" wx:key="unique">
    			<button catchtap="click_input" data-index="{{index}}" class="img_gezi_div  {{item.code ? '' : 'img_gezi_div1'}}  " style="margin-right: {{(index+1) != input_list.length ? 34 : 0}}rpx; ">
    				<div data-index="{{index}}" class="img_gezi_span">{{item.code}}</div>
    			</button>
    		</template>
    		
    		<!--重置按钮-->
    		<div  class="display_flex icon_shuaxin_div  "  data-type="delete" style="margin-left: 0.32rem;">
    			<!--<img class="icon_shuaxin "   data-type="delete"  src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/icon_shuaxin.png" ></img>-->
    			<button class="display_flex icon_shuaxin_postion " catchtap="delete_data" data-type="delete">
    				<img class="icon_shuaxin"  data-type="delete"  src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/icon_shuaxin.png" ></img>
    			</button>
    		</div>
    	</div>
			
			<!--选项区-->
    	<div class="display_flex anwser_box" >
	    		<template v-for= "(item,index) in button_list}}" wx:key="unique1">
	    			<button catchtap="{{item.state ? 'click_button' : ''}}" data-index="{{index}}" class="btn_3" style="margin-right: {{(index + 1) % 4 == 0 ? 0 : 35}}rpx; margin-top: 0.35rem;">
	    				<div  data-index="{{index}}" class="btn_3_span" style="display: {{item.state ? '' : 'none'}};">{{item.code}}</div>
	    			</button>
				</template>
    	</div>
    </div>

    <!--广告界面-->
    <div>
    		<wxad v-show="{{passNum % 3 == 0}}" id="myShow" adNewType="indexCard" type="card"></wxad>
    		<wxad wx:else id="myShow1" adNewType="indexCard" type="card"></wxad>
    </div>
    <!--<wxad v-show="{{bmsControl.banner}}" id="myShow" adNewType="index"></wxad>-->

    <!--查看红包余额-->
    <img v-show="{{!userInfo.isClearBalance && bmsControl.red}}" catchtap="clickAll" data-clicktype="lookBalance" class="Shaking5 icon_hongbao"  src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/icon_hongbao.png" ></img>
		
		<!--首页导流icon位置-->
		<!--<div  v-show="{{bmsControl.ads}}" class="rubberBand" style="position: absolute; top: 5.20rem; left: 0.13rem;">
	      <wd-loop-ad  ad-list="{{bmsAdIndexaIcon}}"   flag="index_ads" >
				</wd-loop-ad>
	  </div>-->
		
    <!--查看答案-->
		<div  class="global" v-show="{{game_state == 1 }}">
			<div class="display_flex" style="flex-direction: column;">
				<div data-colse="false" class="display_flex pop_all_span pop_all_img" style="margin-top: 4.53rem;">
					<!--顶部的飘带-->
					<div class="img_piaodai_position">
						<div class="display_flex img_piaodai">
						 	<img class="child_center txt_daan" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/txt_daan.png" ></img>
						</div>
					</div>

					<!--答案的内容-->
					<div class="img_piaodai_span1" >{{subject.answer.name}}</div>
				</div>

				<!--按钮-->
				<button catchtap="clickAll" data-clicktype="close" class="img_piaodai_span" style="margin-top: 0.56rem;">
						好的
				</button>
			</div>
		</div>

		<!--答对了-->
		<div class="global" v-show="{{game_state == 2 }}">
			<div class="display_flex" style="flex-direction: column;">
        <div class="scaleAM1 display_flex pop_all_span_new  " style="margin-top: {{bmsControl.isAudit || !bmsControl.ads ? 350 :  smallScreen ? 80 : 120 }}rpx; justify-content: flex-start; flex-direction: column;">
						
				<!--顶部的飘带-->
					<div class="img_piaodai_position">
						<div class="display_flex img_piaodai">
						 	<img class="child_center txt_daan" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/txt_dadui.png" ></img>
						</div>
					</div>
					<!--答案解释-->
					<div class="anser_explain"  style=" margin-top: 1.04rem;">
						<div style="padding: 0.27rem;">{{subject.explain}}</div>
					</div>

					<!--显示的星星-->
					<div  class="icon_div" catchtap="clickAll" data-clicktype="showPower"  style="margin: 0.27rem 0; visibility: {{bmsControl.energy ? '': 'hidden'}};">
						{{userInfo.powerValue || 0}}
						<img class="icon_aixin" catchtap="clickAll" data-clicktype="showPower"  src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/icon_aixin.png" ></img>
						<img class="img_jia" catchtap="clickAll" data-clicktype="showPower"  src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/img_jia.png" ></img>
					</div>

					<!--虚线--><!--更多好玩的内容-->
					<!--<template v-show="{{bmsControl.ads}}">
						<div class='line_css'></div>
						<div  class="display_flex" style="justify-content: flex-start; align-items: flex-start;">
							<img class="img_more  " src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/img_more.png" ></img>
							<div class="display_flex app_list" style="margin-top: 0.27rem; margin-left: 0.27rem;">
										<div v-show="{{bmsAdIcon1}}" class="{{showIndex == 1 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0.87rem; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon1}}" cssType="pop" flag="icon1" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon2}}" class="{{showIndex == 2 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0.87rem; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon2}}" cssType="pop" flag="icon2" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon3}}" class="{{showIndex == 3 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon3}}" cssType="pop" flag="icon3" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon4}}" class="{{showIndex == 4 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0.87rem; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon4}}" cssType="pop" flag="icon4" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon5}}" class="{{showIndex == 5 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0.87rem; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon5}}" cssType="pop" flag="icon5" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon6}}" class="{{showIndex == 6 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon6}}" cssType="pop" flag="icon6" >
											</wd-loop-ad>
				    				</div>
							</div>
						</div>
					</template>-->
				</div>
				
				<!--按钮-->
				<!--<div catchtap="clickAll" data-clicktype="openShare" class="img_piaodai_span" style="margin-top: {{endList ? '150' : '22'}}rpx;">
						考考好友
				</div>-->
				<button open-type="share" class="img_piaodai_span" style="margin-top: {{endList ? '150' : '22'}}rpx;">
						考考好友
				</button>

				<div catchtap="toNext" class="img_piaodai_span img_piaodai_span2" style="margin-top: 0.20rem;">
						下一题
				</div>
				
				 <!--广告界面-->
    		<wxad v-show="{{bmsControl.banner_result}}" id="myShow" adNewType="indexCard" type="card" style="margin-top: {{smallScreen ? 0 : 20}}rpx;"></wxad>
			</div>
		</div>

		<!--答错了-->
		
		<div class="global" v-show="{{game_state == 3 }}">	
			<div class="display_flex  " style="flex-direction: column; position: relative;">
          <div class="scaleAM1 display_flex pop_all_span_new  " style="margin-top: {{bmsControl.isAudit || !bmsControl.ads ? 350 :  smallScreen ? 80 : 120 }}rpx; justify-content: flex-start; flex-direction: column;">
						
					<!--顶部的飘带-->
					<div class="img_piaodai_position">
						<div class="display_flex img_piaodai img_piaodai1">
						 	<img class="child_center txt_daan" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/txt_dacuo.png" ></img>
						</div>
					</div>

					<div style="margin-top: 1.33rem;">
						<img class="txt_zaijiezaili" style="margin-right:0.11rem;" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/txt_zaijiezaili.png" ></img>
					</div>
					<!--显示的星星-->
					<div  class="icon_div" catchtap="clickAll" data-clicktype="showPower"  style="margin: 0.40rem 0; visibility: {{bmsControl.energy ? '': 'hidden'}};">
						{{userInfo.powerValue || 0}}
						<img class="icon_aixin" catchtap="clickAll" data-clicktype="showPower"  src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/icon_aixin.png" ></img>
						<img class="img_jia" catchtap="clickAll" data-clicktype="showPower"  src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/img_jia.png" ></img>
					</div>
					
					
					<!--飞入下边的动画效果-->
	    	<img v-show="{{leftshiAM}}" class="icon_aixin_new1 {{leftshiAM ? 'ShangleftshiAM1' : ''}}" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/icon_aixin.png" ></img>

					<!--虚线-->
						<!--更多好玩-->
						<!--虚线--><!--更多好玩的内容-->
						<!--<template v-show="{{bmsControl.ads}}">
							<div class='line_css'></div>
							<div  class="display_flex" style="justify-content: flex-start; align-items: flex-start;">
								<img class="img_more  " src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/img_more.png" ></img>
								<div class="display_flex app_list" style="margin-top: 0.27rem; margin-left: 0.27rem;">
										<div v-show="{{bmsAdIcon1}}" class="{{showIndex == 1 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0.87rem; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon1}}" cssType="pop" flag="icon1" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon2}}" class="{{showIndex == 2 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0.87rem; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon2}}" cssType="pop" flag="icon2" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon3}}" class="{{showIndex == 3 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon3}}" cssType="pop" flag="icon3" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon4}}" class="{{showIndex == 4 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0.87rem; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon4}}" cssType="pop" flag="icon4" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon5}}" class="{{showIndex == 5 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0.87rem; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon5}}" cssType="pop" flag="icon5" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon6}}" class="{{showIndex == 6 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon6}}" cssType="pop" flag="icon6" >
											</wd-loop-ad>
				    				</div>
								</div>
							</div>
						</template>-->
				</div>
				<!--按钮-->
				<div catchtap="clickAll" data-clicktype="reset" class="img_piaodai_span" style="margin-top: {{endList ? '150' : '22'}}rpx;">
						重新回答
				</div>

				<div catchtap="clickAll" data-clicktype="skip_game" class="img_piaodai_span img_piaodai_span2" style="margin-top: 0.20rem;">
						跳过本题
				</div>
				
				
				  <!--广告界面-->
    		<wxad v-show="{{bmsControl.banner_result}}" id="myShow" adNewType="indexCard" type="card" style="margin-top: {{smallScreen ? 0 : 20}}rpx;"></wxad>
			</div>	
		</div>

		<!--恭喜升级-->
		<div class="global" v-show="{{game_state == 4 }}">
			<div class="display_flex" style="flex-direction: column;">
        <div class="scaleAM1 display_flex pop_all_span_new  " style="margin-top: {{bmsControl.isAudit || !bmsControl.ads ? 350 :  smallScreen ? 80 : 120 }}rpx; justify-content: flex-start; flex-direction: column;">
				
				<!--顶部的飘带-->
					<div class="img_piaodai_position">
						<div class="display_flex img_piaodai">
						 	<img class="child_center txt_daan" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/txt_gonxi.png" ></img>
						</div>
					</div>

					<div class="succeed" style="margin-top: 1.01rem;">
						成功解锁：{{userData.levelName}}第{{userData.divide + 1}}节
					</div>
					<!--答案解释-->
					<div class="anser_explain"  style=" margin-top: 0.07rem;">
						<div style="padding: 0.27rem;">{{subject.explain}}</div>
					</div>

					<!--显示的星星-->
					<div  class="icon_div" catchtap="clickAll" data-clicktype="showPower"  style="margin: 0.27rem 0; visibility: {{bmsControl.energy ? '': 'hidden'}};">
						{{userInfo.powerValue || 0}}
						<img class="icon_aixin" catchtap="clickAll" data-clicktype="showPower"  src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/icon_aixin.png" ></img>
						<img class="img_jia" catchtap="clickAll" data-clicktype="showPower"  src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/img_jia.png" ></img>
					</div>

					<!--虚线-->
					<!--<template v-show="{{bmsControl.ads}}">
						<div class='line_css'></div>
						<div class="display_flex" style="justify-content: flex-start; align-items: flex-start;">
							<img class="img_more  " src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/img_more.png" ></img>
							<div class="display_flex app_list  " style="margin-top: 0.27rem; margin-left: 0.27rem;">
										<div v-show="{{bmsAdIcon1}}" class="{{showIndex == 1 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0.87rem; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon1}}" cssType="pop" flag="icon1" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon2}}" class="{{showIndex == 2 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0.87rem; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon2}}" cssType="pop" flag="icon2" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon3}}" class="{{showIndex == 3 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon3}}" cssType="pop" flag="icon3" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon4}}" class="{{showIndex == 4 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0.87rem; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon4}}" cssType="pop" flag="icon4" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon5}}" class="{{showIndex == 5 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0.87rem; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon5}}" cssType="pop" flag="icon5" >
											</wd-loop-ad>
				    				</div>
				    				<div v-show="{{bmsAdIcon6}}" class="{{showIndex == 6 ? 'rubberBand1' : ''}} display_flex app_li_span" style="margin-right: 0; margin-bottom: 0.13rem;">
				    					<wd-loop-ad  ad-list="{{bmsAdIcon6}}" cssType="pop" flag="icon6" >
											</wd-loop-ad>
				    				</div>
							</div>
						</div>
					</template>-->
				</div>
				
				<div v-show="{{!bmsControl.energy}}" catchtap="toNext" class="img_piaodai_span" style="margin-top: 0.20rem;">
						继续
				</div>
				
				<button wx:else catchtap="clickAll" data-clicktype="skip_game" class="display_flex img_piaodai_span" style="margin-top: 0.20rem;">
						解锁：
						<img data-clicktype="skip_game" class="icon_aixin_new2" style="margin-right: 0.13rem;" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/icon_aixin.png" ></img>
						-8
				</button>
				
				  <!--广告界面-->
    		<wxad v-show="{{bmsControl.banner_result}}" id="myShow" adNewType="indexCard" type="card" style="margin-top: {{smallScreen ? 0 : 20}}rpx;"></wxad>
			</div>
		</div>


		<!--太棒了-->
		<div class="global" v-show="{{game_state == 5 }}" >
			<div class="display_flex" style="flex-direction: column;">
				<div class="scaleAM1 display_flex pop_all_span pop_all_img" style="margin-top: 3.33rem; flex-direction: column;">
					<!--顶部的飘带-->
					<div class="img_piaodai_position">
						<div class="display_flex img_piaodai">
						 	<img class="child_center txt_daan" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/txt_taibang.png" ></img>
						</div>
					</div>

					<!--答案的内容-->
					<img class=" txt_guoguan" src="https://static.zuiqiangyingyu.cn/wb_webdiv/baidu_program/txt_guoguan.png" ></img>

					<!--用户等级-->
					<div class="display_flex " style="margin-top: 0.75rem;">
						<div class="level_span">
							等级：{{userData.levelName || '圣贤'}}
						</div>
					</div>
				</div>

				<!--按钮-->
				<!--<div catchtap="clickAll" data-clicktype="openShare" class="img_piaodai_span" style="margin-top: 0.29rem;">
						考考好友
				</div>-->
				<button open-type="share" class="img_piaodai_span" style="margin-top: 0.29rem;">
						考考好友
				</button>
				<div catchtap="clickAll" data-clicktype="clear" class="img_piaodai_span" style="margin-top: 0.29rem;">
						重新再来一遍
				</div>
				
				<!--更多好玩--导流位置-->
				<!--<div v-show="{{bmsControl.ads}}" class="img_piaodai_span img_piaodai_span2" style="margin-top: 0.20rem;">
						<wd-loop-ad  ad-list="{{bmsAdPasslevel}}" cssType="passlevel" flag="passlevel" >
							可能喜欢
						</wd-loop-ad>
				</div>-->
				
				  <!--广告界面-->
    		<wxad v-show="{{bmsControl.banner_result}}" id="myShow" adNewType="indexCard" type="card" style="margin-top: 0.27rem;"></wxad>
			</div>
		</div>
			
		<!--打开关卡地图-->
		<my-customs id="myCustoms" bind:openTimu="openTimu">
			 <!--广告界面-->
    		<wxad v-show="{{bmsControl.banner_result}}" adNewType="indexCard" type="card" id="myShow"  ></wxad>
		</my-customs>
		
		<!--能量值相关-->
		<my-power id="power">
			<!--广告界面-->
    	<wxad v-show="{{bmsControl.banner_result}}" id="myShow" adNewType="indexCard" type="card" ></wxad>
		</my-power>
		
		<!--红包--> 
		<my-redpacket id="redpacket" bind:closered="closegrade">
			<!--广告界面-->
    	<wxad  v-show="{{bmsControl.banner_result}}" id="myShow" adNewType="indexCard" type="card" ></wxad>
		</my-redpacket>
		<button v-show="{{trialData}}" catchtap="clickAll" data-clicktype="openred" >开启红包</button>
		<!--礼包的功能-->
		<my-gift id="gift" bind:closered="closegrade">
			<!--广告界面-->
    	<wxad  v-show="{{bmsControl.banner_result}}" id="myShow" adNewType="indexCard" type="card" ></wxad>
		</my-gift>
		<button v-show="{{trialData}}" catchtap="clickAll" data-clicktype="openlibao">开启礼包</button>
		
		<!--19.2.15宝箱功能-->
		<my-grade id="grade"  bind:closegrade="closegrade" style="display: {{game_state == 10 ? '' : 'none'}};">
			<wxad  v-show="{{bmsControl.banner_result}}" style="width: 10.00rem;"  adNewType="indexCard" type="card"></wxad>
		</my-grade>
		<button v-show="{{trialData}}" @onclick="showGrade">开启宝箱</button>
		
		<!--测试模块-->
		<div v-show="{{trialData}}">
			<div catchtap="toNext">跳到下一题</div>
			<div catchtap="clickAll" data-clicktype="clear">清空数据</div>
	    <div catchtap="openPop" >打开界面</div>
	    
	    <!--跳到多少题-->
	    <div>
			  <input type="span" placeholder="请输入跳到的题目" placeholder-class="placeholder" @input="inputTitle" />
			  <button @onclick="save">保存</button>
			</div>
		</div>
  </div>
</form>
</div></template><script>import vue from "vue"var vm = vue;export default {name:"index", data() {return {}}, methods: {} }</script>