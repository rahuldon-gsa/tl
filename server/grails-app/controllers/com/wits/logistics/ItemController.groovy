package com.wits.logistics

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured  

@Secured('IS_AUTHENTICATED_FULLY')
@Transactional(readOnly = true)
class ItemController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Item.list(params), model:[itemCount: Item.count()]
    }

    def show(Item item) {
        respond item
    }

	def getById(Integer itemId){
		respond Item.get(itemId);
	}
	
	def updateStatus(Integer itemId, String status){
		def item = Item.get(itemId)
		item.status = status
		item.save flush:true
		render status: CREATED
	}

    @Transactional
    def save(Item item) {
        if (item == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (item.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond item.errors, view:'create'
            return
        }

        item.save flush:true

        respond item, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Item item) {
        if (item == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (item.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond item.errors, view:'edit'
            return
        }

        item.save flush:true

        respond item, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Item item) {

        if (item == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        item.delete flush:true

        render status: NO_CONTENT
    }
}
