 function swithKey(key){  
   var msg = {
		type: "keySwitch",
		key: key
	};
	chrome.runtime.sendMessage(msg);
	if(false == key){
		chrome.browserAction.setIcon({path: {"32": "images/logo_false.png"}});
		$("#logicImg").attr("src","images/disabled.png");
		
	}else{
		chrome.browserAction.setIcon({path: {"32": "images/logo_true.png"}});
		$("#logicImg").attr("src","images/enabled.png");
	}

	
	console.log("swithKey finish:" + key);
 } 
 
$(document).ready(function(){
	$('#myonoffswitch').onoff(); 
	

	chrome.runtime.sendMessage({type: "queryKey"},function(response) {  
		console.log("receive" + response.key);
		$("#myonoffswitch").attr("checked",response.key);
		swithKey(response.key);

	});
	
	swithKey($('#myonoffswitch').is(':checked'));
	$('#myonoffswitch').change(function (){
		swithKey($('#myonoffswitch').is(':checked'));
	});	
});

