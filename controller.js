const axios = require('axios');
const faker = require('faker');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

const getUser = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

const createRandomUser = async () => {
  const user = {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
  };
  const response = await axios.post(`${BASE_URL}/users`, user);
  return response.data;
};

// const createUser = async (user) => {
//   const response = await axios.post(`${BASE_URL}/users`, user);
//   return response.data;
// };

const updateUser = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${id}`);
    return response.status;
  } catch (error) {
    throw error.response;
  }
};

const getUserPosts = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}/posts`);
  return response.data;
};

const getPostComments = async (postId) => {
  const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
  return response.data;
};

const createPost = async (userId) => {
  const post = {
    userId: userId,
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
  };
  const response = await axios.post(`${BASE_URL}/posts`, post);
  return response.data;
};

module.exports = {
  getUsers,
  getUser,
  createRandomUser,
  createUser,
  updateUser,
  deleteUser,
  getUserPosts,
  getPostComments,
  createPost,
};
