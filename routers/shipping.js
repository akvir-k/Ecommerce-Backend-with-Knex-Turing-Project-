module.exports=(shipping,knex)=>{
    shipping
        
        .get('/',(req,res)=>{
            knex.select('*').from('shipping_region')
            .then((result)=>{
                res.send(result)
            })
            .catch((err)=>{
                console.log(err);
            })
        })

        .get('/:shipping_region_id',(req,res)=>{
            knex.select('*').from('shipping_region')
            .join('shipping','shipping.shipping_region_id','shipping_region.shipping_region_id')
            .where('shipping_region.shipping_region_id',req.params.shipping_region_id)
            .then((result)=>{
                res.send(result)
            })
            .catch((err)=>{console.log(err)})
        })
}