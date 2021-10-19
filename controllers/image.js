import Clarifai from 'clarifai';
import dotenv from 'dotenv';

dotenv.config();
const clarifaiApi = process.env.CLARIFAI_API;

const app = new Clarifai.App({
    apiKey: clarifaiApi
  });

const handleAPICall = (req, res) => {
  app.models
    .predict('f76196b43bbd45c99b4f3cd8e8b40a8a', req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => RegExp.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id, faces } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', faces)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

export { handleImage, handleAPICall };