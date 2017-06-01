package com.wits.biz

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

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
