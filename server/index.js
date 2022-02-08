const express = require('express');
const app = express();
const cors = require('cors');
const postRouter = require('./routers/postRoutes');
const userRouter = require('./routers/userRout');
const dashboardRout = require('./routers/dashboard')


const PORT = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());


app.use('/auth', postRouter);
app.use('/auth', userRouter);
app.use('/dashboard', dashboardRout)


app.listen(PORT, () => {
    console.log(`server work on port ${PORT}`);
});