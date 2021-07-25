const cookieParser = require('cookie-parser');
const express= require('express');  // import express module 
const app=express();
const port=process.env.PORT || 8000;

//Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID="138158745347-c85n86l91vafa9n6grcif1psus128s3n.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

//Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/login',(req,res)=>{
    res.render('login');
});
app.post('/login',(req,res)=>{
    let token=req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    }
    verify().then(()=>{
        res.cookie('session-token',token);
        res.send('success!');
    }).catch(console.error);
});
app.get('/dashboard',checkAuth,(req,res)=>{
    let user=req.user;
    res.render('dashboard',{user});
});
app.get('/logout',(req,res)=>{
    res.clearCookie('session-token');
    res.redirect('/login');
});

function checkAuth(req,res,next){
    let token=req.cookies['session-token'];
    let user={};
    
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  
        });
        const payload = ticket.getPayload();
        user.name=payload.name;
        user.email=payload.email;
        user.picture=payload.picture;
        
    }
    verify().then(()=>{
        req.user=user;
        next();
    }).catch(err=>{
        res.redirect('/login');
    });
}

app.listen(port,function(){
    console.log(`listening at port ${port}`);
});
