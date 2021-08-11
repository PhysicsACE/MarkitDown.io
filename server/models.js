import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema(
  {
    id: String,
    text: String,
    title: String
  },
  {
    timestamps: true,
  }
);

export const Workspace = mongoose.model('Workspace', workspaceSchema);
