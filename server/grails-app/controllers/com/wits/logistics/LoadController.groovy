package com.wits.logistics

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured  

@Secured('IS_AUTHENTICATED_FULLY')
@Transactional(readOnly = true)
class LoadController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Load.list(params), model:[loadCount: Load.count()]
    }

    def show(Load load) {
        respond load
    }
	
	def getById(Integer loadId){
		respond Load.get(loadId);
	}
	
	def updateStatus(Integer loadId, String status){
		def load = Load.get(loadId)
		load.status = status
		load.save flush:true
		render status: CREATED
	}

    @Transactional
    def save(Load load) {
        if (load == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (load.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond load.errors, view:'create'
            return
        }

        load.save flush:true

        respond load, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Load load) {
        if (load == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (load.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond load.errors, view:'edit'
            return
        }

        load.save flush:true

        respond load, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Load load) {

        if (load == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        load.delete flush:true

        render status: NO_CONTENT
    }
}
