module.exports=(tax,knex)=>{
    tax
        .get("/",(req,res)=>{
            knex.select('*').from('tax')
            .then((result)=>{
                res.send(result)
            })
            .catch((err)=>{console.log(err)})
        })

        .get('/:id',(req,res)=>{
            knex.select('*').from('tax')
            .where('tax_id',req.params.id)
            .then((result)=>{

                res.send(result)
            })
            .catch((err)=>{console.log(err)})
        })
}