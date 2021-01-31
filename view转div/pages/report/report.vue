<template><div><div>
	<div class="report_title">请选择投诉原因</div>
    <div class="report_cells">
        <div v-for= "(item,index) in items}}" wx:key="id">
            <div catchtap="checkedTap" class="report_cell" id="{{index}}">
                <span id="{{index}}">{{item.value}}</span>
                <icon hidden="{{item.checked==0}}" id="{{index}}" size="16" type="success_no_circle"></icon>
            </div>
        </div>
    </div>
    <!--<div class="weui-cells__title">请填写你的手机号，方便我们联系你</div>
    <div class="report_cell weui-flex">
        <div class="weui-cell__hd">
            <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd weui-flex__item">
            <input @input="phoneInput" class="weui-cell_input" maxlength="11" placeholder="选填" type="number" />
        </div>
    </div>-->
    <!--<div class="button-area">
        <button @onclick="submitReport" class="submit-btn" type="primary">确认投诉</button>
    </div>-->
    <!--修改按钮样式-->
	<div class="display_flex img_piaodai_span">
		 <button @onclick="submitReport">确认投诉</button>
	</div>
</div>
</div></template><script>import vue from "vue"var vm = vue;export default {name:"report", data() {return {}}, methods: {} }</script>