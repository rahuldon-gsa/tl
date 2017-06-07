package com.wits.logistics

class Load {

	Boolean needForkLift
	Boolean needHelp
	String type // LTL, FTL
	Location source
	Location destination
	String description

	// FTL
	String trailerType
	Boolean isTrailerReady

	Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified, Deleted  

	static hasMany = [packages: Package]
    static constraints = {	
		description nullable:true
		trailerType nullable:true
    }   
}
