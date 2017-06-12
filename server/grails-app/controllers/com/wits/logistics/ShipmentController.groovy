package com.wits.logistics

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured  

@Secured('IS_AUTHENTICATED_FULLY')
@Transactional(readOnly = true)
class ShipmentController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Shipment.list(params), model:[shipmentCount: Shipment.count()]
    }

    def show(Shipment shipment) {
        respond shipment
    }

	def getAllShipmentByClient(Integer clientId){ 
        respond Shipment.list(client : clientId)
    }

	def getAllShipments(){
		respond Shipment.list()
	}

	def getById(Integer shipmentId){
		respond Shipment.get(shipmentId);
	}
	
	def updateStatus(Integer shipmentId, String status){
		def shipment = Shipment.get(shipmentId)
		shipment.status = status
		shipment.save flush:true
		render status: CREATED
	}

    @Transactional
    def save(Shipment shipment) {
        if (shipment == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (shipment.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond shipment.errors, view:'create'
            return
        }

        shipment.save flush:true

        respond shipment, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Shipment shipment) {
        if (shipment == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (shipment.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond shipment.errors, view:'edit'
            return
        }

        shipment.save flush:true

        respond shipment, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Shipment shipment) {

        if (shipment == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        shipment.delete flush:true

        render status: NO_CONTENT
    }
}
