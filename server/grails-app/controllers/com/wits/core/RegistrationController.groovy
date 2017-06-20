package com.wits.core

import grails.rest.*
import grails.converters.*
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured 
import com.wits.sec.*
 
@Transactional(readOnly = true)
@Secured('IS_AUTHENTICATED_ANONYMOUSLY')
class RegistrationController {
 
    static allowedMethods = [createAccount: "POST"]
		
	@Transactional 
	@Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def createAccount(User user) { 
        if (user == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (user.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond user.errors, view:'create'
            return
        }

        user.save flush:true
        UserRole.create user, Role.findByAuthority("ROLE_USER"), true
        respond user, [status: CREATED]
	}
}
