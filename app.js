var fetch = require("node-fetch");
var config = require("config");
var express = require("express");


const app = express();

app.get("/getMySclad", function (req, res) {
	const user = config.get("user");
	const pass = config.get("pass");
	const uriApi = config.get("uriApi");
	const service = "report/stock/bystore?offset=0&limit=10";
	const uri = "https://" + user + ":" + pass + "@" + uriApi + service;
	
	
	// fetch('https://api.github.com/users/github')
	// 	.then(function(res) {
	// 		return res.json();
	// 	}).then(function(json) {
	// 		res.json(json);
	// 	console.log(json);
	// });
	//
	fetch(uri)
		.then(function(data) {
			// console.log(data.text());
			return data.json()
		})
		.then(function (asd) {
			res.json(asd);
		});
	// .then((json)=> res.json(json));
	
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
});

app.listen(3000, function () {
	console.log("listening port 3000");
});