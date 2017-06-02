package com.wits.biz

class ClientUser {

	String phoneNumber, email, mobile
	String firstName, middleName, lastName, gender, designation, description
	String type // Client

    Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status 
	
    static constraints = {
		phoneNumber nullable:true
		middleName nullable:true
		gender nullable:true
		designation nullable:true	
		description nullable:true	
    }
}
