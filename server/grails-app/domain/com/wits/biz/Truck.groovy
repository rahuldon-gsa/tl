package com.wits.biz

import com.wits.core.Address
import com.wits.sec.User

class Truck {

	String licenseNumber, truckId
	String classType // CDL, HAZMAT
	String permitType // hazmat, fuel, car
	Address permanentAddress
	User owner // Should have User Defined
	String truckType // 4 wheel, 6 wheel, full cab
	BigDecimal pullingCapacity, gallonsCapacity, unladenWeight
	String vinNumber
	String axles
	BigDecimal gvwr //  GROSS VEHICLE WEIGHT RATING GVWR
	String fuelType

	String seatingCpacity
	String numberOfWheels
	BigDecimal gcwr // GROSS COMBINATION WEIGHT RATING GCWR	
	String titleNumber
	String insuranceType // Liability, full
	String year
	String make
	String model
	String inspectionType
	Date permitExpirationDate
	Date inspectionExpirationDate
	String color
	BigDecimal currentMileage
	String description 
	
  	Date dateCreated
    Date lastUpdated
    String  createdBy
    String  updatedBy
	String status // Initial, Active, Disabled, Verified 

    static constraints = {
		description nullable:true
		titleNumber nullable:true
		insuranceType nullable:true
		year nullable:true
		make nullable:true
		model nullable:true
		inspectionType nullable:true
		permitExpirationDate nullable:true
		inspectionExpirationDate nullable:true
		color nullable:true
		currentMileage nullable:true
		gcwr nullable:true
		numberOfWheels nullable:true
		seatingCpacity nullable:true
    }
}
