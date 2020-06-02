
module.exports=(product,knex)=>{
    product
    // Endpoint for get all product details
        .get('/',(req,res)=>{
        
            knex.select('*').from('product').then((result)=>{
                if (result.length>0){
                    dict1={"count":0,"rows":[]}
                    for (i of result){
                        dict1['rows'].push(i)
                        dict1['count']++
                    }
                    res.send(dict1)
                }else{
                    res.send('no data availble')
                }
            }).catch((err)=>{console.log(err);})
        })
 
    // Endpoint for get all details by using search method
        .get('/:search',(req,res)=>{
        
            knex.select('*').from('product')
            .where('name',req.params.search)
            .then((result)=>{
                if(result.length>0){
                        res.send(result)
                    }
                })
            
            .catch((err)=>{console.log(err);})    
        })
    
    // Endpoint for get all details by using id method
        .get('/product/:id',(req,res)=>{
            knex.select('*').from('product').where({product_id:req.params.id})
            .then((result)=>{
                if(result.length>0){
                    res.send(result)
                }else{
                    res.send('No data available by this id')
                }
            }).catch((err)=>{console.log(err)})
        })

    // Endpoint for get all details by using Category id
        .get('/inCategory/:category_id',(req,res)=>{
            knex.select('*').from ('product')
            .join('product_category',function(){
                this.on('product.product_id','=','product_category.category_id')
            })
            .where('category_id', req.params.category_id)
            .then((result)=>{
                if(result.length>0){
                    dict1={'count':0,'rows':[]}
                    for (i of result ){
                        dict1.rows.push(i)
                        dict1.count++;
                    }
                res.send(dict1)
                }else{
                    res.send('no data available')
                }
            }).catch((err)=>{
                console.log(err)
            })    
        })


    //Endpoint for get all products by deparmtemt id
        .get('/inDepartment/:dept_id',(req,res)=>{
            knex.select('product.name','product.description','product.product_id','price','discounted_price','thumbnail')
            .from('product')
            .join('product_category',function(){
                this.on('product_category.product_id','product.product_id')})
            .join('category','category.category_id','=','product_category.category_id')
        .where('category.department_id',req.params.dept_id)
        
        .then((result)=>{
           
            if (result.length>0){
                dict1={'count':0,'rows':[]}
                for (i of result){
                    dict1.rows.push(i)
                    dict1.count++
                }
                res.send(dict1)
            }else{
                res.send('no data availble')
            }
        }).catch((err)=>{console.log(err);})
    })


    // Endpoint of find the details of product by id
    .get('/:id/details',(req,res)=>{
        knex.select('product_id','name','description','price','discounted_price','image','image_2')
        .from('product')
        .where('product_id',req.params.id)

        .then((result)=>{
            if(result.length>0){
                res.send(result)
            }else{
                res.send('No data available')
            }
        }).catch((err)=>{console.log(err);})
    })


    //End point to find the location of product by product id
    .get('/:id/location',(req,res)=>{
        
        knex.select('category.name as category_name',
        'department.department_id','department.name as department_name'
        ,'product_category.category_id')

        .from('product_category')
        .join('category',function(){
            this.on('category.category_id','product_category.category_id')
        })
        .join('department',function(){
            this.on('department.department_id','category.department_id')
        })
        .where('product_category.product_id',req.params.id)
        .then((result)=>{
            res.send(result)
        }).catch((err)=>{console.log(err);})
    })

    // End point to find review by Id
    .get('/:id/reviews',(req,res)=>{
        knex.select('*').from('review')
        .where('review_id',req.params.id)
        .then((result)=>{
            res.send(result)
        })
    })

    // Eng point to post review
    .post('/reviews',(req,res)=>{

        body= req.body
        body.created_on= Date(Date.now())
        knex('review').insert(req.body)
        .then((result)=>{
            if(result){
                res.send('Review inserted successfully')
            }else{
                res.send('Review not inserted ')
            }
        }).catch((err)=>{console.log(err)})
    })
}
