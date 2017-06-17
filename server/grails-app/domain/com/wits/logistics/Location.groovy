package com.wits.logistics

class Location {

    String type, state, address1, address2, city, zipCode, country, description, name
    Double latitude, longitude
	String locationId
	String daysToDeliver

	Date startDate
	String startTime

	Date dateCreated
    Date lastUpdated
    String createdBy
    String updatedBy
	String status // Initial, Active, Disabled, Verified, Deleted  

    static constraints = {	
		name nullable:true
		locationId nullable:true
        address2 nullable: true 
        latitude nullable: true 
        longitude nullable: true 
		description nullable:true
		startTime nullable:true
		startDate nullable:true
		daysToDeliver nullable:true
		type nullable:true
    }  
}
