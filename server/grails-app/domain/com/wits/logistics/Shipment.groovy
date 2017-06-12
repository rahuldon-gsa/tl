package com.wits.logistics

class Shipment {

	String type // LTL, FTL, International
    String description 
	String shipmentId
	Load load

	Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified, Deleted  
	
    static constraints = {	
		description nullable:true
		load nullable:true		
    }   
}
