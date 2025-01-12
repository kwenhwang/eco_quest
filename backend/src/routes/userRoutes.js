const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); // 사용자 컨트롤러 가져오기

// 회원가입
router.post('/register', UserController.register);

// 로그인
router.post('/login', UserController.login);

// 로그아웃
router.post('/logout', UserController.logout);

module.exports = router;

