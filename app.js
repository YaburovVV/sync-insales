import fetch from "node-fetch";
import config from "config";
import express from "express";

const app = express();

app.get("/getMySclad", function (req, res) {
    const user = config.get("user");
    const pass = config.get("pass");
    const uriApi = config.get("uriApi");
    const service = "report/stock/bystore?offset=0&limit=5";
    const uri = "https://" + user + ":" + pass + "@" + uriApi + service;

    fetch(uri)
        .then((data)=> data.json())
        .then((json)=> res.json(json));


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