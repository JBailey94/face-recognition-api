import Clarifai from 'clarifai';

// setup Clarifai face detection
const app = new Clarifai.App({
    apiKey: 'YOUR_API_KEY'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(error => res.status(400).json("Clarifai failed"))
}

const handleImage = (request, response, db) => {
    const { id } = request.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        response.json(entries[0]);
    })
    .catch(error => response.status(400).json('unabled to get entries'));
}

export { handleImage, handleApiCall};