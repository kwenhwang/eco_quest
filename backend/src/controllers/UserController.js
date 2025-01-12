const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 회원가입
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 중복 사용자 확인
    const existingUser = await db('users').where({ username }).first();
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 저장
    const [newUser] = await db('users')
      .insert({ username, email, password: hashedPassword })
      .returning('*');

    // JWT 발급
    const token = jwt.sign({ userId: newUser.user_id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ userId: newUser.user_id, token, message: 'User registered successfully' });
  } catch (error) {
    console.error('회원가입 오류:', error.message);
    res.status(500).json({ error: '회원가입에 실패했습니다.' });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자 확인
    const user = await db('users').where({ username }).first();
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // JWT 발급
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('로그인 오류:', error.message);
    res.status(500).json({ error: '로그인에 실패했습니다.' });
  }
};

// 로그아웃
exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: '로그아웃 성공' });
};