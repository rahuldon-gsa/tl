package com.wits.biz

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured 

@Secured('IS_AUTHENTICATED_FULLY')
@Transactional(readOnly = true)
class ClientUserController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond ClientUser.list(params), model:[clientUserCount: ClientUser.count()]
    }

    def show(ClientUser clientUser) {
        respond clientUser
    }

    @Transactional
    def save(ClientUser clientUser) {
		
        if (clientUser == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }


        if (clientUser.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond clientUser.errors, view:'create'
            return
        }

        clientUser.save flush:true

        respond clientUser, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(ClientUser clientUser) {
        if (clientUser == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (clientUser.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond clientUser.errors, view:'edit'
            return
        }

        clientUser.save flush:true

        respond clientUser, [status: OK, view:"show"]
    }

    @Transactional
    def delete(ClientUser clientUser) {

        if (clientUser == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        clientUser.delete flush:true

        render status: NO_CONTENT
    }
}
