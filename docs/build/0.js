webpackJsonp([0],{

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(298);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
            ],
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
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
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, githubPrvd) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.githubPrvd = githubPrvd;
        this.url = '';
        this.table = 'profile';
        this.storage = new __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]({
            name: 'kuau',
            driverOrder: ['indexeddb', 'sqlite', 'websql', 'localstorage'],
            storeName: this.table
        });
        this.url = this.navParams.get('url');
        if (this.url != '' && this.url != null) {
            this.getProfile();
        }
        else {
            console.error('URL não encontrada!');
            this.navCtrl.setRoot('HomePage');
        }
    }
    ProfilePage.prototype.getProfile = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get(_this.url).then(function (data) {
                if (data) {
                    _this.profile = data;
                    resolve(true);
                }
                else {
                    _this.githubPrvd.getUrl(_this.url).subscribe(function (data) {
                        _this.profile = {
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
                        };
                        //Armazena na base dados no dispositivo para acesso futuro;
                        _this.storage.set(_this.url, _this.profile);
                        resolve(true);
                    }, function (error) {
                        console.log(error);
                        _this.profile = {};
                        resolve(false);
                    });
                }
            });
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"C:\Users\cerqu\OneDrive\Desenvolvimento\kuau\src\pages\profile\profile.html"*/'<!--\n  Generated template for the ProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color=\'dark\'>\n        <ion-title>{{(profile?.name) ? profile?.name : profile?.login}}</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card color=\'dark\' *ngIf=\'profile\'>\n        <ion-item color=\'dark\'>\n            <ion-avatar item-left>\n                <img src=\'{{profile.avatar}}\'>\n            </ion-avatar>\n            <h2>{{profile.name}}</h2>\n            <p>@{{profile.login}}</p>\n        </ion-item>\n        <ion-card-content>\n            <p padding-top>{{(profile.bio ? profile.bio : \'&nbsp;\')}}</p>\n            <p padding-top>\n                <ion-note>\n                    <ion-icon name=\'briefcase\' item-start *ngIf=\'profile.company\'></ion-icon>\n                    {{profile.company}}\n                    <br *ngIf=\'profile.company\' />\n                    <ion-icon name=\'map\' item-start *ngIf=\'profile.location\'></ion-icon>\n                    {{profile.location}}\n                    <br *ngIf=\'profile.location\' />\n                    <ion-icon name=\'logo-rss\' item-start *ngIf=\'profile.blog\'></ion-icon>\n                    {{profile.blog}}\n                    <br *ngIf=\'profile.blog\' />\n                    <ion-icon name=\'mail\' item-start *ngIf=\'profile.email\'></ion-icon>\n                    {{profile.email}}\n                </ion-note>\n            </p>\n        </ion-card-content>\n        <ion-row>\n            <ion-col>\n                <button ion-button icon-left clear small>\n                    <ion-icon name=\'people\'></ion-icon>\n                    <div id=\'followers\'>{{profile.followers}}</div>\n                </button>\n            </ion-col>\n            <ion-col>\n                <button ion-button icon-left clear small>\n                    <ion-icon name=\'eye\'></ion-icon>\n                    <div id=\'following\'>{{profile.following}}</div>\n                </button>\n            </ion-col>\n            <ion-col>\n                <button ion-button icon-left clear small>\n                    <ion-icon name=\'cube\'></ion-icon>\n                    <div id=\'public_repos\'>{{profile.public_repos}}</div>\n                </button>\n            </ion-col>\n            <ion-col>\n                <a href=\'{{profile.url}}\' target=\'_blank\'>\n                    <button ion-button icon-left clear small>\n                        <ion-icon name=\'open\'></ion-icon>\n                    </button>\n                </a>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col col-6 text-left padding>\n                <ion-note id=\'create_at\'>\n                    <ion-icon name=\'document\'></ion-icon>\n                    &nbsp;{{profile.create_at | date}}\n                </ion-note>\n            </ion-col>\n            <ion-col col-6 text-right padding>\n                <ion-note id=\'update_at\'>\n                    <ion-icon name=\'refresh\'></ion-icon>\n                    &nbsp;{{profile.update_at | date}}\n                </ion-note>\n            </ion-col>\n        </ion-row>\n    </ion-card>\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar color=\'dark\' text-center>\n        <ion-note padding-top padding-bottom>\n            <small>\n                @cerqueiranews 2018<br />\n                http://github.com/cerqueiranews\n            </small>\n        </ion-note>\n    </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"C:\Users\cerqu\OneDrive\Desenvolvimento\kuau\src\pages\profile\profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_github_github__["a" /* GithubProvider */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

});
//# sourceMappingURL=0.js.map