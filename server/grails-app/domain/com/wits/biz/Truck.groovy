package com.wits.biz

import com.wits.core.Address
import com.wits.sec.User

class Truck {

	String licenseNumber, truckId
	String classType // CDL, HAZMAT
	String permitType // hazmat, fuel, car
	Address permanentAddress
	User owner // Should have User Defined
	String insuranceType // Liability, full
	String inspectionType
	Date permitExpirationDate
	Date inspectionExpirationDate
	String truckType // 4 wheel, 6 wheel, full cab
	String color
	BigDecimal grossWeight, pullingCapacity, gallonsCapacity
	String numberOfWheels
	String currentMileage
	String fuelType
	String description	

  	Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified 

    static constraints = {

    }
}
