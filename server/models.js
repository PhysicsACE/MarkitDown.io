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

const shareSchema = new mongoose.Schema(
  {
    id: String,
    password: String
  }
)

export const Workspace = mongoose.model('Workspace', workspaceSchema);
export const Share = mongoose.model('Share', shareSchema)
