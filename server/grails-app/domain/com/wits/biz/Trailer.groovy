package com.wits.biz

import com.wits.core.Address
import com.wits.sec.User

class Trailer {

	String trailerId, licenseNumber
	String loadingType // car, hazmat, bottle, liquid, other
	String length, width
	Address permanentAddress
	User owner // Should have User Defined
	String description
	String type // permanent, semi-permanent, other
	BigDecimal gvwr //  GROSS VEHICLE WEIGHT RATING GVWR
	BigDecimal unladenWeight
	
	Date dateCreated
    Date lastUpdated
    String 	createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified 

    static constraints = {
		description nullable:true		
    }
}
