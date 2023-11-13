const Todo = require('../models/todo');

module.exports = {
  getAllTodo: async (req, res) => {
    const user = req.user;

    try {
      const todos = await Todo.find({ userID: user.id }).populate("userID", ["_id", "name"]);
      res.json({
        message: "Berhasil mendapatkan data todo",
        data: todos
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTodoById: async (req, res) => {
    const { id } = req.params;

    try {
      const todo = await Todo.findOne({ _id: id, userID: req.user.id }).populate("userID", ["_id", "name"]);

      if (!todo) {
        return res.status(404).json({ message: 'Todo tidak ditemukan' });
      }

      res.json({
        message: "Berhasil mendapatkan data todo",
        data: todo
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createTodo: async (req, res) => {
    const data = req.body;

    try {
      await Todo.create({ ...data, userID: req.user.id });
      res.json({
        message: "Berhasil membuat data todo"
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateTodo: async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: id, userID: req.user.id },
        { title, description },
        { new: true }
      );

      if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo tidak ditemukan' });
      }

      res.json({
        message: "Berhasil mengubah data todo",
        data: updatedTodo
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedTodo = await Todo.findOneAndDelete({ _id: id, userID: req.user.id });

      if (!deletedTodo) {
        return res.status(404).json({ message: 'Todo tidak ditemukan' });
      }

      res.json({
        message: "Berhasil menghapus data todo",
        data: deletedTodo
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteAllTodos: async (req, res) => {
    try {
      await Todo.deleteMany({ userID: req.user.id });
      res.json({
        message: "Berhasil menghapus semua data todo"
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
