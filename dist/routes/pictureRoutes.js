"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _PictureController = require('../controllers/PictureController'); var _PictureController2 = _interopRequireDefault(_PictureController);
var _login = require('../middlewares/login'); var _login2 = _interopRequireDefault(_login);

const router = new (0, _express.Router)();

router.post('/', _login2.default, _PictureController2.default.store);

exports. default = router;
