package com.wits.logistics

class Item {

	String type
	String itemId
    String description 
	String freightClass
	BigDecimal length, width, height, weight
	String weightType
	String goodsType 

	Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified, Deleted  

    static constraints = {	
		description nullable:true
    }   
}
