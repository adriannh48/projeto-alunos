"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _login = require('../middlewares/login'); var _login2 = _interopRequireDefault(_login);

const router = new (0, _express.Router)();

// router.get('/', login, userController.index);
// router.get('/:id', userController.show);

router.post('/', _UserController2.default.store);
router.put('/', _login2.default, _UserController2.default.update);
router.delete('/', _login2.default, _UserController2.default.delete);

exports. default = router;
