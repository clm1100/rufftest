'use strict';
var MQTT = require('aliyun-iot-device-mqtt');

// 个人账号
var options = {
    productKey: "a1INkiR8Veu",
    deviceName: "shidu",
    deviceSecret: "oj4bxKnBSKiMW61JVf1NakAhM85auPHI",
    regionId: "cn-shanghai"
};

// 发布/订阅 topic
// var pubTopic = "/test/aaa";
// var pubTopic = "/a1INkiR8Veu/oj4bxKnBSKiMW61JVf1NakAhM85auPHI/user/test"
var pubTopic = "/sys/a1INkiR8Veu/shidu/thing/event/property/post"
// var pubTopic = "/sys/a1INkiR8Veu/oj4bxKnBSKiMW61JVf1NakAhM85auPHI/thing/event/property/post"


// 建立连接
var client = MQTT.createAliyunIotMqttClient(options);
client.on('connect',function(){
    console.log("ok");
})

$.ready(function(error) {
    if (error) {
        console.log(error);
        return;
    }
    //10s上报一次
    setInterval(publishData, 3* 1000);
});


//上报温湿度
function publishData() {


    var n =0;

    function deal(type,data1){
        n++;
        data.params[type]=data1
        if(n==2){
            console.log(JSON.stringify(data))
            client.publish(pubTopic, JSON.stringify(data));
        }
    }

    var data = {
        "id":Date.now(),
        "params":{
            "pm25": 98
        }
    };


    $("#humirature").getTemperature(function (error, temperature) {
        if (error) {
            console.error(error);
            return;
        }
        deal("temperature",temperature)
    });

    $("#humirature").getRelativeHumidity(function (error, humidity) {
        if (error) {
            console.error(error);
            return;
        }
        deal('humidity', humidity);
    });
}