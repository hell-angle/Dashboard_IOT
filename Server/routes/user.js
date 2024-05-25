const express = require("express");
const loginAuth = require("../controller/user/loginAuth");
const addUser = require("../controller/user/signUp");
const userData = require("../controller/user/userData");
const getTemperatureData = require("../controller/user/temperature");
const getHumidityData = require("../controller/user/humidity");
const getLightData = require("../controller/user/light");
const getData = require("../controller/user/getData");
const postLightData = require("../controller/user/storeLight")
const turnOffLed1 = require("../controller/user/controlLed1off");
const turnOffLed2 = require("../controller/user/controlLed2off");
const turnOnLed1 = require("../controller/user/controlLed1on");
const turnOnLed2 = require("../controller/user/controlLed2on");
const stateLed1 = require("../controller/user/stateLed1");
const stateLed2 = require("../controller/user/stateLed2");
const postHumidData = require("../controller/user/storeHumid");
const postTempData = require("../controller/user/storeTemp");
const statusDevide = require("../controller/user/checkStatusDevive");
const getLastestData = require("../controller/user/getSensorLastest");
const router = express.Router();

router.post("/login", loginAuth);
router.get("/data", userData); 
router.get("/readingtemp",getTemperatureData);
router.get("/readinghumid",getHumidityData);
router.get("/readinglight",getLightData);
router.get("/fulldata",getData);
router.post("/postlight",postLightData);
router.put("/led1off",turnOffLed1);
router.put("/led1on",turnOnLed1);
router.put("/led2on",turnOnLed2);
router.put("/led2off",turnOffLed2);
router.get("/stateLed1",stateLed1);
router.get("/stateLed2",stateLed2);
router.post("/postTemp",postTempData);
router.post("/postHumid",postHumidData);
router.get("/statusdevice",statusDevide);
router.get("/datasensorlastest",getLastestData)
module.exports = router;

