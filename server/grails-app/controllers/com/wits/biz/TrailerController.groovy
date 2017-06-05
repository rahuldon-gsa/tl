package com.wits.biz

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured  

@Secured('IS_AUTHENTICATED_FULLY')
@Transactional(readOnly = true)
class TrailerController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Trailer.list(params), model:[trailerCount: Trailer.count()]
    }

    def show(Trailer trailer) {
        respond trailer
    }

	def getAllTrailerByCompany(Integer companyId){ 
        respond Trailer.list(company : companyId)
    }

	def getById(Integer trailerId){
		respond Trailer.get(trailerId);
	}
	
	def updateStatus(Integer trailerId, String status){
		def trailer = Trailer.get(trailerId)
		trailer.status = status
		trailer.save flush:true
		render status: CREATED
	}


    @Transactional
    def save(Trailer trailer) {
        if (trailer == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (trailer.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond trailer.errors, view:'create'
            return
        }

        trailer.save flush:true

        respond trailer, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Trailer trailer) {
        if (trailer == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (trailer.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond trailer.errors, view:'edit'
            return
        }

        trailer.save flush:true

        respond trailer, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Trailer trailer) {

        if (trailer == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        trailer.delete flush:true

        render status: NO_CONTENT
    }
}
