const controller = require('../controller');

describe('JSONPlaceholder API', () => {

  test('should fetch all users', async () => {
    const users = await controller.getUsers();
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
  });

  test('should fetch a single user', async () => {
    const user = await controller.getUser(1);
    expect(user).toBeDefined();
    expect(user.id).toBe(1);
  });

  test('should handle non-existent user', async () => {
    try {
      await controller.getUser(999);
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });

  test('should create a new user', async () => {
    const newUser = await controller.createUser();
    expect(newUser).toBeDefined();
    expect(newUser.id).toBeDefined();
    expect(newUser.name).toBeDefined();
    expect(newUser.username).toBeDefined();
    expect(newUser.email).toBeDefined();
  });

  test('should update a user', async () => {
    const updatedUser = await controller.updateUser(1, {
      name: 'Updated Name',
      username: 'UpdatedUsername',
      email: 'updated@example.com',
    });
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe('Updated Name');
  });

  test('should handle updating a non-existent user', async () => {
    try {
      await controller.updateUser(999, {
        name: 'NonExistent Name',
      });
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });

  test('should delete a user', async () => {
    const status = await controller.deleteUser(1);
    expect(status).toBe(200);
  });

  test('should handle deleting a non-existent user', async () => {
    try {
      await controller.deleteUser(999);
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });

  test('should not create a user with invalid data', async () => {
    try {
      await controller.createUser({ name: '' });
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  test('should not update user with invalid email', async () => {
    try {
      await controller.updateUser(1, { email: 'not-an-email' });
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  test('should fetch posts of a user', async () => {
    const response = await axios.get(`${BASE_URL}/users/1/posts`);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('should fetch comments of a post', async () => {
    const response = await axios.get(`${BASE_URL}/posts/1/comments`);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('should create a new post', async () => {
    const post = {
      userId: 1,
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
    };
    const response = await axios.post(`${BASE_URL}/posts`, post);
    expect(response.status).toBe(201);
    expect(response.data).toBeDefined();
    expect(response.data.id).toBeDefined();
    expect(response.data.title).toBe(post.title);
    expect(response.data.body).toBe(post.body);
  });

});
