import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.json({ success: true });
})

app.listen(3000, () => ("Server is running on port:3000"));