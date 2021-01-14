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
            let id = element.id
            let dataLimitReached = req.body["dataLimitReached"]
            let destination = element.destination
            let duration = element.duration
            let eventId = element.eventId
            let ip = element.ip
            let journeyId = element.journeyId
            let latitude = element.latitude
            let longitude = element.longitude
            let mac = element.mac
            let menu = element.menu
            let view_model = element.model
            let msisdn = element.msisdn
            let platform_duration = element.platform_duration
            let reg_id = element.reg_id
            let session_id = element.session_id
            let source = element.source
            let timestamp = element.timestamp
            let trackingDetails = element.trackingDetails
            let user_agent = element.user_agent
            let _interface = req.body._interface
            let deviceId = req.body.deviceId
            let jsonUpdateTime = req.body.jsonUpdateTime
            let model = req.body.model
            let package = req.body.package
            let partner = req.body.partner
            let serverDeviceId = req.body.serverDeviceId
            let sync_type = req.body.sync_type
            let version = req.body.version
            let versionCode = req.body.versionCode

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
            let query = "INSERT INTO  vuscreen_tracker(partner, device_id, version, package"
                + ",interface,model,sync_date,sync_timestamp,sync_datetime,user_agent,view_timestamp,"
                + "view_model,view_duration,view_id,view_android_id,reg_id,session_id,view_date,view_datetime,ip,mac,msisdn,latitude,longitude,server_device_id,"
                + " sync_latitude, sync_longitude,type,journey_id,trackingDetails,menu,play_duration,sync_type,platform_duration,source,destination,event_id) "
                + " values('" + partner + "','" + deviceId + "','" + version + "','" + package + "','" + _interface + "','" + model + "','" + sync_date + "','" + sync_timestamp
                + "','" + sync_datetime + "','" + user_agent + "','" + timestamp + "','" + view_model + "','" + duration + "','" + id + "','" + view_android_id + "','" + reg_id + "','"
                + session_id + "','" + view_date + "','" + view_datetime + "','" + ip + "','" + mac + "','" + msisdn + "','" + latitude + "','" + longitude + "','" + serverDeviceId + "','" +
                + latitude + "','" + longitude + "','" + type + "','" + journeyId + "','" + trackingDetails + "','" + menu + "','" + play_duration + "','" + sync_type + "','" + platform_duration + "','" + source + "','" + destination + "','" + eventId + "')";
            let trackings = await mysql.sequelize.query(query, { type: QueryTypes.SELECT });
            endTime = now() - startTime;
            logEntry.message = "Tracking Query executed succesfully"
            logEntry.query = query
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            if (tracking.length == index + 1) {
                const returnObj = newResponseObject.generateResponseObject({
                    code: httpStatus.OK,
                    message: newResponseMessage.success,
                    success: true
                });
                res.status(returnObj.code).send({ status: 200, timestamp: new Date().getTime() });
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
        res.status(200).send({ status: 200, timestamp: new Date().getTime() });
        logEntry.message = "Something went wrong"
        logEntry.stackTrace = error.toString();
        logEntry.response = returnObj
        logger.detach("info", logEntry);

    }

}