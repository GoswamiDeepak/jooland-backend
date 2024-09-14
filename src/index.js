import express from 'express';
const app = express();

app.get('/', function (req, res, next) {
    res.send('Welcome');
});



const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server is running at port:: http://localhost:${PORT}`);
});
