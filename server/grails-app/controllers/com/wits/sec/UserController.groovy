package com.wits.sec

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured 

@Secured('IS_AUTHENTICATED_FULLY')
@Transactional(readOnly = true)
class UserController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond User.list(params), model:[userCount: User.count()]
    }

    def show(User user) {
        respond user
    }

    def findByUserName(String username){
        log.info "Username :: " + username
        respond User.findByUsername(username);
    }

    def findUserById(Integer userId){
        log.info "User ID :: " + userId
        respond User.get(userId);
    }

     @Transactional
    def findUser(String username) {
        def dbuser = User.findByUsername(username)
        if (dbuser == null) {
            render status: NOT_FOUND
            return
        }
        dbuser.password = 'World@24'
        dbuser.save()
        respond status: OK
    }

    def findUserName(String firstName, String lastName, String mobile) {
        def register = User.findByFirstNameAndLastNameAndMobile(firstName, lastName, mobile)
         if (register == null) {
            render status: NOT_FOUND
            return
        }
        respond register
    }

    @Transactional
    def save(User user) {
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

        respond user, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(User user) {
        if (user == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (user.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond user.errors, view:'edit'
            return
        }

        user.save flush:true

        respond user, [status: OK, view:"show"]
    }

    @Transactional
    def delete(User user) {

        if (user == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        user.delete flush:true

        render status: NO_CONTENT
    }
}
