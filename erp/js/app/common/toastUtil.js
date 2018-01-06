/***
 * 消息框工具类 
 * add by lianghuilin (2017.03.17)
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function($){
	//消息框清除倒计时
	var CLEAR_TIME = 2000;
	//消息框的动画配置
	var ANIMATE_CONFIG = {
		'opacity': 1,
	    '-webkit-transform' : 'translateY(0)'
	};
	//消息框DIV基础模板
	var TOAST_BASE_STR = [];
	TOAST_BASE_STR.push('<div id="TOAST_ID" class="toast alert TOAST_TYPE alert-dismissible" role="alert">');
	TOAST_BASE_STR.push('  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
	TOAST_BASE_STR.push('  <strong>TOAST_MESSAGE</strong>');
	TOAST_BASE_STR.push('</div>');
	TOAST_BASE_STR = TOAST_BASE_STR.join('');
	
	/**
	 * 获取消息框的模板字符串
	 * @param {Object} replaceStrList
	 */
	function getToastStr(replaceStrList){
//		console.info("getToastStr come in,param:"+JSON.stringify(replaceStrList));
		var temp = TOAST_BASE_STR;
		for(var i=0;i<replaceStrList.length;i++){
			if(i==0){
				temp = temp.replace(new RegExp('TOAST_ID',"gm"),replaceStrList[i]);
			}else if(i==1){
				temp = temp.replace(new RegExp('TOAST_TYPE',"gm"),replaceStrList[i]);
			}else{
				temp = temp.replace(new RegExp('TOAST_MESSAGE',"gm"),replaceStrList[i]);
			}
		}
		return temp;
	}
	
	/**
	 * 构建消息框到body
	 * @param {Object} toastId
	 * @param {Object} toastType
	 * @param {Object} toastMessage
	 */
	function buildToast(toastId,toastType,toastMessage){
//		console.info('buildToast come  in,toastId:'+toastId+',toastType:'+toastType+',toastMessage:'+toastMessage);
		var toast_str = getToastStr([toastId,toastType,toastMessage]);
//		console.info('toast_str:'+toast_str);
		$('body').append(toast_str);
	}
	
	/**
	 * 显示消息框
	 * @param {Object} widgetId
	 */
	function show(widgetId){
		//延迟100毫秒显示消息框
		setTimeout(function(){
	        $("#"+widgetId).css(ANIMATE_CONFIG);
	    }, 100);
	    //根据配置的倒计时，清除消息框
	    setTimeout(function(){
	        $("#"+widgetId).remove();
	    }, CLEAR_TIME);
	}
	
	/**
	 * 成功消息提示框
	 * @param {Object} message
	 */
	function success(message){
		//消息框ID
		var toast_id = "toast_" + new Date().getTime();
		//添加提示框的HTML模板到文档
		var toast_str = [];
	    toast_str.push('<div id="' + toast_id + '" class="toast alert alert-success alert-dismissible" role="alert">');
	    toast_str.push('  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
	    toast_str.push('  <strong>',message,'</strong>');  
	    toast_str.push('</div>');
	    $('body').append(toast_str.join(''));
	    //显示提示框
	    show(toast_id);
	}
	
	/**
	 * 失败消息提示框
	 * @param {Object} message
	 */
	function fail(message){
		//获取消息框ID
		var toast_id = "toast_" + new Date().getTime();
		//构建消息框
		buildToast(toast_id,'alert-danger',message);
		//显示提示框
		show(toast_id);
	}
	
	/**
	 * 正常消息提示框
	 * @param {Object} message
	 */
	function info(message){
//		console.info('info come  in:' +message);
		//获取消息框ID
		var toast_id = "toast_" + new Date().getTime();
		//构建消息框
		buildToast(toast_id,'alert-info',message);
		//显示提示框
		show(toast_id);
	}
	
	
	/**
	 * 警告提示框
	 * @param {Object} message
	 */
	function warning(message){
		//获取消息框ID
		var toast_id = "toast_" + new Date().getTime();
		//构建消息框
		buildToast(toast_id,'alert-warning',message);
		//显示提示框
		show(toast_id);
	}
	
	return {
		success : success,
		fail : fail,
		info : info,
		warning : warning
	}
}));
