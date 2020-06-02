
// const gen_token= require('../middleware/gen_token')
module.exports=(customer,knex,jwt)=>{
    customer
        .post('/',(req,res)=>{
            knex('customer').insert(req.body)
            .then((result)=>{
                if (result){
                res.send('successfully inserted')
                }else{
                    res.send('customer registration failed')
                }
            }).catch((err)=>{console.log(err);})
        })


        .post('/login',(req,res)=>{
            knex.select('*').from('customer')
            .where('email',req.body.email )
            .then((exist)=>{
                if(exist.length>0){
                    console.log(exist);
                    
                    if(exist.password==exist.password){
                        token= jwt.sign({'customer_id':exist[0].customer_id},
                        process.env.secrate,{expiresIn:'1h'})
                        res.cookie('token',token)
                        res.send('successfully login')
                        
                }else{
                    res.send('Authorization is failed')
                }
            }else{
                res.send('authorization is failed')
            }
            }).catch((err)=>{console.log(err);})
        })


        .get('/:id',(req,res)=>{
            
            var cookie_token= req.headers.cookie
            // console.log(cookie_token)
            
            var token = cookie_token.slice(6)
            var verify = jwt.verify(token, process.env.secrate)
            knex.select('*').from('customer')
            .where('customer_id',req.params.id)
            .then((result)=>{
                
                if (result.length>0){
                    if (verify.email==result[0].email){
                        res.send(result)
                    }else{
                        res.send('wrong id')
                    }
                }else{
                    res.send('wrond id')
                }

            }).catch((err)=>{console.log(err);}) 
            
        })

        .put('/address',(req,res)=>{
            var cookie_token= req.headers.cookie
            var token = cookie_token.slice(6)
            var verify = jwt.verify(token, process.env.secrate)
            knex('customer')
                .where('email',verify.email)
                .update({
                    'address_1': req.body.address_1,
                    'city': req.body.city,
                    'country': req.body.country,
                    'postal_code':req.body.postal
                })
            .then((result)=>{
                console.log(result)
                if (result){
                    res.send('update successfully')
                }
            })
    })

        .put('/creditcard',(req,res)=>{

            var cookie_token= req.headers.cookie
            var token = cookie_token.slice(6)
            var verify = jwt.verify(token, process.env.secrate)
            knex('customer')
                .where('email',verify.email)
                .update({
                    'credit_card': req.body.credit_card
                })
            .then((result)=>{
                if (result){
                    res.send('update successfully')
                }else{
                    res.send('unsuccefully updated')
                }
            })

        })
}