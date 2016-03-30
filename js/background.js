console.log('background.js init start');




		
var key = true;

chrome.storage.sync.get("key", function(val) {
 console.log('get key from storage : ' + val.key);
 if(val != null && val.key != null && val.key != 'undefined'){
	 key = val.key;
	 console.log('set key : ' + key);
 }
 
});


chrome.webRequest.onBeforeRequest.addListener (

        function(details) {
		if(true == key){
			console.log('background.js detect and change:' + details.url); 
		var url = details.url.replace("https://","http://").replace("ajax.googleapis.com","ajax.useso.com");
		url = url.replace("fonts.googleapis.com","fonts.useso.com");
		console.log('to:' + url);
		
		return {redirectUrl:url};
		}else{
			console.log('background.js detect but key close'); 
			return ;
		}
			  
		},
       {urls: ['http://ajax.googleapis.com/*','http://fonts.googleapis.com/*',
	   'https://ajax.googleapis.com/*','https://fonts.googleapis.com/*']},
          ["blocking"] 
);






chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log('background.js onMessage'); 
	if(request.type == "keySwitch"){
		console.log('set to ' + request.key); 
		key = request.key;
		chrome.storage.sync.set({"key":key});
	}else if(request.type == "queryKey"){
		console.log('background.js return ' + key); 
		 return sendResponse({key: key});  
	}
	
});

console.log('background.js init finish');



