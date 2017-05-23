package com.wits.core

class Base {

    static mapWith = "none"

    transient springSecurityService

    Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy

    static transients = ['springSecurityService']

    def beforeInsert() {
        createdBy = springSecurityService?.principal?.id 
        updatedBy = springSecurityService?.principal?.id 
	}

	def beforeUpdate() {		
        updatedBy = springSecurityService?.principal?.id 
	}

}
