import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

describe('Create Category Controller', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();

    const password = await hash('admin', 8);

    await connection.query(`
		INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXX')
	`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest'
      })
      .set('Authorization', `Bearer ${responseToken.body.token}`);

    expect(response.status).toBe(201);
  });
});