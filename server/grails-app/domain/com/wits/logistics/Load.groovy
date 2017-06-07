package com.wits.logistics

class Load {

	Boolean needForkLift
	Boolean needHelp
	String goodsType // new, used, other
	Location source
	Location destination
	String loadId

	// FTL
	String trailerType
	Boolean isTrailerReady

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
    }   
}
