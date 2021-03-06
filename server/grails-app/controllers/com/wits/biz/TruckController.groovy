package com.wits.biz

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured  

@Secured('IS_AUTHENTICATED_FULLY')
@Transactional(readOnly = true)
class TruckController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Truck.list(params), model:[truckCount: Truck.count()]
    }

    def show(Truck truck) {
        respond truck
    }

	def getAllTruckByCompany(Integer companyId){ 
        respond Truck.list(company : companyId)
    }

	def getById(Integer truckId){
		respond Truck.get(truckId);
	}

	def updateStatus(Integer truckId, String status){
		def truck = Truck.get(truckId)
		truck.status = status
		truck.save flush:true
		render status: CREATED
	}

    @Transactional
    def save(Truck truck) {
        if (truck == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (truck.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond truck.errors, view:'create'
            return
        }

        truck.save flush:true

        respond truck, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Truck truck) {
        if (truck == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (truck.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond truck.errors, view:'edit'
            return
        }

        truck.save flush:true

        respond truck, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Truck truck) {

        if (truck == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        truck.delete flush:true

        render status: NO_CONTENT
    }
}
