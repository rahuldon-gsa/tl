package com.wits.biz

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class DispatchController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Dispatch.list(params), model:[dispatchCount: Dispatch.count()]
    }

    def show(Dispatch dispatch) {
        respond dispatch
    }

    @Transactional
    def save(Dispatch dispatch) {
        if (dispatch == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (dispatch.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond dispatch.errors, view:'create'
            return
        }

        dispatch.save flush:true

        respond dispatch, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Dispatch dispatch) {
        if (dispatch == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (dispatch.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond dispatch.errors, view:'edit'
            return
        }

        dispatch.save flush:true

        respond dispatch, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Dispatch dispatch) {

        if (dispatch == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        dispatch.delete flush:true

        render status: NO_CONTENT
    }
}
