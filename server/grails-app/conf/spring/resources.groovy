// Place your Spring DSL code here
import grails.rest.render.json.*
import com.wits.sec.User
beans = {
    userRenderer(JsonRenderer, User) {
        excludes = ['password']
    }
}
