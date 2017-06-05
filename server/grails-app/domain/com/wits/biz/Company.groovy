package com.wits.biz
import com.wits.core.Base
import com.wits.core.Address
import com.wits.sec.User

class Company{

	String name, ein, description, stateId
	Address address
	User agent // Registered agent for state registration purpose
	String entityType // LLC, S-Corp, C-Corp, LLP, Other
	String registeredState

    Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified 
 
	static hasMany = [addresses: Address, clients: Client, trucks : Truck, trailers : Trailer, users: User]

    static constraints = {
		ein nullable:true
		description nullable:true
		stateId nullable:true
		clients nullable:true
		address nullable:true
		agent nullable:true
		trucks nullable:true
		trailers nullable:true
		addresses nullable:true
    }
}
