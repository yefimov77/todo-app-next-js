import mongoose, { Schema } from "mongoose";


const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter title'],
    },
    description: String,
    completed: Boolean,
    status: {
      type: String,
      enum: ['pending', 'active', 'closed'],
      default: 'pending',
    },
    boardId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

export default Todo;