import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserJwtInterceptor } from './user-jwt-interceptor';
import { AdminJwtInterceptor } from './admin-jwt-interceptor';
import { SellerJwtInterceptor } from './seller-jwt-interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: UserJwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AdminJwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SellerJwtInterceptor, multi: true }
]