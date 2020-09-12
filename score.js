"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
function score() {
    var max = 2077500;
    var min = 2000001;
    var urlString = "http://diemthi.hcm.edu.vn/Home/Show";
    for (var sbd = min; sbd < max; sbd++) {
        var body = new FormData();
        body.append('SoBaoDanh', "0" + sbd);
        axios_1["default"]({
            method: 'post',
            url: urlString,
            data: body,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
            console.log(response);
        })["catch"](function (error) {
            console.log(error);
        });
    }
}
