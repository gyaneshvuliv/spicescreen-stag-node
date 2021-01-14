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

module.exports.register = async function register(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "registrationController.register",
        startTime: new Date(),
        request: req.body,
        requestUrl: req.url,
    }
    try {
        let { partner, password, destination, seat_start, source, seat_end, vehicle_no, _interface, deviceId, model, version, versionCode, package, storage_capacity } = req.body
        let endTime = now() - startTime;
        logEntry.message = "Request received"
        logger.detach("info", logEntry);

        let uploadedBySql = "select id,login_id,partner_password,partner_password_validity from account_management where login_id='" + partner + "'";
        let acoount = await mysql.sequelize.query(uploadedBySql, { type: QueryTypes.SELECT });
        let account_management = acoount.length > 0 ? acoount[0] : null
        endTime = now() - startTime;
        logEntry.message = "Check uploaded by Query executed succesfully"
        logEntry.query = uploadedBySql
        logEntry.elapsedTime = endTime
        logger.detach("info", logEntry);
        partner = account_management.id

        if (account_management != null) {
            // check if device already register with partner
            let checkRegistration = "select * from vuscreen_registration  where device_id='" + deviceId + "' and partner='" + partner + "'";
            let regId = await mysql.sequelize.query(checkRegistration, { type: QueryTypes.SELECT });
            regId = regId.length > 0 ? regId[0]["reg_id"] ? regId[0]["reg_id"] : null : null
            endTime = now() - startTime;
            logEntry.message = "Registartion Query executed succesfully"
            logEntry.query = checkRegistration
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            // check uploaded by Name if uploadedById is null
            if (account_management == null) {
                let uploadedByNameSql = "select id,login_id,partner_password,partner_password_validity from account_management where id='" + partner + "'";
                let uploadedByName = await mysql.sequelize.query(uploadedByNameSql, { type: QueryTypes.SELECT });
                account_management = uploadedByName.length > 0 ? uploadedByName[0] : null
                endTime = now() - startTime;
                logEntry.message = "Check uploaded by Name Query executed succesfully"
                logEntry.query = uploadedByNameSql
                logEntry.elapsedTime = endTime
                logger.detach("info", logEntry);
            }

            account_management.partner_password_validity = new Date(account_management.partner_password_validity).getTime() > new Date().getTime()
            account_management.partner_password = account_management.partner_password == password ? true : false

            if (regId == null) {
                const secret = 'aqwszxcderfvbgt'
                regId = crypto.createHmac('sha256', secret)
                    .update(partner + "_" + deviceId)
                    .digest('hex');
                // Registration
                let sync_date = null, sync_timestamp = null, sync_datetime = null
                let date = new Date();
                sync_date = moment(date).format("YYYY-MM-DD");
                sync_timestamp = date.getTime()
                sync_datetime = moment(date).format("YYYY-MM-DD HH:mm:ss");

                let query = "INSERT INTO vuscreen_registration(reg_id,vehicle_no, partner, source, destination, seat_start, seat_end, device_id, package, interface, model, sync_date, sync_timestamp, sync_datetime) "
                    + " VALUES('" + regId + "','" + vehicle_no + "', '" + partner + "', '" + source + "','" + destination + "', '" + seat_start + "', '" + seat_end + "', '" + deviceId + "', '" + package + "', '" + _interface + "', '" + model + "', '" +
                    sync_date + "','" + sync_timestamp + "','" + sync_datetime + "');            ";
                let Registration = await mysql.sequelize.query(query, { type: QueryTypes.SELECT });
                endTime = now() - startTime;
                logEntry.message = "Registration Query executed succesfully"
                logEntry.query = query
                logEntry.elapsedTime = endTime
                logger.detach("info", logEntry);
                if (Registration[1] == 1) {
                    let response = { status: "101", message: "No Authentication,Password Expired!!" }
                    if (account_management.partner_password_validity && account_management.partner_password) {
                        response["status"] = 200
                        response["reg_id"] = regId
                        response["uploaded_by"] = account_management.login_id
                        response["message"] = "Successfull Authentication"
                        const returnObj = newResponseObject.generateResponseObject({
                            code: httpStatus.OK,
                            message: newResponseMessage.success,
                            data: response,
                            success: true
                        });
                        res.status(response.status).send(response);

                        logEntry.message = "exiting from service"
                        logEntry.response = returnObj
                        logger.detach("info", logEntry);
                    } else {
                        const returnObj = newResponseObject.generateResponseObject({
                            code: httpStatus.OK,
                            message: newResponseMessage.success,
                            data: response,
                            success: true
                        });
                        res.status(500).send(response);
                        logEntry.message = "exiting from service"
                        logEntry.response = returnObj
                        logger.detach("info", logEntry);
                    }
                } else {
                    let response = { status: "101", message: "Something went wrong" }
                    const returnObj = newResponseObject.generateResponseObject({
                        code: httpStatus.OK,
                        message: newResponseMessage.success,
                        data: response,
                        success: true
                    });
                    res.status(response.status).send(response);
                    logEntry.message = "exiting from service"
                    logEntry.response = returnObj
                    logger.detach("info", logEntry);
                }
            } else {
                let response = { status: "101", message: "No Authentication,Password Expired!!" }
                if (account_management.partner_password_validity && account_management.partner_password) {
                    response["status"] = 200
                    response["reg_id"] = regId
                    response["uploaded_by"] = account_management.login_id
                    response["message"] = "Successfull Authentication"
                    const returnObj = newResponseObject.generateResponseObject({
                        code: httpStatus.OK,
                        message: newResponseMessage.success,
                        data: response,
                        success: true
                    });
                    res.status(response.status).send(response);
                    logEntry.message = "exiting from service"
                    logEntry.response = returnObj
                    logger.detach("info", logEntry);
                } else {
                    const returnObj = newResponseObject.generateResponseObject({
                        code: httpStatus.OK,
                        message: newResponseMessage.success,
                        data: response,
                        success: true
                    });
                    res.status(500).send(response);
                    logEntry.message = "exiting from service"
                    logEntry.response = returnObj
                    logger.detach("info", logEntry);
                }
            }
        } else {
            let response = { status: "101", message: "Partner not found!" }
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: response,
                success: true
            });
            res.status(500).send(response);
            logEntry.message = "exiting from service"
            logEntry.response = returnObj
            logger.detach("info", logEntry);
        }

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

