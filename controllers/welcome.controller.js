const httpStatus = require('http-status');
const responseObjectClass = require('../objects/responseObjectClass');
const responseMessage = require('../objects/message');
const newResponseObjectClass = responseObjectClass.ResponseObject;
const newResponseMessage = responseMessage.ResponseMessage;
const newResponseObject = new newResponseObjectClass();
const mysql = require('../database/model');
const { QueryTypes } = require('sequelize');
let now = require('performance-now');

module.exports.get = async function get(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "welcomeController.get",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        const club_registration = await mysql.sequelize.query("SELECT * FROM club_registration ", { type: QueryTypes.SELECT });
        let endTime = now() - startTime;
        logEntry.message = "Query executed succesfully"
        logEntry.elapsedTime = endTime
        logger.detach("info", logEntry);
        const returnObj = newResponseObject.generateResponseObject({
            code: httpStatus.OK,
            message: newResponseMessage.success,
            data: club_registration,
            success: true
        });
        res.status(returnObj.code).send(returnObj);

        logEntry.message = "exiting from service"
        logEntry.response = returnObj
        logger.detach("info", logEntry);
    } catch (error) {
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