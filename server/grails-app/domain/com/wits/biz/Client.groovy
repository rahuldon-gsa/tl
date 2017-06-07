package com.wits.biz
import com.wits.core.Base
import com.wits.core.Address
import com.wits.sec.User
import com.wits.logistics.Shipment

class Client {

	String clientId, name, phoneNumber, email
	Address registeredAddress
	ClientUser pointOfContact

	Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified  

	static hasMany = [addresses: Address, users: ClientUser, shipments : Shipment]
	//static belongsTo = [company: Company]   
    static constraints = {
		registeredAddress nullable:true
		pointOfContact nullable:true
		addresses nullable:true
		users nullable:true
    }
}
