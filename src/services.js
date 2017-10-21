"use strict";
const fetch = require("node-fetch");
const config = require("config");
const app = require("express")();

function Get(uri) {
	return fetch(uri)
		.then(function (data) {
			return data.json()
		})
}


app.get("/getMySclad", function (req, res) {
	const user = config.get("user");
	const pass = config.get("pass");
	const uriApi = config.get("uriApi");
	const limit = 2000;
	const service = "report/stock/bystore?offset=0&limit="+limit;
	var uri = "https://" + user + ":" + pass + "@" + uriApi + service;
	
	var arr = [];
	var d0 = new Date();
	const count = 5;
	
	(function loop(i) {
		Get(uri)
			.then(function (data) {
				var a = data.rows.map(function (el) {
					return /\/([\w-]*)\?/g.exec(el.meta.href)[1];
				}).join(', ');
				arr[i] = i + " - " + a;
				
				console.log(uri);
				if (data.meta.nextHref) {
					var urlArr = data.meta.nextHref.split('://');
					uri = urlArr[0] + '://' + user + ":" + pass + "@" + urlArr[1];
					if (i < count) loop(i+1);
					else {
						var d1 = new Date();
						arr.push((d1-d0)/1000/count);
						res.json(arr);
					}
				}
			});
	})(1);
	
});


app.listen(config.get("port"), function () {
	console.log("listening port " + config.get("port"));
});

// uuid: /=([\w-]*)$/g.exec(el.meta.uuidHref)[1],
// href: el.meta.href,
// stock0Name: el.stockByStore[0].name,
// stock0Id: /\/([\w-]*)$/g.exec(el.stockByStore[0].meta.href)[1],
// stock0Value: el.stockByStore[0].stock,
// request({
//         uri: uri,
//         method: "GET"
//     },
//     function (error, response, body) {
//         if (error) {
//             console.log("error: " + error);
//             res.send("error: " + error);
//         } else {
//             res.type("json");
//             var json = JSON.parse(body);
//             res.json(json); return;
//             var a = json.rows.map(function (el) {
//                 return {
//                     // id: /\/([\w-]*)\?/g.exec(el.meta.href)[1],
//                     // uuid: /=([\w-]*)$/g.exec(el.meta.uuidHref)[1],
//                     // href: el.meta.href,
//
//                     stock0Name: el.stockByStore[0].name,
//                     // stock0Id: /\/([\w-]*)$/g.exec(el.stockByStore[0].meta.href)[1],
//                     stock0Value: el.stockByStore[0].stock,
//
//                     stock1Name: el.stockByStore[1].name,
//                     // stock1Id: /\/([\w-]*)$/g.exec(el.stockByStore[1].meta.href)[1],
//                     stock1Value: el.stockByStore[1].stock,
//
//                     stock2Name: el.stockByStore[2].name,
//                     // stock2Id: /\/([\w-]*)$/g.exec(el.stockByStore[2].meta.href)[1],
//                     stock2Value: el.stockByStore[2].stock,
//
//                     stock3Name: el.stockByStore[3].name,
//                     // stock3Id: /\/([\w-]*)$/g.exec(el.stockByStore[3].meta.href)[1],
//                     stock3Value: el.stockByStore[3].stock
//                 };
//             });
//             res.json(a);
// 	}
//     }
// );
