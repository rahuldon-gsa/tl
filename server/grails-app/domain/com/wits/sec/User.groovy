package com.wits.sec

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

@EqualsAndHashCode(includes='username')
@ToString(includes='username', includeNames=true, includePackage=false)
class User implements Serializable {

	private static final long serialVersionUID = 1

	transient springSecurityService

	String username
	String password
	boolean enabled = true
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired
	String phoneNumber, email, mobile
	Date dateOfBirth  
	String firstName, middleName, lastName, gender, designation
	String type // Company, System, Client
	String companyId // Reference to company

	User(String username, String password) {
		this()
		this.username = username
		this.password = password
	}

	User(String username, String password, String phoneNumber, String email, Date dateOfBirth, String firstName, String middleName, String lastName, String gender, String designation, String mobile, String type, String companyId) {
		this()
		this.username = username
		this.password = password
		this.phoneNumber = phoneNumber
		this.email = email
		this.dateOfBirth = dateOfBirth
		this.firstName = firstName
		this.middleName = middleName
		this.lastName = lastName
		this.gender = gender
		this.designation = designation
		this.mobile = mobile
		this.type = type
		this.companyId = companyId
	}

	Set<Role> getAuthorities() {
		UserRole.findAllByUser(this)*.role
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
	}

	static transients = ['springSecurityService']

	static constraints = {
		username nullable:true, unique: true
		password nullable :true, password: true		
		gender nullable:true
		dateOfBirth nullable:true
		phoneNumber nullable:true
        email email: true, blank: false, unique:true 
        middleName nullable: true 
		designation nullable: true 
		companyId nullable:true
	}

	static mapping = {
		password column: '`password`'
	}
}
