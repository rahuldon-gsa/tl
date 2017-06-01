package com.wits.biz

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class StopController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Stop.list(params), model:[stopCount: Stop.count()]
    }

    def show(Stop stop) {
        respond stop
    }

    @Transactional
    def save(Stop stop) {
        if (stop == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (stop.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond stop.errors, view:'create'
            return
        }

        stop.save flush:true

        respond stop, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Stop stop) {
        if (stop == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (stop.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond stop.errors, view:'edit'
            return
        }

        stop.save flush:true

        respond stop, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Stop stop) {

        if (stop == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        stop.delete flush:true

        render status: NO_CONTENT
    }
}
