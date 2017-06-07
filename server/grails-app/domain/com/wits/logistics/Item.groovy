package com.wits.logistics

class Item {

	String type
    String description 
	String freightClass // 50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500

	Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified, Deleted  

    static constraints = {	
		description nullable:true
    }   
}
