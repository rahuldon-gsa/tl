package overflow

class UrlMappings {

    static mappings = {
		
        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")

        "/"(controller: 'application', action:'index')
        "/user/findByUsername"(controller: 'user', action:'findByUserName')
        "/user/findById"(controller: 'user', action:'findUserById')
		"/user/findAllByCompany"(controller: 'user', action:'findAllUserByCompanyId')
        "/user/findAddresses"(controller: 'address', action:'findAddresses')
		"/address/updateStatus"(controller: 'address', action:'updateStatus')	
        "/address/findAddressById"(controller: 'address', action:'getById')
		"/company/findCompanyByUserId"(controller: 'company', action:'getByUserId')
		"/company/attachUserToCompany"(controller: 'company', action:'addUserToCompany')
		"/company/findCompanyById"(controller: 'company', action:'getById')			 
		"/company/findAllAddresses"(controller: 'company', action:'getAllAddresses')			 
		"/client/findAllClients"(controller: 'client', action:'getAllClientsByCompany')	
		"/client/findClientById"(controller: 'client', action:'getById')	
		"/clientUser/findUserById"(controller: 'clientUser', action:'getById')	
		"/clientUser/updateStatus"(controller: 'clientUser', action:'updateStatus')	
        "/truck/findAllCompanyTrucks"(controller: 'truck', action:'getAllTruckByCompany')	
		"/truck/findTruckById"(controller: 'truck', action:'getById')	
		"/trailer/findAllCompanyTrailers"(controller: 'trailer', action:'getAllTrailerByCompany')	
		"/trailer/findTrailerById"(controller: 'trailer', action:'getById')	
		"500"(view: '/error')
        "404"(view: '/notFound')
    }
}
