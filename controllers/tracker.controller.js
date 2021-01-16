const httpStatus = require('http-status');
const responseObjectClass = require('../objects/responseObjectClass');
const responseMessage = require('../objects/message');
const newResponseObjectClass = responseObjectClass.ResponseObject;
const newResponseMessage = responseMessage.ResponseMessage;
const newResponseObject = new newResponseObjectClass();
const mysql = require('../database/model');
const { QueryTypes } = require('sequelize');
const now = require('performance-now');
const request = require('request')
const crypto = require('crypto');
const moment = require('moment');
const { type } = require('os');

module.exports.spiceTrack = async function spiceTrack(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "trackerController.spiceTrack",
        startTime: new Date(),
        request: req.body,
        requestUrl: req.url,
    }
    let tracking = req.body.tracking
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        for (let index = 0; index < tracking.length; index++) {
            const element = tracking[index];
            let id = element.id != undefined ? element.id : "id"
            let dataLimitReached = req.body["dataLimitReached"] != undefined ? req.body["dataLimitReached"] : "dataLimitReache"
            let destination = element.destination != undefined ? element.destination : "destination"
            let duration = element.duration != undefined ? element.duration : "duration"
            let ip = element.ip != undefined ? element.ip : "ip"
            let journeyId = element.journeyId != undefined ? element.journeyId : "journeyId"
            let latitude = element.latitude != undefined ? element.latitude : "latitude"
            let longitude = element.longitude != undefined ? element.longitude : "longitude"
            let mac = element.mac != undefined ? element.mac : "mac"
            let menu = element.menu != undefined ? element.menu : "menu"
            let view_model = element.model != undefined ? element.model : "model"
            let msisdn = element.msisdn != undefined ? element.msisdn : "msisdn"
            let platform_duration = element.platform_duration != undefined ? element.platform_duration : "platform_duration"
            let reg_id = req.body.reg_id != undefined ? req.body.reg_id : "reg_id"
            let session_id = element.session_id != undefined ? element.session_id : "session_id"
            let source = element.source != undefined ? element.source : "source"
            let timestamp = element.timestamp != undefined ? element.timestamp : "timestamp"
            let trackingDetails = element.trackingDetails != undefined ? element.trackingDetails : "trackingDetails"
            let user_agent = element.user_agent != undefined ? element.user_agent : "user_agent"
            let _interface = req.body._interface != undefined ? req.body._interface : "._interface"
            let deviceId = req.body.deviceId != undefined ? req.body.deviceId : ".deviceId"
            let jsonUpdateTime = req.body.jsonUpdateTime != undefined ? req.body.jsonUpdateTime : ".jsonUpdateTime"
            let model = req.body.model != undefined ? req.body.model : ".model"
            let package = req.body.package != undefined ? req.body.package : ".package"
            let partner = req.body.partner != undefined ? req.body.partner : ".partner"
            let serverDeviceId = req.body.serverDeviceId != undefined ? req.body.serverDeviceId : ".serverDeviceId"
            let sync_type = req.body.sync_type != undefined ? req.body.sync_type : ".sync_type"
            let version = req.body.version != undefined ? req.body.version : ".version"
            let versionCode = req.body.versionCode != undefined ? req.body.versionCode : ".versionCode"

            let server_latitude = req.body.latitude != undefined ? req.body.latitude : "latitude"
            let server_longitude = req.body.longitude != undefined ? element.longitude : "longitude"

            let view_android_id = req.body["view_android_id"] == undefined ? null : req.body["view_android_id"]
            let type = req.body["type"] == undefined ? null : req.body["type"]
            let play_duration = req.body["play_duration"] == undefined ? null : req.body["play_duration"]

            let sync_date = null, sync_timestamp = null, sync_datetime = null
            let date = new Date();
            sync_date = moment(date).format("YYYY-MM-DD");
            sync_timestamp = date.getTime()
            sync_datetime = moment(date).format("YYYY-MM-DD HH:mm:ss");
            let viewDate = new Date(timestamp);
            let view_date = moment(viewDate).format("YYYY-MM-DD");
            let view_datetime = moment(viewDate).format("YYYY-MM-DD HH:mm:ss");
            let eventId = element.eventId

            let query
            if (eventId != undefined) {
                query = "INSERT INTO  vuscreen_tracker(partner, device_id, version, package"
                    + ",interface,model,sync_date,sync_timestamp,sync_datetime,user_agent,view_timestamp,"
                    + "view_model,view_duration,view_id,view_android_id,reg_id,session_id,view_date,view_datetime,ip,mac,msisdn,latitude,longitude,server_device_id,"
                    + " sync_latitude, sync_longitude,type,journey_id,trackingDetails,menu,play_duration,sync_type,platform_duration,source,destination,event_id) "
                    + " values('" + partner + "','" + deviceId + "','" + version + "','" + package + "','" + _interface + "','" + model + "','" + sync_date + "','"
                    + sync_timestamp + "','" + sync_datetime + "','" + user_agent + "','" + timestamp + "','" + view_model + "','" + duration + "','" + id + "','"
                    + view_android_id + "','" + reg_id + "','" + session_id + "','" + view_date + "','" + view_datetime + "','" + ip + "','" + mac + "','"
                    + msisdn + "','" + latitude + "','" + longitude + "','" + serverDeviceId + "','" + + server_latitude + "','" + server_longitude + "','" + type + "','"
                    + journeyId + "','" + trackingDetails + "','" + menu + "','" + play_duration + "','" + sync_type + "','" + platform_duration + "','"
                    + source + "','" + destination + "','" + eventId + "')";

            } else {
                query = "INSERT INTO  vuscreen_tracker(partner, device_id, version, package"
                    + ",interface,model,sync_date,sync_timestamp,sync_datetime,user_agent,view_timestamp,"
                    + "view_model,view_duration,view_id,view_android_id,reg_id,session_id,view_date,view_datetime,ip,mac,msisdn,latitude,longitude,server_device_id,"
                    + " sync_latitude, sync_longitude,type,journey_id,trackingDetails,menu,play_duration,sync_type,platform_duration,source,destination) "
                    + " values('" + partner + "','" + deviceId + "','" + version + "','" + package + "','" + _interface + "','" + model + "','" + sync_date + "','"
                    + sync_timestamp + "','" + sync_datetime + "','" + user_agent + "','" + timestamp + "','" + view_model + "','" + duration + "','" + id + "','"
                    + view_android_id + "','" + reg_id + "','" + session_id + "','" + view_date + "','" + view_datetime + "','" + ip + "','" + mac + "','"
                    + msisdn + "','" + latitude + "','" + longitude + "','" + serverDeviceId + "','" + + latitude + "','" + longitude + "','" + type + "','"
                    + journeyId + "','" + trackingDetails + "','" + menu + "','" + play_duration + "','" + sync_type + "','" + platform_duration + "','"
                    + source + "','" + destination + "')";

            }
            let trackings = await mysql.sequelize.query(query, { type: QueryTypes.SELECT });
            endTime = now() - startTime;
            logEntry.message = "Tracking Query executed succesfully"
            logEntry.query = query
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            if (tracking.length == index + 1) {
                res.status(200).send({ status: 200, timestamp: new Date().getTime() });
                logEntry.message = "exiting from service"
                logEntry.response = returnObj
                logger.detach("info", logEntry);
            }
        }
    } catch (error) {
        console.log(error)
        const returnObj = newResponseObject.generateResponseObject({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: newResponseMessage.errorResponse,
            success: false
        });
        res.status(200).send({ status: 101, timestamp: new Date().getTime() });
        logEntry.message = "Something went wrong"
        logEntry.stackTrace = error.toString();
        logEntry.response = returnObj
        logger.detach("info", logEntry);

    }

}

module.exports.spiceEvent = async function spiceEvent(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "trackerController.spiceEvent",
        startTime: new Date(),
        request: req.body,
        requestUrl: req.url,
    }
    let tracking = req.body.tracking
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        for (let index = 0; index < tracking.length; index++) {
            const element = tracking[index];
            let destination = element.destination != undefined ? element.destination : "destination"
            let duration = element.duration != undefined ? element.duration : 0
            let journeyId = element.journeyId != undefined ? element.journeyId : "journeyId"
            let number_of_unique_user = element.number_of_unique_user != undefined ? element.number_of_unique_user : "number_of_unique_user"
            let session_id = element.session_id != undefined ? element.session_id : "session_id"
            let source = element.source != undefined ? element.source : "source"
            let timestamp = element.timestamp != undefined ? element.timestamp : "timestamp"
            let status = element.status != undefined ? element.status : "status"
            let user = element.user != undefined ? element.user : "user"
            let content_id = element.content_id != undefined ? element.content_id : "content_id"
            let content_type = element.content_type != undefined ? element.content_type : "content_type"
            let mac = element.mac != undefined ? element.mac : "mac"
            let msisdn = element.msisdn != undefined ? element.msisdn : "msisdn"
            let latitude = element.latitude != undefined ? element.latitude : "latitude"
            let longitude = element.longitude != undefined ? element.longitude : "longitude"
            let notification_id = element.notification_id != undefined ? element.notification_id : "notification_id"
            let menu = element.menu != undefined ? element.menu : "menu"
            let unique_mac_address = element.unique_mac_address
            unique_mac_address = unique_mac_address != undefined != undefined ? unique_mac_address.replace("[", "").replace("]", "") : ""


            //outside object    
            let _interface = req.body._interface != undefined ? req.body._interface : "_interface"
            let jsonUpdateTime = req.body.jsonUpdateTime != undefined ? req.body.jsonUpdateTime : "jsonUpdateTime"
            let model = req.body.model != undefined ? req.body.model : "model"
            let package = req.body.package != undefined ? req.body.package : "package"
            let partner = req.body.partner != undefined ? req.body.partner : "partner"
            let reg_id = req.body.reg_id != undefined ? req.body.reg_id : "reg_id"
            let serverDeviceId = req.body.serverDeviceId != undefined ? req.body.serverDeviceId : "serverDeviceId"
            let sync_type = req.body.sync_type != undefined ? req.body.sync_type : "sync_type"
            let version = req.body.version != undefined ? req.body.version : "version"
            let versionCode = req.body.versionCode != undefined ? req.body.versionCode : "versionCode"
            let server_latitude = req.body.latitude != undefined ? req.body.latitude : "latitude"
            let server_longitude = req.body.longitude != undefined ? req.body.longitude : "longitude"
            let deviceId = req.body.deviceId != undefined ? req.body.deviceId : "deviceId"

            let sync_date = null, sync_timestamp = null, sync_datetime = null
            let date = new Date();
            sync_date = moment(date).format("YYYY-MM-DD");
            sync_timestamp = date.getTime()
            sync_datetime = moment(date).format("YYYY-MM-DD HH:mm:ss");

            let viewDate = new Date(timestamp);
            let view_date = moment(viewDate).format("YYYY-MM-DD");
            let view_datetime = moment(viewDate).format("YYYY-MM-DD HH:mm:ss");
            let eventId = element.eventId

            let query
            if (eventId != undefined) {
                console.log(eventId)
                query = "INSERT INTO vuscreen_events " + " (session_id,partner,reg_id,user,event"
                    + ",device_id,version,sync_date,sync_timestamp,sync_datetime,package,interface,model,view_date,"
                    + " view_timestamp,view_datetime,view_id,view_type,mac,msisdn,latitude,longitude,event_id,server_device_id, "
                    + "sync_latitude, sync_longitude,notification_id,menu,journey_id,sync_type,unique_mac_address,source,destination,number_of_unique_user)"
                    + "  values('" + session_id + "','" + partner + "','" + reg_id + "','" + user + "','" + status + "','" + deviceId + "','" + version
                    + "','" + sync_date + "','" + sync_timestamp + "','" + sync_datetime + "','" + package + "','" + _interface + "','"
                    + model + "','" + view_date + "','" + timestamp + "','" + view_datetime + "','" + content_id + "','" + content_type
                    + "','" + mac + "','" + msisdn + "','" + latitude + "','" + longitude + "','" + eventId + "','" + serverDeviceId + "','"
                    + server_latitude + "','" + server_longitude + "','" + notification_id + "','" + menu + "','" + journeyId + "','"
                    + sync_type + "','" + unique_mac_address + "','" + source + "','" + destination + "','" + number_of_unique_user + "')"

            } else {
                query = "INSERT INTO vuscreen_events " + " (session_id,partner,reg_id,user,event"
                    + ",device_id,version,sync_date,sync_timestamp,sync_datetime,package,interface,model,view_date,"
                    + " view_timestamp,view_datetime,view_id,view_type,mac,msisdn,latitude,longitude,server_device_id, "
                    + "sync_latitude, sync_longitude,notification_id,menu,journey_id,sync_type,unique_mac_address,source,destination,number_of_unique_user)"
                    + "  values('" + session_id + "','" + partner + "','" + reg_id + "','" + user + "','" + status + "','" + deviceId + "','" + version
                    + "','" + sync_date + "','" + sync_timestamp + "','" + sync_datetime + "','" + package + "','" + _interface + "','"
                    + model + "','" + view_date + "','" + timestamp + "','" + view_datetime + "','" + content_id + "','" + content_type
                    + "','" + mac + "','" + msisdn + "','" + latitude + "','" + longitude + "','" + serverDeviceId + "','"
                    + server_latitude + "','" + server_longitude + "','" + notification_id + "','" + menu + "','" + journeyId + "','"
                    + sync_type + "','" + unique_mac_address + "','" + source + "','" + destination + "','" + number_of_unique_user + "')"

            }
            let trackings = await mysql.sequelize.query(query, { type: QueryTypes.SELECT });
            endTime = now() - startTime;
            logEntry.message = "Tracking Query executed succesfully"
            logEntry.query = query
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            if (tracking.length == index + 1) {
                res.status(200).send({ status: 200, timestamp: new Date().getTime() });
                logEntry.message = "exiting from service"
                logger.detach("info", logEntry);
            }
        }
    } catch (error) {
        console.log(error)
        const returnObj = newResponseObject.generateResponseObject({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: newResponseMessage.errorResponse,
            success: false
        });
        res.status(200).send({ status: 101, timestamp: new Date().getTime() });
        logEntry.message = "Something went wrong"
        logEntry.stackTrace = error.toString();
        logEntry.response = returnObj
        logger.detach("info", logEntry);

    }

}

module.exports.postTambola = async function postTambola(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "trackerController.postTambola",
        startTime: new Date(),
        request: req.body,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);

        let gameId = req.body.gameId
        let gameName = req.body.gameName
        let hostID = req.body.hostID
        let gameStartTime = req.body.gameStartTime
        let gameEndTime = req.body.gameEndTime
        let registerUser = req.body.registerUser
        let eventId = req.body.eventId

        let tambolaSql = "INSERT INTO tambola(gameId,gameName,hostID,gameStartTime,"
            + "gameEndTime,registerUser,eventId)values('" + gameId + "','" + gameName + "','"
            + hostID + "','" + gameStartTime + "','" + gameEndTime + "','" + registerUser + "','" + eventId + "')";
        if (eventId == undefined) {
            tambolaSql = "INSERT INTO tambola(gameId,gameName,hostID,gameStartTime,"
                + "gameEndTime,registerUser)values('" + gameId + "','" + gameName + "','"
                + hostID + "','" + gameStartTime + "','" + gameEndTime + "','" + registerUser + "')";

        }
        let tambola = await mysql.sequelize.query(tambolaSql, { type: QueryTypes.SELECT });
        endTime = now() - startTime;
        logEntry.message = "tambolaSql Query executed succesfully"
        logEntry.query = tambolaSql
        logEntry.elapsedTime = endTime
        logger.detach("info", logEntry);
        for (let index = 0; index < req.body.playerList.length; index++) {
            const element = req.body.playerList[index];
            let gameId = element.gameId
            let name = element.name
            let mobile = element.mobile
            let seatNo = element.seatNo
            let macId = element.macId
            let score = element.score
            let prizeId = element.prizeId
            let prizeName = element.prizeName

            let playerSql = "INSERT INTO tambola_players(gameId,name,mobile,seatNo,macId,score,prizeId,prizeName) values ('" + gameId
                + "','" + name + "','" + mobile + "','" + seatNo + "','" + macId + "','" + score + "','" + prizeId + "','" + prizeName + "')";
            let player = await mysql.sequelize.query(playerSql, { type: QueryTypes.SELECT });
            endTime = now() - startTime;
            logEntry.message = "playerSql Query executed succesfully"
            logEntry.query = playerSql
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            if (req.body.playerList.length == index + 1) {
                res.status(200).send({ status: 200, timestamp: new Date().getTime() });
                logEntry.message = "exiting from service"
                logger.detach("info", logEntry);
            }

        }

    } catch (error) {
        console.log(error)
        const returnObj = newResponseObject.generateResponseObject({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: newResponseMessage.errorResponse,
            success: false
        });
        res.status(200).send({ status: 101, timestamp: new Date().getTime() });
        logEntry.message = "Something went wrong"
        logEntry.stackTrace = error.toString();
        logEntry.response = returnObj
        logger.detach("info", logEntry);

    }

}

module.exports.registerClubMember = async function registerClubMember(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "trackerController.registerClubMember",
        startTime: new Date(),
        request: req.body,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);

        for (let index = 0; index < req.body.clubMemberRegList.length; index++) {
            const element = req.body.clubMemberRegList[index];

            let user_name = element.user_name
            let card_type = element.card_type
            let dob = element.dob
            let gender = element.gender
            let email = element.email
            let mobile = element.mobile
            let registerClubMemberSql = "INSERT INTO club_registration (user_name,card_type,dob,gender,mobile,email)values('"
                + user_name + "','" + card_type + "','" + dob + "','" + gender + "','" + mobile + "','" + email + "')";

            let result = await mysql.sequelize.query(registerClubMemberSql, { type: QueryTypes.SELECT });
            endTime = now() - startTime;
            logEntry.message = "playerSql Query executed succesfully"
            logEntry.query = registerClubMemberSql
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            if (req.body.clubMemberRegList.length == index + 1) {
                res.status(200).send({ status: 200, timestamp: new Date().getTime() });
                logEntry.message = "exiting from service"
                logger.detach("info", logEntry);
            }

        }

    } catch (error) {
        console.log(error)
        const returnObj = newResponseObject.generateResponseObject({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: newResponseMessage.errorResponse,
            success: false
        });
        res.status(200).send({ status: 101, timestamp: new Date().getTime() });
        logEntry.message = "Something went wrong"
        logEntry.stackTrace = error.toString();
        logEntry.response = returnObj
        logger.detach("info", logEntry);

    }

}


module.exports.appUpgrade = async function appUpgrade(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "trackerController.appUpgrade",
        startTime: new Date(),
        request: req.body,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        let response = {}
        let getQuery = "select * from vuscreen_application_version where package_name='"
            + req.body.packageName + "' and interface='"
            + req.body._interface + "'";
        let result = await mysql.sequelize.query(getQuery, { type: QueryTypes.SELECT });

        if (result[0].version_code > req.body.versionCode) {
            response = {
                force_update: result[0].force_update,
                normal_update: result[0].normal_update,
                version: result[0].versions,
                versionCode: result[0].version_code,
                url: result[0].url,
                model: result[0].model,
                _interface: result[0].interface,
                packageName: result[0].package_name,
                message: result[0].message,
                status: "200"
            }
            res.status(200).send(response);
            logEntry.message = "exiting from service"
            logger.detach("info", logEntry);

        } else {
            response = {
                message: "No app Upgradation Needed",
                status: "201"
            }
            res.status(200).send(response);
            logEntry.message = "exiting from service"
            logger.detach("info", logEntry);
        }

    } catch (error) {
        console.log(error)
        const returnObj = newResponseObject.generateResponseObject({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: newResponseMessage.errorResponse,
            success: false
        });
        res.status(200).send({ status: 101, timestamp: new Date().getTime() });
        logEntry.message = "Something went wrong"
        logEntry.stackTrace = error.toString();
        logEntry.response = returnObj
        logger.detach("info", logEntry);

    }

}

module.exports.getCityList = async function getCityList(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "trackerController.getCityList",
        startTime: new Date(),
        request: req.body,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        let response = {}
        let getQuery = "select * from vuscreen_city where status=1";
        let result = await mysql.sequelize.query(getQuery, { type: QueryTypes.SELECT });
        let responseArr = []

        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            responseArr.push({
                "id": element.id,
                "name": element.name,
                "code": element.code
            })
            if (result.length == index + 1) {
                res.status(200).send(responseArr);
                logEntry.message = "exiting from service"
                logger.detach("info", logEntry);
            }

        }
    } catch (error) {
        console.log(error)
        const returnObj = newResponseObject.generateResponseObject({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: newResponseMessage.errorResponse,
            success: false
        });
        res.status(200).send({ status: 101, timestamp: new Date().getTime() });
        logEntry.message = "Something went wrong"
        logEntry.stackTrace = error.toString();
        logEntry.response = returnObj
        logger.detach("info", logEntry);

    }

}

module.exports.appUpdate = async function appUpdate(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "trackerController.appUpdate",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);

        let sql = "select * from vuscreen_app_update";
        const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
        let endTime = now() - startTime;
        logEntry.message = "Query executed succesfully"
        logEntry.elapsedTime = endTime
        logger.detach("info", logEntry);

        let response = {
            "apkdownloadPath": resultSet[0].apkdownloadPath,
            "versionCode": resultSet[0].versionCode,
            "isUpdate": resultSet[0].isUpdate,
            "message": resultSet[0].message,
            "client": resultSet[0].client,
        }
        const returnObj = newResponseObject.generateResponseObject({
            code: httpStatus.OK,
            message: newResponseMessage.success,
            data: response,
            success: true
        });
        res.status(returnObj.code).send(response);
        logEntry.message = "exiting from service"
        logger.detach("info", logEntry);
    } catch (error) {
        console.log(error)
        const returnObj = newResponseObject.generateResponseObject({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: newResponseMessage.errorResponse,
            success: false
        });
        res.status(returnObj.code).send(returnObj);
        logEntry.message = "Something went wrong"
        logEntry.stackTrace = error.toString();
        logEntry.response = returnObj
        logger.detach("info", logEntry);
    }
}

module.exports.deviceUpdate = async function deviceUpdate(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "trackerController.deviceUpdate",
        startTime: new Date(),
        request: req.body,
        requestUrl: req.url,
    }

    try {

        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        let deviceUpdateSql = "INSERT INTO device_update ( app_info, currentDate, host_id, json_update, update_content, update_thumbnail) "
            + " values ('" + req.body.app_info + "','" + req.body.current_date + "','" + req.body.host_id + "','" + req.body.json_update
            + "','" + req.body.updated_content + "','" + req.body.updated_thumbnail + "')"
        let result = await mysql.sequelize.query(deviceUpdateSql, { type: QueryTypes.SELECT });
        endTime = now() - startTime;
        logEntry.message = "Query executed succesfully"
        logEntry.query = deviceUpdateSql
        logEntry.elapsedTime = endTime
        logger.detach("info", logEntry);

        res.status(200).send({ status: 200, timestamp: new Date().getTime() });
        logEntry.message = "exiting from service"
        logger.detach("info", logEntry);

    } catch (error) {
        console.log(error)
        const returnObj = newResponseObject.generateResponseObject({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: newResponseMessage.errorResponse,
            success: false
        });
        res.status(200).send({ status: 101, timestamp: new Date().getTime() });
        logEntry.message = "Something went wrong"
        logEntry.stackTrace = error.toString();
        logEntry.response = returnObj
        logger.detach("info", logEntry);

    }

}

module.exports.missCalllogs = async function missCalllogs(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "trackerController.missCalllogs",
        startTime: new Date(),
        request: req.body,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);

        let deviceUpdateSql = "INSERT INTO miss_call_logs (call_date, call_time, customer_number, customer_call_duration, call_duration, call_transfer_duration,"
            + " call_uuid, call_status, call_transfer_status, agent_list, agent_number, recording_url, client_variable_1, client_variable_2) "
            + "VALUES ('" + req.body.call_date + "', '" + req.body.call_time + "', '" + req.body.customer_number + "', '" + req.body.customer_call_duration
            + "', '" + req.body.call_duration + "', '" + req.body.call_transfer_duration + "', '" + req.body.call_uuid + "', '" + req.body.call_status
            + "', '" + req.body.call_transfer_status + "', '" + req.body.agent_list + "', '" + req.body.agent_number + "', '" + req.body.recording_url
            + "', '" + req.body.client_variable_1 + "', '" + req.body.client_variable_2 + "');";

        let result = await mysql.sequelize.query(deviceUpdateSql, { type: QueryTypes.SELECT });
        endTime = now() - startTime;
        logEntry.message = "Query executed succesfully"
        logEntry.query = deviceUpdateSql
        logEntry.elapsedTime = endTime
        logger.detach("info", logEntry);

        res.status(200).send({ status: 200, timestamp: new Date().getTime() });
        logEntry.message = "exiting from service"
        logger.detach("info", logEntry);
    } catch (error) {
        console.log(error)
        const returnObj = newResponseObject.generateResponseObject({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: newResponseMessage.errorResponse,
            success: false
        });
        res.status(200).send({ status: 101, timestamp: new Date().getTime() });
        logEntry.message = "Something went wrong"
        logEntry.stackTrace = error.toString();
        logEntry.response = returnObj
        logger.detach("info", logEntry);

    }

}
