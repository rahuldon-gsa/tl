package com.wits.biz
import com.wits.core.Base
import com.wits.core.Address

class Company extends Base{

	String name, ein, description, stateId
	Address address
	String agent // Registered agent for state registration purpose
	String entityType // LLC, S-Corp, C-Corp, LLP, Other
	String registeredState

	static hasMany = [clients: Client]

    static constraints = {
		ein nullable:true
		description nullable:true
		stateId nullable:true
    }
}
