webpackJsonp([1],{

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(297);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ],
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_github_github__ = __webpack_require__(201);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, githubPrvd) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.githubPrvd = githubPrvd;
        this.title = 'GitHub';
        this.term = '';
        this.list = [];
        this.total = 0;
        this.table = 'search';
        this.storage = new __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]({
            name: 'kuau',
            driverOrder: ['indexeddb', 'sqlite', 'websql', 'localstorage'],
            storeName: this.table
        });
    }
    HomePage.prototype.onSearchInput = function ($event) {
        if (this.term != '') {
            return this.search();
        }
        else {
            this.total = 0;
            this.list.splice(0, this.list.length);
            return true;
        }
    };
    HomePage.prototype.search = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.list.splice(0, _this.list.length);
            _this.storage.forEach(function (value, key, int) {
                //Primeiro busca dados locais, caso não retorne registro busca no git.
                if (key.toLocaleLowerCase().indexOf(_this.term.toLocaleLowerCase()) >= 0) {
                    _this.list.push(value);
                }
            }).then(function (data) {
                if (_this.list.length == 0) {
                    _this.githubPrvd.search(_this.term).subscribe(function (data) {
                        _this.total = data.total_count;
                        _this.list.splice(0, _this.list.length);
                        data.items.forEach(function (item) {
                            var newItem = {
                                login: item.login,
                                profile_url: item.html_url,
                                avatar_url: item.avatar_url,
                                detail_url: item.url
                            };
                            _this.list.push(newItem);
                            //Armazena retorno da busca para busca local futuramente
                            _this.storage.set(item.login, newItem);
                        });
                        resolve(1);
                        console.log('Pesquisa realizada com sucesso.');
                    }, function (error) {
                        _this.total = 0;
                        _this.list.splice(0, _this.list.length);
                        console.error(error);
                        resolve(0);
                        console.error('Houve algum erro ao realizar a pesquisa. Consulte o log.');
                    });
                }
                else {
                    //Pesquisa local retornou resultado.
                    resolve(2);
                    console.log('Pesquisa realizada com sucesso.');
                }
            });
        });
    };
    HomePage.prototype.openProfile = function (url) {
        this.navCtrl.push('ProfilePage', { url: url });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\cerqu\OneDrive\Desenvolvimento\kuau\src\pages\home\home.html"*/'<!--\n  Generated template for the HomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color=\'dark\'>\n        <ion-title>{{title}}</ion-title>\n    </ion-navbar>\n    <ion-toolbar color=\'dark\'>\n        <ion-searchbar [(ngModel)]=\'term\' (ionInput)=\'onSearchInput($event)\'>\n        </ion-searchbar>\n    </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <p *ngIf=\'list.length == 0\' text-center>\n        <em>Nenhum dado para ser exibido (re)faça sua busca.</em>\n        <ion-icon name=\'search\'></ion-icon>\n    </p>\n    <ion-list>\n        <ion-item *ngFor=\'let item of list\' (click)=\'openProfile(item.detail_url)\'>\n            <ion-avatar item-left>\n                <img src=\'{{item.avatar_url}}\'>\n            </ion-avatar>\n            <h2>{{item.login}}</h2>\n            <p>{{item.profile_url}}</p>\n        </ion-item>\n    </ion-list>\n</ion-content>\n\n\n<ion-footer>\n    <ion-toolbar color=\'dark\' text-center>\n        <ion-note padding-top padding-bottom>\n            <small>\n                @cerqueiranews 2018<br />\n                http://github.com/cerqueiranews\n            </small>\n        </ion-note>\n    </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"C:\Users\cerqu\OneDrive\Desenvolvimento\kuau\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_github_github__["a" /* GithubProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=1.js.map