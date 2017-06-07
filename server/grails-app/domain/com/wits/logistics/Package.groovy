package com.wits.logistics

class Package {

	String type 
    String description 
	String goodsType // new, used, other

	// Only HTL
	Boolean isStackable // Only HTL  	
	Boolean isHazardous

	Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified, Deleted  
	
	static hasMany = [items: Item]
    static constraints = {	
		description nullable:true
    }   
}
