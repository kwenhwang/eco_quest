const User = require('../src/models/User');

// 회원가입
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await User.create({ username, password });
        res.status(201).json({ userId: newUser._id });
    } catch (error) {
        console.error('회원가입 오류:', error);
        res.status(500).json({ error: '회원가입에 실패했습니다.', code: 500 });
    }
};

// 로그인
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ error: '로그인 실패: 잘못된 사용자명 또는 비밀번호입니다.', code: 401 });
        }
        res.status(200).json({ message: '로그인 성공' });
    } catch (error) {
        console.error('로그인 오류:', error);
        res.status(500).json({ error: '로그인에 실패했습니다.', code: 500 });
    }
};

// 로그아웃
exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: '로그아웃 성공' });
};

jest.setTimeout(30000); // 타임아웃을 30초로 설정

const request = require('supertest');
const express = require('express');
const userRoutes = require('../src/routes/userRoutes');
const knex = require('knex');
const knexConfig = require('../knexfile');
const bcrypt = require('bcrypt');

const db = knex(knexConfig.test); // 테스트 환경 설정

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

beforeAll(async () => {
    await db.migrate.latest(); // 마이그레이션 실행
    await db.seed.run(); // 시드 데이터 추가
});

afterAll(async () => {
    await db.destroy(); // 연결 종료
});

describe('User API', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'Password123!',
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.userId).toBeDefined();
        expect(response.body.token).toBeDefined();
    });

    it('should not register a user with the same username', async () => {
        await db('users').insert({
            username: 'testuser',
            email: 'anotheruser@example.com',
            password: await bcrypt.hash('Password123!', 10),
        });

        const response = await request(app)
            .post('/users/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'Password123!',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Username already exists');
    });

    it('should login a user', async () => {
        await db('users').insert({
            username: 'testuser',
            email: 'testuser@example.com',
            password: await bcrypt.hash('Password123!', 10),
        });

        const response = await request(app)
            .post('/users/login')
            .send({
                username: 'testuser',
                password: 'Password123!',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('should not login a user with invalid credentials', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                username: 'testuser',
                password: 'WrongPassword!',
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe('Invalid credentials');
    });
});