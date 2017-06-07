package com.wits.logistics

class Shipment {

	String description

	Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified, Deleted  

    static constraints = {	
		description nullable:true
    }   
}
