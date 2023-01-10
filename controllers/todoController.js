const todoService = require("../services/todoService");

module.exports = {
  getAll: async (req, res) => {
    try {
      const todos = await todoService.getAll();

      res.status(200).json(todos);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  getOneById: async (req, res) => {
    try {
      const { id } = req.params;

      const todo = await todoService.getOneById(id);

      if (!todo) {
        res.status(404).json({
          msg: "Todo not found",
        });

        return;
      }

      res.status(200).json(todo);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  create: async (req, res) => {
    try {
      const { userName, task } = req.body;

      if (!userName) {
        res.status(400).json({
          msg: "User not defined",
        });

        return;
      }

      if (!task) {
        res.status(400).json({
          msg: "Task not defined",
        });

        return;
      }

      const todo = await todoService.createTodo({ userName, task });

      res.status(201).json(todo);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  deleteOne: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await todoService.deleteById(id);

      if (result === 404) {
        res.status(404).json({
          msg: `Todo with id - ${id} not found`,
        });

        return;
      }

      res.status(200).json({
        msg: `Todo with id - ${id} has been removed`,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const { task, isDone } = req.body;

      const result = await todoService.updateTodo(id, { task, isDone });

      if (result === 404) {
        res.status(404).json({
          msg: "Task not found",
        });

        return;
      }

      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
