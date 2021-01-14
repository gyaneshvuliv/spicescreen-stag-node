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
global.feedByStorageWatch = {}
global.feedByStorageAD = {}
global.feedByStorageAD_WEB = {}
global.feedByStorageRead = {}
global.feedByStorageTravel = {}
global.feedByStorageStore = {}
global.feedByStorageMall = {}
global.feedByStorageFnb = {}
global.feedByStorageService = {}
global.feedByStorageLivestream = {}
global.feedByStorageMultiPlayerGame = {}
global.feedByStorageLongCode = {}
global.feedByStorageLandingPage = {}
let InsertWatchContentDetails = new Map();
let contentMap = new Map();


module.exports.initailizeMaps = async function initailizeMaps(req, res) {

    try {
        request('http://localhost:' + port + subUrl + '/watch?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })


        request('http://localhost:' + port + subUrl + '/ad?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })

        request('http://localhost:' + port + subUrl + '/ad-web?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })

        request('http://localhost:' + port + subUrl + '/read?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })


        request('http://localhost:' + port + subUrl + '/travel?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })

        request('http://localhost:' + port + subUrl + '/store?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })

        request('http://localhost:' + port + subUrl + '/mall?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })


        request('http://localhost:' + port + subUrl + '/fnb?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })

        request('http://localhost:' + port + subUrl + '/service?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })

        request('http://localhost:' + port + subUrl + '/livestream?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })

        request('http://localhost:' + port + subUrl + '/multiPlayerGame?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })

        request('http://localhost:' + port + subUrl + '/longcode?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })
        request('http://localhost:' + port + subUrl + '/landingPage?initialize=true', function (error, response, body) {
            if (!error) {
                // console.log(response.body)
            }
        })

        let startTime = now();
        let logEntry = {
            operationName: "feedByStorage.initailizeMaps",
            startTime: new Date(),
            request: req.query,
            requestUrl: req.url,
        }
        let endTime = now() - startTime;
        logEntry.message = "Cached response return successfully"
        logEntry.elapsedTime = endTime
        logger.detach("info", logEntry);
        const returnObj = newResponseObject.generateResponseObject({
            code: httpStatus.OK,
            message: newResponseMessage.success,
            data: "Cached Response updated successfully",
            success: true
        });
        res.status(returnObj.code).send(returnObj);
        logEntry.message = "exiting from service"
        logger.detach("info", logEntry);
    } catch (error) {
        console.log(error)
    }
}

module.exports.feedByStorage = async function feedByStorage(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.feedByStorage",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    let endTime = now() - startTime;
    logEntry.message = "Cached response return successfully"
    logEntry.elapsedTime = endTime
    logger.detach("info", logEntry);
    let response = {
        WATCH: feedByStorageWatch.WATCH,
        AD: feedByStorageAD.AD,
        AD_WEB: feedByStorageAD_WEB.AD_WEB,
        READ: feedByStorageRead.READ,
        TRAVEL: feedByStorageTravel.TRAVEL,
        STORE: feedByStorageStore.STORE,
        MALL: feedByStorageMall.MALL,
        FNB: feedByStorageFnb.FNB,
        SERVICE: feedByStorageService.SERVICE,
        LIVESTREAM: feedByStorageLivestream.LIVESTREAM,
        MULTIPLAYER_GAME: feedByStorageMultiPlayerGame.MULTIPLAYER_GAME,
        LONGCODE: feedByStorageLongCode.LONGCODE,
        LANDING_PAGE: feedByStorageLandingPage.LANDING_PAGE,
        CITY_NAME: []
    }
    const returnObj = newResponseObject.generateResponseObject({
        code: httpStatus.OK,
        message: newResponseMessage.success,
        data: response,
        success: true
    });
    res.status(returnObj.code).send(response);
    logEntry.message = "exiting from service"
    // logEntry.response = returnObj
    logger.detach("info", logEntry);
}




module.exports.watch = async function watch(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.watch",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            InsertWatchContentDetails = new Map();
            await insertDuplicateContentInWatchSection();
            let dbCat = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='CATEGORY_ID'", { type: QueryTypes.SELECT })  //[1, 2, 7, 6]
            let dbFolder = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='FOLDER_ID'", { type: QueryTypes.SELECT }) // [1, 3, 11, 12, 13, 20, 22, 23, 25, 26, 27, 28, 30, 31, 32, 33, 35, 36, 51, 52, 55, 56, 57, 54, 109, 207, 58, 59]
            let CATEGORY = dbCat[0].conf_value.split(",")  //[1, 2, 7, 6]
            let FOLDER = dbFolder[0].conf_value.split(",") // [1, 3, 11, 12, 13, 20, 22, 23, 25, 26, 27, 28, 30, 31, 32, 33, 35, 36, 51, 52, 55, 56, 57, 54, 109, 207, 58, 59]

            let response = { "WATCH": [] }

            for (let index = 0; index < CATEGORY.length; index++) {
                const categoryIdElement = CATEGORY[index];
                let superCat = {
                    "id": null,
                    "category": null,
                    "position": null,
                    "cat_view": null,
                    "subCat": []
                }
                for (let folderIndex = 0; folderIndex < FOLDER.length; folderIndex++) {
                    const folderIdElement = FOLDER[folderIndex];
                    let subcat = {}
                    let sql = "SELECT A.*, B.id AS folder_ida, B.folder AS folder_name, "
                        + " B.view AS folder_view, B.position AS folder_position, "
                        + " B.top_banner_thumbnail,B.top_banner_url,B.bottom_banner_thumbnail,B.bottom_banner_url, B.check_display,B.city as folder_city,"
                        + " C.id AS cat_id, C.category AS cat_name, C.view AS cat_view, C.position AS cat_position "
                        + " FROM vuscreen_content_package A, vuscreen_folders B, vuscreen_super_category C"
                        + " WHERE A.folder_id = B.id AND B.category_id=C.id and A.status = 1 AND B.status = 1 AND C.status = 1 AND A.folder_id=" + folderIdElement
                        + "  AND B.category_id=" + categoryIdElement + " AND end_time >="
                        + new Date().getTime() + " order by A.position asc";
                    const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
                    if (resultSet.length > 0) {
                        if (superCat["id"] != resultSet[0].cat_id) {
                            superCat = {
                                "id": resultSet[0].cat_id,
                                "category": resultSet[0].cat_name,
                                "position": resultSet[0].cat_position,
                                "cat_view": resultSet[0].cat_view,
                                "subCat": []
                            }
                        }

                        subcat = {
                            "id": resultSet[0].folder_ida,
                            "folder": resultSet[0].folder_name,
                            "position": resultSet[0].folder_position,
                            "top_banner_thumbnail": resultSet[0].top_banner_thumbnail,
                            "top_banner_url": resultSet[0].top_banner_url,
                            "bottom_banner_thumbnail": resultSet[0].bottom_banner_thumbnail,
                            "bottom_banner_url": resultSet[0].bottom_banner_url,
                            "check_display": resultSet[0].check_display,
                            "city": resultSet[0].folder_city,
                            "content": []
                        }


                        for (let resultSetIndex = 0; resultSetIndex < resultSet.length; resultSetIndex++) {
                            const resultSetElement = resultSet[resultSetIndex];
                            let content = {
                                "id": resultSetElement.content_id,
                                "name": resultSetElement.title,
                                "thumbnail": resultSetElement.thumbnail,
                                "type": resultSetElement.type,
                                "start_time": resultSetElement.start_time,
                                "end_time": resultSetElement.end_time,
                                "duration": resultSetElement.duration,
                                "MidrollDuration": resultSetElement.midroll_duration,
                                "logo": resultSetElement.logo,
                                "platform": resultSetElement.platform,
                                "position": resultSetElement.position,
                                "genre": resultSetElement.genre,
                                "description": resultSetElement.description,
                                "url": resultSetElement.url,
                                "rating": resultSetElement.rating,
                                "cast": resultSetElement.cast,
                                "release_date": resultSetElement.release_date,
                                "country": resultSetElement.country,
                                "language": resultSetElement.language,
                                "isAd": resultSetElement.is_ad,
                                "banner_thumbnail": resultSetElement.banner_thumbnail,
                                "banner_url": resultSetElement.banner_url,
                                "display_type": resultSetElement.display_type,
                                "city": resultSetElement.city

                            }
                            contentMap.set(resultSetElement.content_id.toString(), content)
                            subcat.content.push(content)
                            if (resultSet.length == resultSetIndex + 1) {
                                superCat.subCat.push(subcat)
                            }
                        }
                    }
                }
                response.WATCH.push(superCat)

                if (CATEGORY.length == index + 1) {
                    finalResponse = response
                    global.feedByStorageWatch = response
                    if (InsertWatchContentDetails.size > 0) {
                        finalResponse = await addExtraContent(response);
                    }

                    let endTime = now() - startTime;
                    logEntry.message = "Query executed succesfully"
                    logEntry.elapsedTime = endTime
                    logger.detach("info", logEntry);
                    const returnObj = newResponseObject.generateResponseObject({
                        code: httpStatus.OK,
                        message: newResponseMessage.success,
                        data: finalResponse,
                        success: true
                    });
                    res.status(returnObj.code).send(returnObj);

                    logEntry.message = "exiting from service"
                    // logEntry.response = returnObj
                    logger.detach("info", logEntry);
                }
            }

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageWatch,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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

async function insertDuplicateContentInWatchSection() {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.insertDuplicateContentInWatchSection",
        startTime: new Date(),
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        const resultSet = await mysql.sequelize.query("SELECT id,folder_id,content_id,position FROM vuscreen_extra_content", { type: QueryTypes.SELECT });
        let endTime = now() - startTime;
        logEntry.message = "Query executed succesfully"
        logEntry.elapsedTime = endTime
        logger.detach("info", logEntry);
        for (let index = 0; index < resultSet.length; index++) {
            const element = resultSet[index];
            if (InsertWatchContentDetails.has(element.folder_id)) {
                let list = InsertWatchContentDetails.get(element.folder_id);
                let obj = {
                    folder_id: element.folder_id,
                    content_id: element.content_id,
                    position: element.content_id,
                }
                list.push(obj)
                InsertWatchContentDetails.set(element.folder_id.toString(), list);
            } else {
                let list = []
                let obj = {
                    folder_id: element.folder_id,
                    content_id: element.content_id,
                    position: element.content_id,
                }
                list.push(obj)
                InsertWatchContentDetails.set(element.folder_id.toString(), list);
            }
        }
        logEntry.message = "exiting from service"
        logger.detach("info", logEntry);
    } catch (error) {
        console.log(error)
        logEntry.message = "Something went wrong"
        logEntry.stackTrace = error.toString();
        logger.detach("info", logEntry);
    }

}

async function addExtraContent(feed) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.addExtraContent",
        startTime: new Date(),
    }
    let response = {}
    Object.assign(response, feed)
    for (let watchIndex = 0; watchIndex < response.WATCH.length; watchIndex++) {
        const watchElement = response.WATCH[watchIndex];
        logEntry.message = "Super Categry loop : " + watchElement.category
        logger.detach("info", logEntry);
        for (let subCatIndex = 0; subCatIndex < watchElement.subCat.length; subCatIndex++) {
            const subCatElement = watchElement.subCat[subCatIndex];
            logEntry.message = "Sub Categry loop : " + subCatElement.folder
            logger.detach("info", logEntry);
            if (InsertWatchContentDetails.has(subCatElement.id.toString())) {
                let list = InsertWatchContentDetails.get(subCatElement.id.toString());
                for (let contentIndex = 0; contentIndex < list.length; contentIndex++) {
                    const contentElement = list[contentIndex];
                    if (contentMap.has(contentElement.content_id.toString())) {
                        let content = contentMap.get(contentElement.content_id.toString());
                        content.position = contentElement.position
                        logEntry.message = "Extra content " + content.name + " added in : " + subCatElement.folder + ""
                        logger.detach("info", logEntry);
                        subCatElement.content.push(content)
                    }
                }
            }
        }
        if (response.WATCH.length == watchIndex + 1) {
            return response
        }
    }
}

module.exports.ad = async function ad(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.ad",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            let response = { "AD": [] }
            let sql = "select * from vuscreen_advertise_content where status=1";
            const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
            let endTime = now() - startTime;
            logEntry.message = "Query executed succesfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);

            for (let index = 0; index < resultSet.length; index++) {
                const element = resultSet[index];
                let obj = {
                    "id": element["id"],
                    "name": element["title"],
                    "url": element["url"],
                    "thumbnail": element["thumbnail"],
                    "type": element["type"],
                    "platform": element["platform"],
                    "start_time": element["start_time"],
                    "end_time": element["end_time"],
                    "position": element["position"],
                    "duration": element["duration"],
                    "section": element["section"],
                    "subcat_id": element["subcat_id"],
                    "subcat_position": element["subcat_position"],
                    "format": element["format"],
                    "cast": element["cast"],
                    "description": element["description"],
                    "deeplink": element["deeplink"],
                    "city": element["city"],
                    "interstitial_time": element["interstitial_time"],
                    "interstitial_count": element["interstitial_count"],
                    "campaignName": element["campaignName"],
                }
                response.AD.push(obj)
                if (resultSet.length == index + 1) {
                    global.feedByStorageAD = response
                }
            }


            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: response,
                success: true
            });
            res.status(returnObj.code).send(returnObj);

            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
            logger.detach("info", logEntry);

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageAD,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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

module.exports.ad_web = async function ad_web(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.ad_web",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            let response = { "AD_WEB": [] }
            let sql = "select * from vuscreen_advertise_content_web where status=1";
            const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
            let endTime = now() - startTime;
            logEntry.message = "Query executed succesfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);

            for (let index = 0; index < resultSet.length; index++) {
                const element = resultSet[index];
                let obj = {
                    "id": element["id"],
                    "name": element["title"],
                    "url": element["url"],
                    "thumbnail": element["thumbnail"],
                    "type": element["type"],
                    "platform": element["platform"],
                    "start_time": element["start_time"],
                    "end_time": element["end_time"],
                    "position": element["position"],
                    "duration": element["duration"],
                    "section": element["section"],
                    "subcat_id": element["subcat_id"],
                    "subcat_position": element["subcat_position"],
                    "format": element["format"],
                    "cast": element["cast"],
                    "description": element["description"],
                    "deeplink": element["deeplink"],
                    "city": element["city"],
                    "interstitial_time": element["interstitial_time"],
                    "interstitial_count": element["interstitial_count"],
                    "campaignName": element["campaignName"],
                    "brandName": element["brandName"],
                }
                response.AD_WEB.push(obj)
                if (resultSet.length == index + 1) {
                    global.feedByStorageAD_WEB = response
                }
            }


            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: response,
                success: true
            });
            res.status(returnObj.code).send(returnObj);

            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
            logger.detach("info", logEntry);

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageAD_WEB,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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

module.exports.read = async function read(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.read",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            let dbCat = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='READ_CATEGORY_ID'", { type: QueryTypes.SELECT })  //[1, 2, 7, 6]
            let dbFolder = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='READ_FOLDER_ID'", { type: QueryTypes.SELECT }) // [1, 3, 11, 12, 13, 20, 22, 23, 25, 26, 27, 28, 30, 31, 32, 33, 35, 36, 51, 52, 55, 56, 57, 54, 109, 207, 58, 59]
            let CATEGORY = dbCat[0].conf_value.split(",")
            let FOLDER = dbFolder[0].conf_value.split(",")

            let response = { "READ": [] }

            for (let index = 0; index < CATEGORY.length; index++) {
                const categoryIdElement = CATEGORY[index];
                let superCat = {
                    "id": null,
                    "category": null,
                    "position": null,
                    "subCat": []
                }
                for (let folderIndex = 0; folderIndex < FOLDER.length; folderIndex++) {
                    const folderIdElement = FOLDER[folderIndex];
                    let subcat = {}
                    let sql = "SELECT A.*, B.id AS folder_ida, B.folder AS folder_name,  B.view AS folder_view, B.position AS folder_position,B.city as folder_city,"
                        + " C.id AS cat_id, C.category AS cat_name, C.view AS cat_view, C.position AS cat_position"
                        + " FROM vuscreen_read_content A JOIN vuscreen_read_folders B  JOIN vuscreen_read_super_category C "
                        + " ON A.folder_id = B.id AND B.category_id = C.id "
                        + " WHERE A.status = 1 AND B.status = 1 AND C.status = 1 AND A.folder_id = " + folderIdElement
                        + " AND B.category_id = " + categoryIdElement + " AND end_time >= " + new Date().getTime()
                        + " ORDER BY A.position";
                    const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
                    if (resultSet.length > 0) {
                        if (superCat["id"] != resultSet[0].cat_id) {
                            superCat = {
                                "id": resultSet[0].cat_id,
                                "category": resultSet[0].cat_name,
                                "position": resultSet[0].cat_position,
                                "cat_view": resultSet[0].cat_view,
                                "subCat": []
                            }
                        }
                        subcat = {
                            "id": resultSet[0].folder_ida,
                            "folder": resultSet[0].folder_name,
                            "position": resultSet[0].folder_position,
                            "city": resultSet[0].folder_city,
                            "content": []
                        }

                        for (let resultSetIndex = 0; resultSetIndex < resultSet.length; resultSetIndex++) {
                            const resultSetElement = resultSet[resultSetIndex];
                            let content = {
                                "id": resultSetElement.content_id,
                                "name": resultSetElement.title,
                                "thumbnail": resultSetElement.thumbnail + "," + resultSetElement.thumbnail_1
                                    + "," + resultSetElement.thumbnail_2 + "," + resultSetElement.thumbnail_3,
                                "type": resultSetElement.type,
                                "start_time": resultSetElement.start_time,
                                "end_time": resultSetElement.end_time,
                                "platform": resultSetElement.platform,
                                "position": resultSetElement.position,
                                "description": resultSetElement.description,
                                "url": resultSetElement.url,
                                "city": resultSetElement.city

                            }
                            subcat.content.push(content)
                            if (resultSet.length == resultSetIndex + 1) {
                                superCat.subCat.push(subcat)
                            }
                        }
                    }
                }
                response.READ.push(superCat)

                if (CATEGORY.length == index + 1) {
                    global.feedByStorageRead = response
                    let endTime = now() - startTime;
                    logEntry.message = "Query executed succesfully"
                    logEntry.elapsedTime = endTime
                    logger.detach("info", logEntry);
                    const returnObj = newResponseObject.generateResponseObject({
                        code: httpStatus.OK,
                        message: newResponseMessage.success,
                        data: response,
                        success: true
                    });
                    res.status(returnObj.code).send(returnObj);
                    logEntry.message = "exiting from service"
                    // logEntry.response = returnObj
                    logger.detach("info", logEntry);
                }
            }

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageRead,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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


module.exports.travel = async function travel(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.travel",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            let dbCat = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='TRAVEL_CATEGORY_ID'", { type: QueryTypes.SELECT })  //[1, 2, 7, 6]
            let dbFolder = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='TRAVEL_FOLDER_ID'", { type: QueryTypes.SELECT }) // [1, 3, 11, 12, 13, 20, 22, 23, 25, 26, 27, 28, 30, 31, 32, 33, 35, 36, 51, 52, 55, 56, 57, 54, 109, 207, 58, 59]
            let CATEGORY = dbCat[0].conf_value.split(",")
            let FOLDER = dbFolder[0].conf_value.split(",")

            let response = { "TRAVEL": [] }

            for (let index = 0; index < CATEGORY.length; index++) {
                const categoryIdElement = CATEGORY[index];
                let superCat = {
                    "id": null,
                    "category": null,
                    "position": null,
                    "subCat": []
                }
                for (let folderIndex = 0; folderIndex < FOLDER.length; folderIndex++) {
                    const folderIdElement = FOLDER[folderIndex];
                    let subcat = {}
                    let sql = "SELECT A.*, B.id AS folder_ida, B.folder AS folder_name,  B.view AS folder_view, B.position AS folder_position,B.city as folder_city, "
                        + " C.id AS cat_id, C.category AS cat_name, C.view AS cat_view, C.position AS cat_position"
                        + " FROM vuscreen_travel_content A JOIN vuscreen_travel_folders B  JOIN vuscreen_travel_super_category C "
                        + " ON A.folder_id = B.id AND B.category_id = C.id "
                        + " WHERE A.status = 1 AND B.status = 1 AND C.status = 1 AND A.folder_id = " + folderIdElement
                        + " AND B.category_id = " + categoryIdElement + " AND end_time >= " + new Date().getTime()
                        + " ORDER BY A.position";
                    const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
                    if (resultSet.length > 0) {
                        if (superCat["id"] != resultSet[0].cat_id) {
                            superCat = {
                                "id": resultSet[0].cat_id,
                                "category": resultSet[0].cat_name,
                                "position": resultSet[0].cat_position,
                                "cat_view": resultSet[0].cat_view,
                                "subCat": []
                            }
                        }
                        subcat = {
                            "id": resultSet[0].folder_ida,
                            "folder": resultSet[0].folder_name,
                            "position": resultSet[0].folder_position,
                            "city": resultSet[0].folder_city,
                            "content": []
                        }

                        for (let resultSetIndex = 0; resultSetIndex < resultSet.length; resultSetIndex++) {
                            const resultSetElement = resultSet[resultSetIndex];
                            let content = {
                                "id": resultSetElement.content_id,
                                "name": resultSetElement.title,
                                "thumbnail": resultSetElement.thumbnail + "," + resultSetElement.thumbnail_1
                                    + "," + resultSetElement.thumbnail_2 + "," + resultSetElement.thumbnail_3,
                                "type": resultSetElement.type,
                                "start_time": resultSetElement.start_time,
                                "end_time": resultSetElement.end_time,
                                "platform": resultSetElement.platform,
                                "position": resultSetElement.position,
                                "description": resultSetElement.description,
                                "url": resultSetElement.url,
                                "city": resultSetElement.city,
                                "price": resultSetElement.price,
                                "coupon_code": resultSetElement.coupon_code,
                                "coupon_code_percentage": resultSetElement.coupon_code_percentage,
                                "coupon_card_url": resultSetElement.coupon_card_url,
                                "ecom_link": resultSetElement.ecom_link,
                                "tnc": resultSetElement.tnc,
                            }
                            subcat.content.push(content)
                            if (resultSet.length == resultSetIndex + 1) {
                                superCat.subCat.push(subcat)
                            }
                        }
                    }
                }
                response.TRAVEL.push(superCat)

                if (CATEGORY.length == index + 1) {
                    global.feedByStorageTravel = response
                    let endTime = now() - startTime;
                    logEntry.message = "Query executed succesfully"
                    logEntry.elapsedTime = endTime
                    logger.detach("info", logEntry);
                    const returnObj = newResponseObject.generateResponseObject({
                        code: httpStatus.OK,
                        message: newResponseMessage.success,
                        data: response,
                        success: true
                    });
                    res.status(returnObj.code).send(returnObj);
                    logEntry.message = "exiting from service"
                    // logEntry.response = returnObj
                    logger.detach("info", logEntry);
                }
            }

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageTravel,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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


module.exports.store = async function store(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.store",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            let dbCat = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='STORE_CATEGORY_ID'", { type: QueryTypes.SELECT })  //[1, 2, 7, 6]
            let dbFolder = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='STORE_FOLDER_ID'", { type: QueryTypes.SELECT }) // [1, 3, 11, 12, 13, 20, 22, 23, 25, 26, 27, 28, 30, 31, 32, 33, 35, 36, 51, 52, 55, 56, 57, 54, 109, 207, 58, 59]
            let CATEGORY = dbCat[0].conf_value.split(",")
            let FOLDER = dbFolder[0].conf_value.split(",")

            let response = { "STORE": [] }

            for (let index = 0; index < CATEGORY.length; index++) {
                const categoryIdElement = CATEGORY[index];
                let superCat = {
                    "id": null,
                    "category": null,
                    "position": null,
                    "subCat": []
                }
                for (let folderIndex = 0; folderIndex < FOLDER.length; folderIndex++) {
                    const folderIdElement = FOLDER[folderIndex];
                    let subcat = {}
                    let sql = "SELECT A.*, B.id AS folder_ida, B.folder AS folder_name,  B.view AS folder_view, B.position AS folder_position,B.city as folder_city, "
                        + " B.top_banner_thumbnail,B.top_banner_url,B.bottom_banner_thumbnail,B.bottom_banner_url, "
                        + " C.id AS cat_id, C.category AS cat_name, C.view AS cat_view, C.position AS cat_position"
                        + " FROM vuscreen_store_content A JOIN vuscreen_store_folders B  JOIN vuscreen_store_super_category C "
                        + " ON A.folder_id = B.id AND B.category_id = C.id "
                        + " WHERE A.status = 1 AND B.status = 1 AND C.status = 1 AND A.folder_id = " + folderIdElement
                        + " AND B.category_id = " + categoryIdElement + " AND end_time >= " + new Date().getTime()
                        + " ORDER BY A.position";
                    const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
                    if (resultSet.length > 0) {
                        if (superCat["id"] != resultSet[0].cat_id) {
                            superCat = {
                                "id": resultSet[0].cat_id,
                                "category": resultSet[0].cat_name,
                                "position": resultSet[0].cat_position,
                                "cat_view": resultSet[0].cat_view,
                                "subCat": []
                            }
                        }
                        subcat = {
                            "id": resultSet[0].folder_ida,
                            "folder": resultSet[0].folder_name,
                            "position": resultSet[0].folder_position,
                            "top_banner_thumbnail": resultSet[0].top_banner_thumbnail,
                            "top_banner_url": resultSet[0].top_banner_url,
                            "bottom_banner_thumbnail": resultSet[0].bottom_banner_thumbnail,
                            "bottom_banner_url": resultSet[0].bottom_banner_url,
                            "city": resultSet[0].folder_city,
                            "content": []
                        }

                        for (let resultSetIndex = 0; resultSetIndex < resultSet.length; resultSetIndex++) {
                            const resultSetElement = resultSet[resultSetIndex];
                            let content = {
                                "id": resultSetElement.content_id,
                                "name": resultSetElement.title,
                                "thumbnail": resultSetElement.thumbnail + "," + resultSetElement.thumbnail_1
                                    + "," + resultSetElement.thumbnail_2 + "," + resultSetElement.thumbnail_3,
                                "type": resultSetElement.type,
                                "start_time": resultSetElement.start_time,
                                "end_time": resultSetElement.end_time,
                                "platform": resultSetElement.platform,
                                "position": resultSetElement.position,
                                "description": resultSetElement.description,
                                "url": resultSetElement.url,
                                "websiteUrl": resultSetElement.websiteUrl,
                                "city": resultSetElement.city,

                            }
                            subcat.content.push(content)
                            if (resultSet.length == resultSetIndex + 1) {
                                superCat.subCat.push(subcat)
                            }
                        }
                    }
                }
                response.STORE.push(superCat)

                if (CATEGORY.length == index + 1) {
                    global.feedByStorageStore = response
                    let endTime = now() - startTime;
                    logEntry.message = "Query executed succesfully"
                    logEntry.elapsedTime = endTime
                    logger.detach("info", logEntry);
                    const returnObj = newResponseObject.generateResponseObject({
                        code: httpStatus.OK,
                        message: newResponseMessage.success,
                        data: response,
                        success: true
                    });
                    res.status(returnObj.code).send(returnObj);
                    logEntry.message = "exiting from service"
                    // logEntry.response = returnObj
                    logger.detach("info", logEntry);
                }
            }

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageStore,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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


module.exports.mall = async function mall(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.mall",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            let dbCat = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='MALL_CATEGORY_ID'", { type: QueryTypes.SELECT })  //[1, 2, 7, 6]
            let dbFolder = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='MALL_FOLDER_ID'", { type: QueryTypes.SELECT }) // [1, 3, 11, 12, 13, 20, 22, 23, 25, 26, 27, 28, 30, 31, 32, 33, 35, 36, 51, 52, 55, 56, 57, 54, 109, 207, 58, 59]
            let CATEGORY = dbCat[0].conf_value.split(",")
            let FOLDER = dbFolder[0].conf_value.split(",")

            let response = { "MALL": [] }

            for (let index = 0; index < CATEGORY.length; index++) {
                const categoryIdElement = CATEGORY[index];
                let superCat = {
                    "id": null,
                    "category": null,
                    "position": null,
                    "subCat": []
                }
                for (let folderIndex = 0; folderIndex < FOLDER.length; folderIndex++) {
                    const folderIdElement = FOLDER[folderIndex];
                    let subcat = {}
                    let sql = "SELECT A.*, B.id AS folder_ida, B.folder AS folder_name,  B.view AS folder_view, B.position AS folder_position, B.city as folder_city,"
                        + " C.id AS cat_id, C.category AS cat_name, C.view AS cat_view, C.position AS cat_position"
                        + " FROM vuscreen_mall_content A JOIN vuscreen_mall_folders B  JOIN vuscreen_mall_super_category C "
                        + " ON A.folder_id = B.id AND B.category_id = C.id "
                        + " WHERE A.status = 1 AND B.status = 1 AND C.status = 1 AND A.folder_id = " + folderIdElement
                        + " AND B.category_id = " + categoryIdElement + " AND end_time >= " + new Date().getTime()
                        + " ORDER BY A.position";
                    const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
                    if (resultSet.length > 0) {
                        if (superCat["id"] != resultSet[0].cat_id) {
                            superCat = {
                                "id": resultSet[0].cat_id,
                                "category": resultSet[0].cat_name,
                                "position": resultSet[0].cat_position,
                                "cat_view": resultSet[0].cat_view,
                                "subCat": []
                            }
                        }
                        subcat = {
                            "id": resultSet[0].folder_ida,
                            "folder": resultSet[0].folder_name,
                            "position": resultSet[0].folder_position,
                            "city": resultSet[0].folder_city,
                            "content": []
                        }

                        for (let resultSetIndex = 0; resultSetIndex < resultSet.length; resultSetIndex++) {
                            const resultSetElement = resultSet[resultSetIndex];
                            let content = {
                                "id": resultSetElement.content_id,
                                "name": resultSetElement.title,
                                "thumbnail": resultSetElement.thumbnail + "," + resultSetElement.thumbnail_1
                                    + "," + resultSetElement.thumbnail_2 + "," + resultSetElement.thumbnail_3,
                                "type": resultSetElement.type,
                                "start_time": resultSetElement.start_time,
                                "end_time": resultSetElement.end_time,
                                "platform": resultSetElement.platform,
                                "position": resultSetElement.position,
                                "description": resultSetElement.description,
                                "url": resultSetElement.url,
                                "city": resultSetElement.city,
                                "price": resultSetElement.price,
                                "coupon_code": resultSetElement.coupon_code,
                                "couponCodePer": resultSetElement.coupon_code_percentage,
                                "coupon_card_url": resultSetElement.coupon_card_url,
                                "ecom_link": resultSetElement.ecom_link,
                                "tnc": resultSetElement.tnc,

                            }
                            subcat.content.push(content)
                            if (resultSet.length == resultSetIndex + 1) {
                                superCat.subCat.push(subcat)
                            }
                        }
                    }
                }
                response.MALL.push(superCat)

                if (CATEGORY.length == index + 1) {
                    global.feedByStorageMall = response
                    let endTime = now() - startTime;
                    logEntry.message = "Query executed succesfully"
                    logEntry.elapsedTime = endTime
                    logger.detach("info", logEntry);
                    const returnObj = newResponseObject.generateResponseObject({
                        code: httpStatus.OK,
                        message: newResponseMessage.success,
                        data: response,
                        success: true
                    });
                    res.status(returnObj.code).send(returnObj);
                    logEntry.message = "exiting from service"
                    // logEntry.response = returnObj
                    logger.detach("info", logEntry);
                }
            }

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageMall,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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


module.exports.fnb = async function fnb(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.fnb",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            let dbCat = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='FNB_CATEGORY_ID'", { type: QueryTypes.SELECT })  //[1, 2, 7, 6]
            let dbFolder = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='FNB_FOLDER_ID'", { type: QueryTypes.SELECT }) // [1, 3, 11, 12, 13, 20, 22, 23, 25, 26, 27, 28, 30, 31, 32, 33, 35, 36, 51, 52, 55, 56, 57, 54, 109, 207, 58, 59]
            let CATEGORY = dbCat[0].conf_value.split(",")
            let FOLDER = dbFolder[0].conf_value.split(",")

            let response = { "FNB": [] }

            for (let index = 0; index < CATEGORY.length; index++) {
                const categoryIdElement = CATEGORY[index];
                let superCat = {
                    "id": null,
                    "category": null,
                    "position": null,
                    "subCat": []
                }
                for (let folderIndex = 0; folderIndex < FOLDER.length; folderIndex++) {
                    const folderIdElement = FOLDER[folderIndex];
                    let subcat = {}
                    let sql = "SELECT A.*, B.id AS folder_ida, B.folder AS folder_name,  B.view AS folder_view, B.position AS folder_position, B.city as folder_city,"
                        + " C.id AS cat_id, C.category AS cat_name, C.view AS cat_view, C.position AS cat_position"
                        + " FROM vuscreen_fnb_content A JOIN vuscreen_fnb_folders B  JOIN vuscreen_fnb_super_category C "
                        + " ON A.folder_id = B.id AND B.category_id = C.id "
                        + " WHERE A.status = 1 AND B.status = 1 AND C.status = 1 AND A.folder_id = " + folderIdElement
                        + " AND B.category_id = " + categoryIdElement + " AND end_time >= " + new Date().getTime()
                        + " ORDER BY A.position";
                    const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
                    if (resultSet.length > 0) {
                        if (superCat["id"] != resultSet[0].cat_id) {
                            superCat = {
                                "id": resultSet[0].cat_id,
                                "category": resultSet[0].cat_name,
                                "position": resultSet[0].cat_position,
                                "cat_view": resultSet[0].cat_view,
                                "subCat": []
                            }
                        }
                        subcat = {
                            "id": resultSet[0].folder_ida,
                            "folder": resultSet[0].folder_name,
                            "position": resultSet[0].folder_position,
                            "city": resultSet[0].folder_city,
                            "content": []
                        }

                        for (let resultSetIndex = 0; resultSetIndex < resultSet.length; resultSetIndex++) {
                            const resultSetElement = resultSet[resultSetIndex];
                            let content = {
                                "id": resultSetElement.content_id,
                                "name": resultSetElement.title,
                                "thumbnail": resultSetElement.thumbnail + "," + resultSetElement.thumbnail_1
                                    + "," + resultSetElement.thumbnail_2 + "," + resultSetElement.thumbnail_3,
                                "type": resultSetElement.type,
                                "start_time": resultSetElement.start_time,
                                "end_time": resultSetElement.end_time,
                                "platform": resultSetElement.platform,
                                "position": resultSetElement.position,
                                "description": resultSetElement.description,
                                "url": resultSetElement.url,
                                "city": resultSetElement.city,
                                "price": resultSetElement.price,
                                "coupon_code": resultSetElement.coupon_code,
                                "couponCodePer": resultSetElement.coupon_code_percentage,
                                "coupon_card_url": resultSetElement.coupon_card_url,
                                "ecom_link": resultSetElement.ecom_link,
                                "tnc": resultSetElement.tnc,

                            }
                            subcat.content.push(content)
                            if (resultSet.length == resultSetIndex + 1) {
                                superCat.subCat.push(subcat)
                            }
                        }
                    }
                }
                response.FNB.push(superCat)

                if (CATEGORY.length == index + 1) {
                    global.feedByStorageFnb = response
                    let endTime = now() - startTime;
                    logEntry.message = "Query executed succesfully"
                    logEntry.elapsedTime = endTime
                    logger.detach("info", logEntry);
                    const returnObj = newResponseObject.generateResponseObject({
                        code: httpStatus.OK,
                        message: newResponseMessage.success,
                        data: response,
                        success: true
                    });
                    res.status(returnObj.code).send(returnObj);
                    logEntry.message = "exiting from service"
                    // logEntry.response = returnObj
                    logger.detach("info", logEntry);
                }
            }

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageFnb,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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


module.exports.service = async function service(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.service",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            let response = { "SERVICE": [] }
            let sql = "SELECT * from vuscreen_service_feeds";
            const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
            let endTime = now() - startTime;
            logEntry.message = "Query executed succesfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);

            for (let index = 0; index < resultSet.length; index++) {
                const element = resultSet[index];
                let obj = {
                    "id": element["id"],
                    "name": element["name"],
                    "thumbnail": element["thumbnail"],
                    "type": element["type"],
                    "platform": element["platform"],
                    "start_time": element["start_time"],
                    "end_time": element["end_time"],
                    "section": element["section"],
                    "format": element["format"],
                    "cast": element["cast"],
                    "description": element["description"],
                }
                response.SERVICE.push(obj)
                if (resultSet.length == index + 1) {
                    global.feedByStorageService = response
                }
            }
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: response,
                success: true
            });
            res.status(returnObj.code).send(returnObj);

            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
            logger.detach("info", logEntry);

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageService,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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


module.exports.livestream = async function livestream(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.livestream",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            let response = { "LIVESTREAM": [] }
            let sql = "select * from vuscreen_liveStream_feeds";
            const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
            let endTime = now() - startTime;
            logEntry.message = "Query executed succesfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);

            for (let index = 0; index < resultSet.length; index++) {
                const element = resultSet[index];
                let obj = {
                    "id": element["id"],
                    "name": element["name"],
                    "url": element["url"],
                    "thumbnail": element["thumbnail"],
                    "type": element["type"],
                    "platform": element["platform"],
                    "start_time": element["start_time"],
                    "end_time": element["end_time"],
                    "position": element["position"],
                    "duration": element["duration"],
                    "section": element["section"],
                    "format": element["format"],
                    "cast": element["cast"],
                    "description": element["description"],
                }
                response.LIVESTREAM.push(obj)
                if (resultSet.length == index + 1) {
                    global.feedByStorageLivestream = response
                }
            }
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: response,
                success: true
            });
            res.status(returnObj.code).send(returnObj);

            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
            logger.detach("info", logEntry);

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageLivestream,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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


module.exports.multiPlayerGame = async function multiPlayerGame(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.multiPlayerGame",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            let response = { "MULTIPLAYER_GAME": [] }
            let sql = "select A.*,B.game_id as gid, B.prize_id,B.prize_image_url,B.prize_name,B.rank from vuscreen_game_feeds A join vuscreen_game_prize_details_feeds B on A.game_id = B.game_id where A.status=1";
            const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
            let endTime = now() - startTime;
            logEntry.message = "Query executed succesfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            let feed = {
                "game_id": null,
                "game_name": null,
                "game_title": null,
                "game_description": null,
                "thumbnail_url": null,
                "content_url": null,
                "terms_and_conditions": null,
                "allowance_message": null,
                "game_delay_minuts": null,
                "prize": []
            }
            let prizeArr = []

            for (let index = 0; index < resultSet.length; index++) {
                const element = resultSet[index];
                if (feed.game_id > 0 && feed.game_id != element.game_id) {
                    response.MULTIPLAYER_GAME.push(feed)
                    prizeArr = []
                    feed = {
                        "game_id": null,
                        "game_name": null,
                        "game_title": null,
                        "game_description": null,
                        "thumbnail_url": null,
                        "content_url": null,
                        "terms_and_conditions": null,
                        "allowance_message": null,
                        "game_delay_minuts": null,
                        "prize": []
                    }

                }

                feed.game_id = element.game_id
                feed.game_name = element.game_name
                feed.game_title = element.game_title
                feed.game_description = element.game_description
                feed.thumbnail_url = element.thumbnail_url
                feed.content_url = element.content_url
                feed.terms_and_conditions = element.terms_and_conditions
                feed.allowance_message = element.allowance_message
                feed.game_delay_minuts = element.game_delay_minuts

                prize = {
                    "game_id": element.gid,
                    "prize_id": element.prize_id,
                    "prize_name": element.prize_name,
                    "rank": element.rank,
                    "prize_image_url": element.prize_image_url,
                }
                feed.prize.push(prize);
                if (resultSet.length == index + 1) {
                    response.MULTIPLAYER_GAME.push(feed)
                    global.feedByStorageMultiPlayerGame = response
                }
            }
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: response,
                success: true
            });
            res.status(returnObj.code).send(returnObj);

            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
            logger.detach("info", logEntry);

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageMultiPlayerGame,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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

module.exports.longcode = async function longcode(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.longcode",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            let response = { "LONGCODE": [] }
            let sql = "select * from vuscreen_longcode where status=1";
            const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
            let endTime = now() - startTime;
            logEntry.message = "Query executed succesfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);

            for (let index = 0; index < resultSet.length; index++) {
                const element = resultSet[index];
                let obj = {
                    "id": element["id"],
                    "long_code_no": element["long_code"],
                    "name": element["name"],
                    "from": element["from"],
                }
                response.LONGCODE.push(obj)
                if (resultSet.length == index + 1) {
                    global.feedByStorageLongCode = response
                }
            }
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: response,
                success: true
            });
            res.status(returnObj.code).send(returnObj);

            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
            logger.detach("info", logEntry);

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageLongCode,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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

module.exports.landingPage = async function landingPage(req, res) {
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.landingPage",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        if (req.query.initialize == true || req.query.initialize == "true") {
            let response = { "LANDING_PAGE": [] }
            let sql = "select * from vuscreen_landing_page where status=1";
            const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
            let endTime = now() - startTime;
            logEntry.message = "Query executed succesfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);

            for (let index = 0; index < resultSet.length; index++) {
                const element = resultSet[index];
                let obj = {
                    "id": element["id"],
                    "name": element["name"],
                }
                response.LANDING_PAGE.push(obj)
                if (resultSet.length == index + 1) {
                    global.feedByStorageLandingPage = response
                }
            }
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: response,
                success: true
            });
            res.status(returnObj.code).send(returnObj);

            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
            logger.detach("info", logEntry);

        } else {
            let endTime = now() - startTime;
            logEntry.message = "Cached response return successfully"
            logEntry.elapsedTime = endTime
            logger.detach("info", logEntry);
            const returnObj = newResponseObject.generateResponseObject({
                code: httpStatus.OK,
                message: newResponseMessage.success,
                data: feedByStorageLandingPage,
                success: true
            });
            res.status(returnObj.code).send(returnObj);
            logEntry.message = "exiting from service"
            // logEntry.response = returnObj
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


module.exports.pollAndSend = async function pollAndSend(req, res) {
    const returnObj = newResponseObject.generateResponseObject({
        code: httpStatus.OK,
        success: false
    });
    res.status(returnObj.code).send(returnObj);
    let startTime = now();
    let logEntry = {
        operationName: "feedByStorage.pollAndSend",
        startTime: new Date(),
        request: req.query,
        requestUrl: req.url,
    }
    try {
        logEntry.message = "Request received"
        logger.detach("info", logEntry);
        let sql = "SELECT * FROM miss_call_logs where isSent=0";
        const resultSet = await mysql.sequelize.query(sql, { type: QueryTypes.SELECT });
        for (let index = 0; index < resultSet.length; index++) {
            const element = resultSet[index];
            try {
                let MOBILE_NUMBER = element.customer_number;
                let SMS = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='KNOWLARITY_SMS'", { type: QueryTypes.SELECT })
                let url = await mysql.sequelize.query("SELECT conf_value FROM server_configurations where conf_key='KNOWLARITY_URL'", { type: QueryTypes.SELECT })
                url = url[0].conf_value.replace("{SMS}", SMS[0].conf_value)
                url = url.replace("{MOBILE_NUMBER}", MOBILE_NUMBER);
                console.log(url)
                request(url, async function (error, response, body) {
                    if (!error) {
                        console.log(response.body)
                        let update = "update miss_call_logs set isSent=1 where id=" + element.id
                        await mysql.sequelize.query(update);
                    } else {
                        console.log(error)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }
}