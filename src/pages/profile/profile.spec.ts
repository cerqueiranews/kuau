import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform, NavParams, NavController } from 'ionic-angular';
import { ProfilePage } from './profile';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
    PlatformMock,
    StatusBarMock,
    SplashScreenMock,
    NavParamsMock,
    NavControllerMock
} from '../../../test-config/mocks-ionic';
import { MyApp } from '../../app/app.component';
import { ProfilePageModule } from './profile.module'
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GithubProvider } from '../../providers/github/github';
import { HttpClientModule } from '@angular/common/http';

describe('Profile Page', () => {
    let fixture;
    let component;
    let urlParam: string = 'https://api.github.com/users/cerqueiranews';
    let de: DebugElement;
    let el: HTMLElement;
    beforeEach(async(() => {
        NavParamsMock.setParams(urlParam);
        TestBed.configureTestingModule({
            declarations: [MyApp],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                IonicModule.forRoot(ProfilePage),
                HttpClientModule,
                ProfilePageModule
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: NavController, useClass: NavControllerMock },
                GithubProvider
            ]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ProfilePage);
        component = fixture.componentInstance;
    });
    afterEach(() => {
        fixture.destroy();
        component = null;
    });
    it('should be created', () => {
        expect(component instanceof ProfilePage).toBe(true);
    });
    it('should be created with param url is not null', () => {
        expect(component['url']).not.toBeNull();
    });
    it('should be fill profile after call getProfile', async(() => {
        component.getProfile().then(data => {
            fixture.detectChanges();
            expect(component['profile']).not.toBeNull();
            expect(component['profile']).not.toBeUndefined();
            expect(component['profile']).toBeTruthy();
        });
    }));
    it('should be showed info profile after call getProfile', async(() => {
        component.getProfile().then(data => {
            fixture.detectChanges();

            de = fixture.debugElement.query(By.css('ion-title'));
            el = de.nativeElement;

            expect(el.textContent).toContain(component['profile']['name']);
            expect(de).not.toBeNull();

            de = fixture.debugElement.query(By.css('ion-card ion-item'));
            el = de.nativeElement;

            expect(el.textContent).toContain(component['profile']['name']);
            expect(el.textContent).toContain(component['profile']['login']);
            expect(de).not.toBeNull();

            de = fixture.debugElement.query(By.css('ion-card ion-item ion-avatar img'));
            el = de.nativeElement;
            expect(el.getAttribute('src')).toEqual(component['profile']['avatar']);
            expect(de).not.toBeNull();

            de = fixture.debugElement.query(By.css('ion-card-content'));
            el = de.nativeElement;

            if(component['profile']['bio']){
                expect(el.textContent).toContain(component['profile']['bio']);
            }
            if(component['profile']['company']){
                expect(el.textContent).toContain(component['profile']['company']);
            }
            if(component['profile']['location']){
                expect(el.textContent).toContain(component['profile']['location']);
            }
            if(component['profile']['blog']){
                expect(el.textContent).toContain(component['profile']['blog']);
            }
            if(component['profile']['email']){
                expect(el.textContent).toContain(component['profile']['email']);
            }
            expect(de).not.toBeNull();

            de = fixture.debugElement.query(By.css('#followers'));
            el = de.nativeElement;

            expect(el.textContent).toContain(component['profile']['followers']);
            expect(de).not.toBeNull();

            de = fixture.debugElement.query(By.css('#following'));
            el = de.nativeElement;

            expect(el.textContent).toContain(component['profile']['following']);
            expect(de).not.toBeNull();

            de = fixture.debugElement.query(By.css('#public_repos'));
            el = de.nativeElement;

            expect(el.textContent).toContain(component['profile']['public_repos']);
            expect(de).not.toBeNull();

            de = fixture.debugElement.query(By.css('ion-row ion-col a'));
            el = de.nativeElement;

            expect(el.getAttribute('href')).toEqual(component['profile']['url']);
            expect(de).not.toBeNull();
        });
    }),10000);

});