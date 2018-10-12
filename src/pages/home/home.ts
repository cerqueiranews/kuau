import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GithubProvider } from '../../providers/github/github';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    private title: string = 'GitHub';
    private term: string = '';
    private list: any[] = [];
    private total: number = 0;
    private table: string = 'search';
    private storage: Storage;

    constructor(public navCtrl: NavController, public navParams: NavParams, private githubPrvd: GithubProvider) {
        this.storage = new Storage({
            name: 'kuau',
            driverOrder: ['indexeddb', 'sqlite', 'websql', 'localstorage'],
            storeName: this.table
        });

    }

    onSearchInput($event): Promise<number> | boolean {
        if (this.term != '') {
            return this.search();
        } else {
            this.total = 0;
            this.list.splice(0, this.list.length);
            return true;
        }
    }

    search(): Promise<number> {
        return new Promise(resolve => {
            this.list.splice(0, this.list.length);
            this.storage.forEach((value, key, int) => {
                //Primeiro busca dados locais, caso não retorne registro busca no git.
                if (key.toLocaleLowerCase().indexOf(this.term.toLocaleLowerCase()) >= 0) {
                    this.list.push(value);
                }
            }).then(data => {
                if (this.list.length == 0) {
                    this.githubPrvd.search(this.term).subscribe(data => {
                        this.total = data.total_count;
                        this.list.splice(0, this.list.length);
                        data.items.forEach(item => {
                            let newItem = {
                                login: item.login,
                                profile_url: item.html_url,
                                avatar_url: item.avatar_url,
                                detail_url: item.url
                            };
                            this.list.push(newItem);
                            //Armazena retorno da busca para busca local futuramente
                            this.storage.set(item.login, newItem);
                        });
                        resolve(1);
                        console.log('Pesquisa realizada com sucesso.');
                    }, error => {
                        this.total = 0;
                        this.list.splice(0, this.list.length);
                        console.error(error);
                        resolve(0);
                        console.error('Houve algum erro ao realizar a pesquisa. Consulte o log.');
                    });
                }else{
                    //Pesquisa local retornou resultado.
                    resolve(2);
                    console.log('Pesquisa realizada com sucesso.');
                }
            });
        });
    }

    openProfile(url: string): void {
        this.navCtrl.push('ProfilePage', { url: url });
    }

}
