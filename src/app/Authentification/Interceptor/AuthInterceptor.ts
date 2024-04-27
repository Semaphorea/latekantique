import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable ,InjectionToken,NgModule} from "@angular/core";
import { Observable } from "rxjs";

export const AUTHINTERCEPTOR_TOKEN = new InjectionToken<AuthInterceptor>('AUTHINTERCEPTOR_TOKEN');

@NgModule({

    declarations:[],
})

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = sessionStorage.getItem("token");  
        console.log("AuthInterceptor",idToken) ; 
        if (idToken) {
            
            const cloned = req.clone({
                headers: req.headers.set("Authorization","Bearer " + idToken),
            });
            
            console.log("AuthInterceptor L25, Authorization Header : ",cloned);
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}
      
