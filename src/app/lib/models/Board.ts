import mongoose, { Schema } from "mongoose";

const BoardSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name for the board'],
    },
    boardId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.models.Board || mongoose.model('Board', BoardSchema);

export default Board;