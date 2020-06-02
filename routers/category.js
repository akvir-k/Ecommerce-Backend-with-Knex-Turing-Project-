module.exports=(category,knex)=>{
    category

        .get('/',(req,res)=>{
            knex.select('*').from('category').then((result)=>{
                if (result.length>0){
                    res.send(result)
                }else{
                    res.send('no data availble')
                }
            }).catch((err)=>{console.log(err);})
        })

        .get('/:id',(req,res)=>{
            
            knex.select('*').from('category').where({category_id:req.params.id})
            .then((result)=>{
                if(result.length>0){
                    res.send(result)
                }else{
                    res.send('No data available by this id')
                }
            }).catch((err)=>{console.log(err)})
        })

        .get('/inproduct/:product_id',(req,res)=>{
           
            knex.select('category_id','department_id','name').from('category')
            .where( {category_id: function(){
                this.select('category_id')
                .from('product_category')
                .where('product_id','=',req.params.product_id)
            }
        }).then((result)=>{
                if(result.length>0){
                    res.send(result)
                }else{
                    res.send('No data available by this id')
                }
            }).catch((err)=>{console.log(err)})
        })

        .get('/inDepartment/:department_id',(req,res)=>{
            
            knex.select('*').from('category').where({department_id: function(){
                this.select('department_id')
                .from('department')
                .where('department_id','=',req.params.department_id)
            }})
            .then((result)=>{
                if(result.length>0){
                    res.send(result)
                }else{
                    res.send('No data available by this id')
                }
            }).catch((err)=>{console.log(err)})
        })        
}