package com.wits.biz
import com.wits.core.Base
import com.wits.core.Address
import com.wits.sec.User 

class Client extends Base{

	String clientId, name, phoneNumber, email
	Address registeredAddress
	User pointOfContact

	static hasMany = [addresses: Address]
	static belongsTo = [company: Company]   
    static constraints = {
		registeredAddress nullable:true
		pointOfContact nullable:true
		addresses nullable:true
    }
}
