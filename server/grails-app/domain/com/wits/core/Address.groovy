package com.wits.core

class Address extends Base{

    String type, state, address1, address2, city, zipCode, country
    Double latitude, longitude

    static constraints = {	
        address2 nullable: true 
        latitude nullable: true 
        longitude nullable: true 
    } 
}
