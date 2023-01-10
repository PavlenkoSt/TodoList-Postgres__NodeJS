const { col } = require("sequelize");

const { Todo } = require("../db/index");

module.exports = {
  async getAll() {
    const todos = await Todo.findAll({ order: col("id") });

    return todos;
  },
  async getOneById(id) {
    const todo = await Todo.findOne({ where: { id } });

    return todo;
  },
  async createTodo({ userName, task }) {
    const created = await Todo.create({
      userName,
      task,
    });

    return created.toJSON();
  },
  async deleteById(id) {
    const todo = await Todo.findOne({ where: { id } });

    if (!todo) {
      return 404;
    }

    await todo.destroy();

    return 200;
  },
  async updateTodo(id, task) {
    await Todo.update({ task }, { where: { id } });

    const newTodo = await Todo.findOne({ where: { id } });

    if (!newTodo) {
      return 404;
    }

    return newTodo;
  },
};
