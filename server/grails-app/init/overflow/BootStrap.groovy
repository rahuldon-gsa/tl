package overflow

import com.wits.sec.*

class BootStrap {

     def init = { servletContext ->
 
      def adminRole = new Role(authority: 'ROLE_ADMIN').save() 
      def userRole = new Role(authority: 'ROLE_USER').save() 

     def adminUser = new User(username: 'admin', password: 'admin', phoneNumber:'7034568964',email:'admin@gmail.com',dateOfBirth:new Date(),firstName : 'Truck',
     middleName:'Tempo', lastName:'Loader', gender:'M', designation:'admin', mobile:'7034567896', type:'system').save()

	  UserRole.create adminUser, adminRole

	   35.times{ i->

     	  UserRole.create new User(username: 'admin'+i, password: 'admin'+i, phoneNumber:'7034568964',email: i+'admin@gmail.com',dateOfBirth:new Date(),firstName : i+'Truck',
     middleName:'Tempo', lastName:i+'Loader', gender:'M', designation:'user', mobile:'7034567896', type:'system').save(), userRole


	 }

      UserRole.withSession {
         it.flush()
         it.clear()
      }

      //assert User.count() == 1
      assert Role.count() == 2
      assert UserRole.count() == 36
 
    }
    def destroy = {
    }
}

