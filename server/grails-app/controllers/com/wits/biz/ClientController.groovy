package com.wits.biz
 
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured 
import com.wits.core.Address

@Secured('IS_AUTHENTICATED_FULLY')
@Transactional(readOnly = true) 
class ClientController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Client.list(params), model:[clientCount: Client.count()]
    }

    def show(Client client) {
        respond client
    }

	 def getAllClientsByCompany(Integer companyId){ 
        respond Client.list(company : companyId)
    }

	def getById(Integer clientId){
		respond Client.get(clientId);
	}
	/*
	def removeAddress(Integer clientId, Integer addressId){
		if(!addressId || !clientId){
			render status: NOT_FOUND
            return
		}
		def client = Client.get(clientId)
		 if (client == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

		def address = Address.get(addressId)
		 if (address == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

		client.removeToAddresses(address)
		company.save flush:true
        render status: NO_CONTENT
	}
	*/

    @Transactional
    def save(Client client) {
        if (client == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (client.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond client.errors, view:'create'
            return
        }

        client.save flush:true

        respond client, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Client client) {
        if (client == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (client.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond client.errors, view:'edit'
            return
        }

        client.save flush:true

        respond client, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Client client) {

        if (client == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        client.delete flush:true

        render status: NO_CONTENT
    }
}
