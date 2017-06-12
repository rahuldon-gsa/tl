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
		"/truck/updateStatus"(controller: 'truck', action:'updateStatus')       
		"/trailer/findAllCompanyTrailers"(controller: 'trailer', action:'getAllTrailerByCompany')	
		"/trailer/findTrailerById"(controller: 'trailer', action:'getById')	
		"/trailer/updateStatus"(controller: 'trailer', action:'updateStatus')  

		"/item/findItemById"(controller: 'item', action:'getById')	
		"/item/updateStatus"(controller: 'item', action:'updateStatus')        
		"/load/findLoadById"(controller: 'load', action:'getById')	
		"/load/updateStatus"(controller: 'load', action:'updateStatus')       
		"/location/findLocationById"(controller: 'location', action:'getById')	
		"/location/updateStatus"(controller: 'location', action:'updateStatus')         
		"/shipment/findAllShipmentsByClient"(controller: 'shipment', action:'getAllShipmentByClient')	
		"/shipment/findShipmentById"(controller: 'shipment', action:'getById')	
		"/shipment/updateStatus"(controller: 'shipment', action:'updateStatus')   
		"/shipment/findAllShipments"(controller: 'shipment', action:'getAllShipments')           
		"500"(view: '/error')
        "404"(view: '/notFound')
    }
}
