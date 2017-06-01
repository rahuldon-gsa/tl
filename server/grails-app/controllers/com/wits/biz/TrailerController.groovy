package com.wits.biz

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

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
