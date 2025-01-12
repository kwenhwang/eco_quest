const db = require('../db'); // Knex 설정
const bcrypt = require('bcrypt');

class User {
    static async create({ username, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [user] = await db('users')
            .insert({
                username,
                password: hashedPassword
            })
            .returning('*');
        return user;
    }

    static async findOne({ username }) {
        const user = await db('users').where({ username }).first();
        return user;
    }

    static async comparePassword(candidatePassword, storedPassword) {
        return bcrypt.compare(candidatePassword, storedPassword);
    }
}

module.exports = User;