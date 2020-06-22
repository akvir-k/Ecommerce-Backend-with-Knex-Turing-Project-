
module.exports=(attribute,knex)=>{
    attribute   
        
    
        .get('/',(req,res)=>{
            knex.select('*').from('attribute')
            .then((result)=>{
                if(result.length>0){
                    res.send(result)
                }else{
                    res.send('No data available by this id')
                }
            }).catch((err)=>{console.log(err)})
        })
        



        .get('/:attribute_id',(req,res)=>{
            knex.select('*').from('attribute').where({attribute_id:req.params.attribute_id})
            .then((result)=>{
                if(result.length>0){
                    res.send(result)
                }else{
                    res.send('No data available by this id')
                }
            }).catch((err)=>{console.log(err)})
        })
        
        
        
        .get('/values/:attribute_id',(req,res)=>{

            knex.select('attribute_value_id','value').from('attribute_value')
            .where({attribute_id:function(){
                this.select('attribute_id')
                .from('attribute')
                .where('attribute_id' , req.params.attribute_id)
            }})
            .then((result)=>{
                if(result.length>0){
                    res.send(result)
                }else{
                    res.send('No data available')
                }
            })
        })


        .get('/inProduct/:product_id',(req,res)=>{
            
            knex.select('name as attribute_name','value as attribute_value','product_id','attribute_value.attribute_value_id')
            .from('attribute_value')
            .join('attribute',function(){
                this.on('attribute_value.attribute_id','=','attribute.attribute_id')       
            })
            .join('product_attribute',function(){
                this.on('product_attribute.attribute_value_id','=','attribute_value.attribute_value_id')
            })
            .where('product_id','=',req.params.product_id)

            .then((result)=>{
                if(result.length>0){
                    res.send(result)
                }else{
                    res.send('no data availble')
                }
            }).catch((err)=>{console.log(err);})
        })
}