import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/*
  Generated class for the GithubProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GithubProvider {

    constructor(public http: HttpClient) {
        
    }

    search(term: string) {

        let url: string = 'https://api.github.com/search/users?q=' + term;

        return this.http.get(url, { observe: 'response', responseType: 'json' })
            .timeout(10000)
            .retry(3)
            .map((res: any) => {
                let data = res.body;
                if(data.items && Array.isArray(data.items)){
                    return data;
                }else{
                    return { total_count: 0, items: [] };
                }
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getUrl(resource: string) {
        let url: string = resource;
        return this.http.get(url, { observe: 'response', responseType: 'json' })
            .timeout(10000)
            .retry(3)
            .map((res: any) => {
                let data = res.body;
                if(data){
                    return data;
                }else{
                    return { };
                }
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

}
