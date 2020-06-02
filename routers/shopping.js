module.exports=(shopping,knex,jwt)=>{

    shopping   

        .get('/generate',(req,res)=>{
            var genrate_value='';
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            
            for (var i=0; i<6; i++){
                genrate_value+=characters.charAt(Math.floor(Math.random()*characters.length));

            }
            res.send(genrate_value)


        })


        .post('/add',(req,res)=>{

            var body= req.body

            body.quantity=1
            body.added_on=new Date()
        
        
            knex.select('*').from('shopping_cart')
            .where({'cart_id':body.cart_id,'product_id':body.product_id,'attributes':body.attributes})
            .then((result)=>{
                if (result.length>0){
                    // console.log(result)
        
                    knex('shopping_cart').update({'quantity':result[0].quantity+1})
                    .where({'cart_id':body.cart_id,'product_id':body.product_id,'attributes':body.attributes})
                    .then((result)=>{
                        // console.log(result)
                
                        knex.select('item_id','product.name','product.product_id','attributes'
                        ,'product.image','product.price','quantity')
                        .from('shopping_cart')
                        .join('product','product.product_id','shopping_cart.item_id')
                        .where('cart_id',body.cart_id)
                        .then((result)=>{
                            result[0].subtotal=result[0].price*result[0].quantity
                            res.send(result)
                        })
                        .catch((err)=>{console.log(err)})
                    
                    })
                    .catch((err)=>{console.log(err)})

                }else{
                    knex('shopping_cart').insert(body)
                    .then(()=>{
                        knex.select('item_id','product.name','product.product_id','attributes'
                        ,'product.image','product.price','quantity')
                        .from('shopping_cart')
                        .join('product','product.product_id','shopping_cart.item_id')
                        .where('cart_id',body.cart_id)
                        .then((result)=>{
                            result[0].subtotal=result[0].price*result[0].quantity
                            res.send(result)
                        })
                        .catch((err)=>{console.log(err)})
                    })   
                }
            })
        })


        .get('/:cart_id',(req,res)=>{

            knex.select('item_id','product.name','product.product_id','attributes'
            ,'product.image','product.price','quantity')
            .from('shopping_cart')
            .join('product','product.product_id','shopping_cart.item_id')
            .where('cart_id',req.params.cart_id)
            .then((result)=>{
                result[0].subtotal=result[0].price*result[0].quantity
                res.send(result)
            })
            .catch((err)=>{console.log(err)})
        })

        .put('/update/:item_id',(req,res)=>{
            knex('shopping_cart').update({'quantity':req.body.quantity})
            .where('item_id',req.params.item_id)
            .then(()=>{console.log('successfully updated');
            })
            .catch((err)=>{console.log(err)})
        })


        .delete('/empty/:cart_id',(req,res)=>{
            knex('shopping_cart')
            .where('cart_id',req.params.cart_id)
            .del()
            .then(()=>{console.log('deleted successfully')})
            .catch((err)=>{console.log(err)})
        })


        .get('/totalamount/:cart_id',(req,res)=>{
            knex.select('shopping_cart.quantity','product.price')
            .from('shopping_cart')
            .join('product','product.product_id','shopping_cart.item_id')
            .where('cart_id',req.params.cart_id)
            .then((result)=>{
                // console.log(result.length)
                sum=0
                if (result.length>0){
                    for (i of result){
                        console.log(i)
                        sum+=i.price*i.quantity
                    }
                    console.log(sum)
                }
            }).catch((err)=>{console.log(err)})
        })
        

}