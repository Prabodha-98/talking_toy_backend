const app = require('./app');
const db = require('./config/db')
const UserModule = require('./model/user.model');


const port = 3000;

app.get('/',(req,res)=>{
    res.send('Hello World98')

});

app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
});