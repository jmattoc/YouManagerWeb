import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthUtils } from './auth.utils';
//import { UserService } from 'app/core/user/user.service';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }


    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    set accessTokenSeguridad(token: string) {
        localStorage.setItem('accessTokenSeguridad', token);
    }


    get accessTokenSeguridad(): string {
        return localStorage.getItem('accessTokenSeguridad') ?? '';
    }



    set accessEdi(token: string) {
        localStorage.setItem('accessEdi', token);
    }


    get accessEdi(): string {
        return localStorage.getItem('accessEdi') ?? '';
    }


    set accessOpcionesPorUsuario(data: string) {
        localStorage.setItem('accessOpcionesPorUsuario', data);
    }
    get accessOpcionesPorUsuario() {
        return localStorage.getItem('accessOpcionesPorUsuario') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    /*signIn(credentials: any): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(environment.apiUrl + '/Seguridad',
            credentials,
        ).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.body;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = JSON.parse(AuthUtils._decodeToken(response.body).data);
                // Return a new observable with the response
                return of(response);
            })
        );
    }*/

    login(login: string, password: string) { 
        console.log(`${environment.apiBaseSeguridad}/Auth`);
        return this._httpClient.post(`${environment.apiBaseSeguridad}/Auth`, { login, password, CodigoAcceso: 'HfMh/wU/aC1LWyOD1nRNqVOCE5E=' })            
            .pipe(map(data => {    
                console.log(data);
                this.setSession(data);
                return data;
            }));
    }

    setSession(data: any) {        
        const expiresAt = moment().add(data.expiresIn, 'days');
        localStorage.setItem('Id', data.id);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('NombreCompleto', data.nombreCompleto);
        localStorage.setItem('listOpciones', JSON.stringify(data.listOpciones));
        localStorage.setItem('role', data.role);
        localStorage.setItem('dominioweb',data.dominioweb)
        //this.accessToken = data.token;
        //this.accessTokenSeguridad = data.token;
        this.accessToken = data.tokenApp;
        //localStorage.setItem('token', data.token);
        localStorage.setItem('tokenBi', data.tokenBi);        
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));        
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        localStorage.removeItem('Id');
        localStorage.removeItem('nombre');
        localStorage.removeItem('NombreCompleto');
        localStorage.removeItem('listOpciones');
        localStorage.removeItem('role');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenSeguridad');
        //localStorage.setItem('token', data.token);
        localStorage.removeItem('tokenBi');
        localStorage.removeItem('permiteEditarSolicitud');
        localStorage.removeItem('expires_at');
        this._authenticated = false;
        return of(true);
        /*return this._httpClient.get(environment.apiUrl + '/Seguridad/Salir').pipe(
            switchMap((response: any) => {
                localStorage.removeItem('tokenBi');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('navigation');
                this._authenticated = false;
                return of(true);
            })
        );*/
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }


        return of(true);
        //  return this.getUserDataInUsingToken();
        // //  return this.signInUsingToken();
    }

    /** Obtiene la información del usuario */
    getUserDataInUsingToken(): Observable<any> {
        this._userService.user = JSON.parse(AuthUtils._decodeToken(this.accessToken).data);

        return of(true);
    }

    getPermiteEditarSolicitud() {
        return (localStorage.getItem('permiteEditarSolicitud') === 'true');
    }
    getRole() {
        return localStorage.getItem('role');
    }
    isProveedor() {
        return localStorage.getItem('role') == 'PROVEEDOR';
    }
    isAdmin() {
        return this.getRole() == 'ADMIN';
    }
    getExpiration() {
        const expiration = localStorage.getItem('expires_at');

        if (expiration) {
            const expiresAt = JSON.parse(expiration);
            return moment(expiresAt);
        }
        return null;
    }
    isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }
    getidusuario() {
        return localStorage.getItem('Id') || '';
    }
    getName() {
        return localStorage.getItem('nombre') || '';
    }
    getNameperfil() {
        return localStorage.getItem('nombreperfil') || '';
    }
    getRol() {
        return localStorage.getItem('role') || '';
    }

}
