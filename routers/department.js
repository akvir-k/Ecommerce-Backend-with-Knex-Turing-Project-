
module.exports=(depart,knex)=>{
    depart
        .get('/',(req,res)=>{
        
            knex.select('*').from('department').then((result)=>{
                if (result.length>0){
                    res.send(result)
                }else{
                    res.send('no data availble')
                }
            }).catch((err)=>{console.log(err);})
        })
        
        .get('/:id',(req,res)=>{
            
            knex.select('*').from('department').where({department_id:req.params.id})
            .then((result)=>{
                if(result.length>0){
                    res.send(result)
                }else{
                    res.send('No data available by this id')
                }
            }).catch((err)=>{console.log(err)})
        })
}