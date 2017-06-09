package com.wits.logistics

class Load {

	Boolean needForkLift
	Boolean needHelp
	Location source
	Location destination
	String loadId

	// Only HTL
	Boolean isStackable  	
	Boolean isHazardous

	// FTL
	String trailerType
	Boolean isTrailerReady
	String trailerSize
	String permitDocLocation

	Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified, Deleted
	String description

	static hasMany = [items: Item]
    static constraints = {	
		description nullable:true
		trailerType nullable:true
		permitDocLocation nullable:true
    }   
}
