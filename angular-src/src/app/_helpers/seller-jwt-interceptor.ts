import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavbarService } from 'src/app/_services/navbar.service';

@Injectable()
export class SellerJwtInterceptor implements HttpInterceptor {
    public headers: HttpHeaders;
    constructor(private navbarServ: NavbarService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.navbarServ.isSellerLoggedIn()){
            const jwtToken = this.navbarServ.getAuthorizationToken();

            request = request.clone({
                setHeaders: { Authorization: 'Bearer ' + jwtToken}
            });
        }
        return next.handle(request);
    }
}