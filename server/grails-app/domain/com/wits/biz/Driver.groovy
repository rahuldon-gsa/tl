package com.wits.biz
import com.wits.core.Address

class Driver {

	String licenseNumber
	Date licenseExpirationDate
	String driverId
	String currentStatus // On Leave, Sick, In-Transit, At-Destination
	Address homeAddress
	ClientUser pointOfContact

    Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified 
 
    static constraints = {
		homeAddress nullable:true
		pointOfContact nullable:true		
    }
}
