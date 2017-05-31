package com.wits.biz
import com.wits.core.Base
import com.wits.core.Address
import com.wits.sec.User 

class Client {

	String clientId, name, phoneNumber, email
	Address registeredAddress
	User pointOfContact

	Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified  

	static hasMany = [addresses: Address]
	//static belongsTo = [company: Company]   
    static constraints = {
		registeredAddress nullable:true
		pointOfContact nullable:true
		addresses nullable:true
    }
}
