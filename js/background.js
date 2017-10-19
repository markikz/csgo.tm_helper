var keyCSGO = "";
var keyDOTA2 = "";
var status;
var timer;


//sendTrade(window.keyDOTA2, "CSGO");
//acceptTrade(1400728062);


//var outItem = "https://market.dota2.net/api/ItemRequest/out/240914766/?key="


//https://market.csgo.com/item/1432174707-0-Revolver+Case/  


//{name: '', classid:'', instanceid: '', price: '',steam:''},
var buyItemsList = [{ name: 'Комплект музыки «The International 2014»', classid:'583164181', instanceid: '0', price: '260',steam:'P' },
			{name: 'The Llama Llama', classid:'144038409', instanceid: '57944754', price: '240',steam:''},
			{name: 'Cap of the Fungal Lord', classid:'253037315', instanceid: '0', price: '301',steam:'P'},
			{name: 'Насмешка: Backstroke!', classid:'959992534', instanceid: '57949762', price: '460',steam:'$'},
			//{name: 'Комплект музыки The International 2015', classid:'1096255975', instanceid: '948149725', price: '460',steam:'$'},
			{name: 'Genuine Wyvern Hatchling', classid:'996694315', instanceid: '996698943', price: '560',steam:'P'},
			{name: 'Rage of the Dark Wood', classid:'1533203503', instanceid: '57949762', price: '2200',steam:'P'},
			{name: 'Насмешка: Backstroke!', classid:'959992534', instanceid: '57949762', price: '460',steam:'$'},
			{name: 'Rage of the Dark Wood', classid:'1533203503', instanceid: '57949762', price: '2200',steam:'P'},
			{name: 'Taunt: The Master Juggles', classid:'1723116922', instanceid: '948149725', price: '630',steam:'P'},
			{name: 'Taunt: Make It Rain', classid:'1723116925', instanceid: '948149725', price: '252',steam:'P'}];



/*
var i = 0;
//runBuyRequests();

var sellItemsList [{name: "", classid: "", instanceid: "", price:"", amount:""},
				{name: "", classid: "", instanceid: "", price:"", amount:""},
				{name: "", classid: "", instanceid: "", price:"", amount:""}];


function runBuyRequests(){		
	if(buyItemsList.length > i){
		buyItemDOTA2(buyItemsList[i].classid, buyItemsList[i].instanceid, buyItemsList[i].price);
		//console.log("Отправлен запрос на покупку: " + buyItemsList[i].name);
		i++;
	}else{
		i = 0;
	}

	setTimeout(, 200);
}
*/


var timerId = setTimeout(function tick() {
  console.log( "тик" );
  sellItemDOTA2("1432174707","0","50");
  timerId = setTimeout(tick, 2000);
}, 200);


/*
var j = 0;
runSellRequests();

function runSellRequests(){
		sellItemDOTA2('1432174707', '0', '53');
		console.log('работает');

		setTimeout(runSellRequests(), 1000);
}
*/


/*
var timerId = setInterval(function timer(){
	buyItemDOTA2("155648453", "0", "720");
	buyItemDOTA2("152451296", "0", "455");
	buyItemDOTA2("959994221", "0", "102");
	buyItemDOTA2("959994220", "57949762", "380"); //Насмешка: Fiendish Swag!
	buyItemDOTA2("1522173121", "0", "530"); //Guard of the Rekindled Ashes
	buyItemDOTA2("644964391", "0", "415");//Набор курсоров «Wrath of Ka»
	buyItemDOTA2("519295523", "0", "565"); //Pudgling
	buyItemDOTA2("147935190", "0", "510");//Насмешка: Spider Shuffle
	buyItemDOTA2("253037315", "0", "305");//Cap of the Fungal Lord
}, 4200);

var timerId2 = setInterval(function timer1(){
	buyItemDOTA2("959992714", "57949762", "220");
	buyItemDOTA2("959992534", "57949762", "500");
	buyItemDOTA2("1507008232", "948149725", "300");
	buyItemDOTA2("1506968049", "948149725", "530");
	buyItemDOTA2("147935191", "0", "650");
	buyItemDOTA2("583164181", "0", "285");
	buyItemDOTA2("644964379", "0", "550");
	buyItemDOTA2("720075452", "93973071", "460"); //Genuine Набор курсоров «DAC 2015 Mirana»
}, 4000);


var timerId1 = setInterval(function timer2(){
	sendTradeDOTA2()
}, 45000);
*/



//
/*
xhr = new XMLHttpRequest();
xhr.open("GET", "https://csgo.tm/api/ItemInfo/" + classid + "_" + instanceid + "/" +
			 "en" + "/?key=" + window.keyCSGO, true);
xhr.send(
{"sessionid", ...},
{"serverid", ...},
{"tradeofferid", ...},
{"partner", ...},
{"captcha", ...}
);

*/


//получение минимальной цены, количества и hash'a 1запрос
function getInfo(classid, instanceid) {
	xhr = new XMLHttpRequest();
	xhr.open("GET", "https://csgo.tm/api/ItemInfo/" + classid + "_" + instanceid + "/" +
			 "en" + "/?key=" + window.keyCSGO, true);
	xhr.send(null);


	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) 
		{
			if (xhr.responseText) 
			{
				var data = JSON.parse(xhr.responseText);
				var min_price = data.min_price;
				try{
					var amount = data.offers[1].count;
				}catch (err){
					var amount = 1;
				}
				var hash = data.hash;


				console.log(min_price + "_" + amount + "_" + hash);

				//buyItem(classid, instanceid, min_price);
			}
		}
	}
}


//запрос на покупка предмета CSGO 1запрос
function buyItemCSGO(classid, instanceid, price){
	xhr = new XMLHttpRequest();
	xhr.open("GET", "https://csgo.tm/api/Buy/" + classid + "_" + instanceid + "/" +
			price +"//?key=" + window.key, true);
	xhr.send(null);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) 
		{
			if (xhr.responseText) 
			{
				var data = JSON.parse(xhr.responseText);
				
				//сообщает результат запроса на покупку
				if(data.result == "ok"){
					console.log("true");
				}else{
					console.log("false");
				}
				
			}
		}
	}
}

//запрос на покупку предмета DOTA2  1запрос
function buyItemDOTA2(classid, instanceid, price){
	xhr = new XMLHttpRequest();
	xhr.open("GET", "https://market.dota2.net/api/Buy/" + classid + "_" + instanceid + "/" +
			price +"//?key=" + window.keyDOTA2, true);
	xhr.send(null);

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) 
		{
			if (xhr.responseText) 
			{
				var data = JSON.parse(xhr.responseText);
				//console.log(data);

				//сообщает результат запроса на покупку
				if(data.result == "ok"){
					console.log("buyItemResult: предмет куплен");
				}else if(data.result == 'Вы не можете покупать, пока у вас есть доступные для вывода предметы.\n' +
					'Выведите все предметы на странице "Мои вещи"'){
					console.log("buyItemResult: создается обмен");
					// sendTradeDOTA2();
				}else{
					console.log(data.result);
				}
			}
		}
	}
}

function sellItemDOTA2(classid, instanceid, price){
	xhr = new XMLHttpRequest();
	xhr.open("GET", "https://market.csgo.com/api/SetPrice/new_" + classid + "_" + instanceid + "/" +
			price +"//?key=" + window.keyDOTA2, true);
	xhr.send(null);

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) 
		{
			if (xhr.responseText) 
			{
			}
		}
	}
}


function sendTradeCSGO(key){

	xhr = new XMLHttpRequest();
	xhr.open("GET","https://csgo.tm/api/Trades/?key=" + window.keyDOTA2, true);
	xhr.send(null);

	var sendedInTrade = false;
	var sendedOutTrade = false;

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) 
		{
			if (xhr.responseText) 
			{
				var data = JSON.parse(xhr.responseText);

				for(var i = 0; i < data.length; i++)
				{
					

					//ввод вещей
					if(data[i].ui_status == 2 && !sendedInTrade)
					{
						console.log("2");
						xhr = new XMLHttpRequest();
						xhr.open("GET","https://market.csgo.com/api/ItemRequest/in/1/?key=" + key, true);
						xhr.send(null);

						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4) 
							{
								if (xhr.responseText) 
								{
									var data = JSON.parse(xhr.responseText);
									if(data.success){
										sendedInTrade = true;
									}
									
								}
							}
						}

					//вывод вещей
					}else if (data[i].ui_status == 4 && !sendedOutTrade){
						console.log("4");

						xhr = new XMLHttpRequest();
						xhr.open("GET","https://market.csgo.com/api/ItemRequest/out/"+ data[i].ui_bid +"/?key=" + key, true);
						xhr.send(null);

						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4) 
							{
								if (xhr.responseText) 
								{
								//{"success":true,"trade":"1367935246","nick":"Nekras","botid":239383807,"profile":"https:\/\/steamcommunity.com\/profiles\/76561198199649535\/","secret":"","items":[]}


									var data = JSON.parse(xhr.responseText);
									console.log(data.success);
									if(data.success){
										sendedOutTrade = true;
									}
								}
							}
						}

					}else if(sendedOutTrade && sendedInTrade){
						console.log("тм создал трейды на ввод и ввод")
						
						break;
					}
				}
			}
		}
	}
}



function sendTradeDOTA2(keyDOTA2){
	xhr = new XMLHttpRequest();
	xhr.open("GET","https://market.dota2.net/api/Trades/?key=" + keyDOTA2, true);
	xhr.send(null);

	var sendedInTrade = false;
	var sendedOutTrade = false;

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) 
		{
			if (xhr.responseText) 
			{
				var data = JSON.parse(xhr.responseText);
				for(var i = 0; i < data.length; i++)
				{
					//ввод вещей
					if(data[i].ui_status == 2 && !sendedInTrade)
					{
						console.log("2");
						xhr = new XMLHttpRequest();
						xhr.open("GET","https://market.dota2.net/api/ItemRequest//in/1/?key=" + keyDOTA2, false);
						xhr.send(null);

						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4) {
								if (xhr.responseText) {
									var data = JSON.parse(xhr.responseText);
									console.log(data.success);
									if(data.success == "true"){
										break;
									}
								}
							}
						}
					//вывод вещей
					}else if (data[i].ui_status == 4 && !sendedOutTrade){
						console.log("4");

						xhr = new XMLHttpRequest();
						xhr.open("GET","https://market.dota2.net/api/ItemRequest/out/"+ data[i].ui_bid +"/?key=" + keyDOTA2, false);
						xhr.send(null);

						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4) 
							{
								if (xhr.responseText) 
								{
								//{"success":true,"trade":"1367935246","nick":"Nekras","botid":239383807,"profile":"https:\/\/steamcommunity.com\/profiles\/76561198199649535\/","secret":"3EZM","items":[]}


									var data = JSON.parse(xhr.responseText);
									console.log(data.success);
									if(data.success == "true"){
										break;
									}
								}
							}
						}
					}else if(sendedOutTrade && sendedInTrade){
						console.log("тм создал трейды на ввод и ввод");
						break;
					}
				}
			}
		}
	}
}




//key, sessionid, tradeofferid
function acceptTrade(tradeofferid){
	xhr = new XMLHttpRequest();
	xhr.open("GET","http://api.steampowered.com/IEconService/GetTradeOffers/v1/?key=&get_received_offers=1&time_historical_cutoff=100", true);
	xhr.send(null);

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) 
		{
			if (xhr.responseText) 
			{
				
				//console.log(xhr.responseText);

				var tradeOfferList = JSON.parse(xhr.responseText);
				console.log(tradeOfferList.response.trade_offers_received[1]);


				for(var i = 0; i < 5; i++){
					if( tradeofferid == tradeOfferList.response.trade_offers_received[i].tradeofferid && tradeOfferList.response.trade_offers_received[i].trade_offer_state == 2){
						
						xhr1 = new XMLHttpRequest();
						xhr1.open("POST","https://steamcommunity.com/tradeoffer/" + tradeofferid + "/accept/?key=", true);

//'{"sessionid", ""},{"serverid", 1},{"tradeofferid", "1400728062"}'
						xhr1.send({"sessionid": ""},{"serverid": 1},{"tradeofferid": "1400728062"},{"partner": 76043346},{"captcha": "string.empty"});
						xhr1.onreadystatechange = function() {
							if (xhr1.readyState == 4) 
							{
								if (xhr1.responseText) 
								{
									console.log(xhr1.responseText);

									//xhr1.responseText.ConfirmTradeOffer();
								}
							}
						}
					}
				}
			}
		}
	}
}