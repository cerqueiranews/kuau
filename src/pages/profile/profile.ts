import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GithubProvider } from '../../providers/github/github';
import { User } from '../../providers/github/github.model';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    private url: string = '';
    private profile: User;
    private table: string = 'profile';
    private storage: Storage;

    constructor(public navCtrl: NavController, public navParams: NavParams, private githubPrvd: GithubProvider) {
        this.storage = new Storage({
            name: 'kuau',
            driverOrder: ['indexeddb', 'sqlite', 'websql', 'localstorage'],
            storeName: this.table
        });

        this.url = this.navParams.get('url');

        if (this.url != '' && this.url != null) {
            this.getProfile().then(data => {
                if(data){
                    console.log('Profile encontrado!'); 
                }else{
                    console.error('Erro ao buscar o profile!'); 
                }
            });
        } else {
            console.error('URL não encontrada!');
            this.navCtrl.setRoot('HomePage');
        }
    }

    getProfile(){
        return new Promise(resolve => {
            this.storage.get(this.url).then(data => {
                if(data){
                    this.profile = data;
                    resolve(true);
                }else{
                    this.githubPrvd.getUrl(this.url).subscribe(data => {
                        this.profile = {
                            id: data.id,
                            login: data.login,
                            avatar: data.avatar_url,
                            name: data.name,
                            email: data.email,
                            bio: data.bio,
                            blog: data.blog,
                            url: data.html_url,
                            location: data.location,
                            company: data.company,
                            public_repos: data.public_repos,
                            public_repos_url: data.repos_url,
                            followers: data.followers,
                            followers_url: data.followers_url,
                            following: data.following,
                            following_url: data.following_url,
                            create_at: data.created_at,
                            update_at: data.updated_at
                        }
                        
                        //Armazena na base dados no dispositivo para acesso futuro;
                        this.storage.set(this.url, this.profile);
                        resolve(true);
                    }, error => {
                        this.profile = <User>{};
                        console.log(error);
                        resolve(false);
                    });
                }
            });
        });
    }

}
