const db = require('../db'); // Knex 설정
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 회원가입
exports.register = async (req, res) => {
  try {
    const { username, password, email, nickname } = req.body;

    // 중복 사용자 확인
    const existingUser = await db('users').where({ username }).first();
    if (existingUser) {
      return res.status(400).json({ error: '이미 존재하는 사용자명입니다.' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 저장
    const [newUser] = await db('users')
      .insert({
        username,
        password: hashedPassword,
        email,
        nickname
      })
      .returning('*');

    // JWT 발급
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).json({ 
      userId: newUser.id,  // id를 userId로 변환하여 응답
      token,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: '회원가입에 실패했습니다.' });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자 확인
    const user = await db('users').where({ username }).first();
    if (!user) {
      return res.status(401).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({ 
      token,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: '로그인에 실패했습니다.' });
  }
};

// 로그아웃
exports.logout = (req, res) => {
  // JWT는 클라이언트 측에서 토큰을 삭제하는 방식으로 처리
  res.status(200).json({ 
    success: true,
    message: '로그아웃 성공' 
  });
};