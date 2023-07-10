const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  
  User.findById("64aaf069788921318ccd8d0f")
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect(`mongodb+srv://##################@cluster1.syv6z7h.mongodb.net/shap?retryWrites=true&w=majority`).then(result=>{
  User.findOne().then(user=>{
    if(!user){
      
      const user = new User({
        name:'max',
        email:'max@gmail.com',
        cart:{items:[]}
      })
      user.save()
    }
  })
  app.listen(4000)
  console.log('server running ...')
}).catch(err=>{
  console.log("Server Not Responding")
})