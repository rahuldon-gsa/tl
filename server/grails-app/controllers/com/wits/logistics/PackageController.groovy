package com.wits.logistics

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured  

@Secured('IS_AUTHENTICATED_FULLY')
@Transactional(readOnly = true)
class PackageController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Package.list(params), model:[packageCount: Package.count()]
    }

    def show(Package package) {
        respond package
    }

	def getById(Integer packageId){
		respond Package.get(packageId);
	}
	
	def updateStatus(Integer packageId, String status){
		def package = Package.get(packageId)
		package.status = status
		package.save flush:true
		render status: CREATED
	}

    @Transactional
    def save(Package package) {
        if (package == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (package.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond package.errors, view:'create'
            return
        }

        package.save flush:true

        respond package, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Package package) {
        if (package == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (package.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond package.errors, view:'edit'
            return
        }

        package.save flush:true

        respond package, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Package package) {

        if (package == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        package.delete flush:true

        render status: NO_CONTENT
    }
}
