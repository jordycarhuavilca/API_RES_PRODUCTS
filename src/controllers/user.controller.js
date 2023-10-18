const {users}= require('../db/models/index.models')
const {Op} = require('sequelize')
const isEmpty = require('../libs/validate.libs')
const getUser =async (req,res)=>{
    const numDocument = req.params.nrodocument 
    try{
        const userFound = await users.findAll({
            where:{
                document_Identity:{ 
                    [Op.eq] : numDocument
                },
            },
            attributes:[['document_Identity','Dni'],'name',['fatherLastName','firstLastName'],['motherLastName','SecondLastName']]

        })
        if(!userFound) return res.status(404).json({message : 'Not user Found!'})
        return res.status(200).send(userFound)
    }catch(err){
        return res.status(500).json({message : 'err in the database!' + err})
    }
}

const listarUsers =async (req,res)=>{
    const listUser = await users.findAll()
    try{
        if(!listUser) return res.status(404).json({message : 'Not user Found!'})
        return res.status(200).send(listUser)
    }catch(err){
        return res.status(500).json({message : 'err in the database! ' + err})
    }
}

const addUser = async(req,res)=>{
    const data =req.body
    console.log('Object ' + isEmpty(Object.values(data)))
    if(!isEmpty(Object.values(data))){
        try{
            const newUser = await users.create(data)
            console.log('done')
            return res.status(200).send(newUser)
        }catch(err){
            return res.status(500).json({message:'err in the database! ' + err})
        }
    }else{
        return res.status(400).json({message:'invalid request'})
    }
}
module.exports = {
    getUser,
    listarUsers,
    addUser
}
