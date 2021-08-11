import express from 'express';

import { randomId } from '../utils.js';
import { Workspace} from '../models.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/workspace', async (req, res) => {
  const { ids } = req.query;
  if (typeof ids !== 'string')
    return res.status(400).send('Missing list of ids');
  const docs = await Workspace.find(
    { id: { $in: ids.split(',') } }, {id: 1, title: 1, text: 1}).sort({updatedAt: -1})
    
  return res.json(docs);
});

router.post('/workspace', async (req, res) => {
  const pid = req.body.id;
  if (!pid)
    return res.status(400).send('Missing `type` or `id` parameter');
  const obj = new Workspace({ id: await randomId() , title: pid, text: ''});
  await obj.save();
  return res.json(obj);
});

router.get('/workspace/:id', async (req, res) => {
  if (typeof req.params.id !== 'string')
    return res.status(400).send('Missing `id` parameter');
  return res.json(await Workspace.findOne({ id: req.params.id }, {id: 1, title: 1, text: 1}));
});

router.delete('/workspace/:id', async (req, res) => {
  if (typeof req.params.id !== 'string')
    return res.status(400).send('Missing `id` parameter');
  return res.json(await Workspace.findOneAndDelete({ id: req.params.id }));
});

router.put('/workspace/:id/save', async (req, res) => {
  if (typeof req.params.id !== 'string')
    return res.status(400).send('Missing `id` parameter');
  const obj = await Workspace.findOneAndUpdate(
    { id: req.params.id },
    { text: req.body.text },
    { new: true }
  );
  console.log(obj)
  console.log(obj.text)
  return res.json(obj);
});

export default router;
