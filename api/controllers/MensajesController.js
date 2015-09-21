/**
 * MensajesController
 *
 * @description :: Server-side logic for managing mensajes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	join:function(req,res){
		console.log('o')
		if(req.isSocket){
			sails.sockets.join(req.socket,'ticket1')
			res.json({
				response:'unido a ticket1 como socket'
			})			
		}else{
			res.json({
				response:'no eres un socket'
			})
		}
	},
	create:function(req,res){
		Mensajes.create(req.allParams())
			.exec(function(error,message){
				//Mensaje.publishCreate({id:message.id,'created',message})
				sails.sockets.broadcast('ticket1','nuevoMensaje',message)
			})
	}

};

