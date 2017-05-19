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
        "/register/changeUserPassword"(controller: 'register', action:'findUser')
        "/register/getUserName"(controller: 'register', action:'findUserName')
        "/register/dhundho"(controller: 'register', action:'dhundho')        
        "/user/findByUsername"(controller: 'user', action:'findByUserName')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
