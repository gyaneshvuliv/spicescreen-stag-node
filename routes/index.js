const express = require('express');
const router = express.Router();
var request = require('request')
const welcomeController = require('../controllers/welcome.controller.js');
const feedByStorageController = require('../controllers/feedByStorage.controller.js');

const registrationController = require('../controllers/registration.controller.js');

router.get('/welcome', welcomeController.get);

router.get('/watch', feedByStorageController.watch);

router.get('/ad', feedByStorageController.ad);

router.get('/ad-web', feedByStorageController.ad_web);

router.get('/read', feedByStorageController.read);

router.get('/travel', feedByStorageController.travel);

router.get('/store', feedByStorageController.store);

router.get('/mall', feedByStorageController.mall);

router.get('/fnb', feedByStorageController.fnb);

router.get('/service', feedByStorageController.service);

router.get('/livestream', feedByStorageController.livestream);

router.get('/longcode', feedByStorageController.longcode);

router.get('/landingPage', feedByStorageController.landingPage);

router.get('/landingPage', feedByStorageController.landingPage);

router.get('/multiPlayerGame', feedByStorageController.multiPlayerGame);

router.get('/feedByStorage', feedByStorageController.feedByStorage);

router.get('/jsonUpdate', feedByStorageController.feedByStorage);

router.get('/pollAndSend', feedByStorageController.pollAndSend);

router.get('/initailizeMaps', feedByStorageController.initailizeMaps);

router.post('/vuscreen/registration', registrationController.register);

setTimeout(function () {
    // initialising all map on server startup
    request('http://localhost:'+port+'/spicescreen/advertisement/initailizeMaps?initialize=true', function (error, response, body) {
        if (!error) {
            console.log(response.body)
        }
    })
}, 3000)


module.exports = router;

