import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private configService: ConfigService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Observable(subscriber => {
      this.authService.isAuthenticated().subscribe(result => {
        if (result) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          subscriber.next(false);
          subscriber.complete();
          window.location.href = this.configService.APIURL + '/user/login?redirect_uri=' +
            encodeURIComponent(this.buildTargetUrlString(route));
        }
      });
    });
  }

  buildTargetUrlString(route: ActivatedRouteSnapshot): string {
    return this.buildProtocolAndHostnameString() +
      this.buildPathString(route.pathFromRoot) +
      this.buildQueryString(route.queryParams) +
      this.buildFragmentString(route.fragment);
  }

  buildProtocolAndHostnameString() {
    return window.location.protocol + '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '');
  }

  buildPathString(pathFromRoot: ActivatedRouteSnapshot[]): string {
    return pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .join('/');
  }

  buildQueryString(params: Params): string {
    var queryString = '';
    for (let key in params) {
      queryString =
      ((queryString.length == 0) ? '?' : '&') +
      encodeURIComponent(key) + '=' +
      encodeURIComponent(params[key])
    }
    return queryString;
  }

  buildFragmentString(fragment: string) {
    return (fragment && fragment.length == 0) ? '' : '#' + encodeURIComponent(fragment);
  }

}
