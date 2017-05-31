package com.wits.biz

class ClientUser {

	String phoneNumber, email, mobile
	String firstName, middleName, lastName, gender, designation
	String type // Client
    static constraints = {
		phoneNumber nullable:true
		middleName nullable:true
		gender nullable:true
		designation nullable:true		
    }
}
