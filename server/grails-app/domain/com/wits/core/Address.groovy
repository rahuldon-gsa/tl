package com.wits.core

class Address{

    String type, state, address1, address2, city, zipCode, country, description
    Double latitude, longitude

	Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified, Deleted  

    static constraints = {	
        address2 nullable: true 
        latitude nullable: true 
        longitude nullable: true 
		description nullable:true
    } 
}
 