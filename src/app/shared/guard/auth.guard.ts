import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  canActivateFn(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.authService.isLoggedIn) {
      this.router.navigate(['search'])
    }
    return true;
  }
}