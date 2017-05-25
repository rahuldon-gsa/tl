package com.wits.biz

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured 

@Secured('IS_AUTHENTICATED_FULLY')
@Transactional(readOnly = true)
class CompanyController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Company.list(params), model:[companyCount: Company.count()]
    }

    def show(Company company) {
        respond company
    }

	def getByUserId(Integer userId){
		respond Company.findByCreatedBy(userId)
	}


    @Transactional
    def save(Company company) {
        if (company == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (company.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond company.errors, view:'create'
            return
        }

        company.save flush:true

        respond company, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Company company) {
        if (company == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (company.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond company.errors, view:'edit'
            return
        }

        company.save flush:true

        respond company, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Company company) {

        if (company == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        company.delete flush:true

        render status: NO_CONTENT
    }
}
