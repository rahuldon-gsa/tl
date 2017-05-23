package com.wits.core

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured 

@Secured('IS_AUTHENTICATED_FULLY')
@Transactional(readOnly = true)
class AddressController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Address.list(params), model:[addressCount: Address.count()]
    }

    def show(Address address) {
        respond address
    }
    
    def findAddresses(Integer userId){
        respond Address.list(createdBy : userId)
    }

    @Transactional
    def save(Address address) {
        if (address == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (address.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond address.errors, view:'create'
            return
        }

        address.save flush:true

        respond address, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Address address) {
        if (address == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (address.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond address.errors, view:'edit'
            return
        }

        address.save flush:true

        respond address, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Address address) {

        if (address == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        address.delete flush:true

        render status: NO_CONTENT
    }
}
