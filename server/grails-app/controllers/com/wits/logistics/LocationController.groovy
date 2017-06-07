package com.wits.logistics

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured  

@Secured('IS_AUTHENTICATED_FULLY')
@Transactional(readOnly = true)
class LocationController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Location.list(params), model:[locationCount: Location.count()]
    }

    def show(Location location) {
        respond location
    }
	
	def getById(Integer locationId){
		respond Location.get(locationId);
	}
	
	def updateStatus(Integer locationId, String status){
		def location = Location.get(locationId)
		location.status = status
		location.save flush:true
		render status: CREATED
	}

    @Transactional
    def save(Location location) {
        if (location == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (location.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond location.errors, view:'create'
            return
        }

        location.save flush:true

        respond location, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Location location) {
        if (location == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (location.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond location.errors, view:'edit'
            return
        }

        location.save flush:true

        respond location, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Location location) {

        if (location == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        location.delete flush:true

        render status: NO_CONTENT
    }
}
