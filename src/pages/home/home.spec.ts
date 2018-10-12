import { async, TestBed, tick } from '@angular/core/testing';
import { IonicModule, Platform, NavParams, NavController } from 'ionic-angular';
import { HomePage } from './home';
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
import { HomePageModule } from './home.module'
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GithubProvider } from '../../providers/github/github';
import { HttpClientModule } from '@angular/common/http';

describe('Home Page', () => {
    let fixture;
    let component;
    let de: DebugElement;
    let el: HTMLElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                IonicModule.forRoot(HomePage),
                HttpClientModule,
                HomePageModule
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: NavParams, useClass: NavParamsMock },
                { provide: NavController, useClass: NavControllerMock },
                GithubProvider
            ]
        });
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
    });
    afterEach(() => {
        fixture.destroy();
        component = null;
    });
    it('should be created', (done) => {
        expect(component instanceof HomePage).toBe(true);
        done();
    });
    it('title should be initialized with GitHub', (done) => {
        expect(component['title']).toEqual('GitHub');
        done();
    });
    it('title should be initialized with GitHub and showed that way', (done) => {
        let title = 'GitHub';
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('ion-title'));
        el = de.nativeElement;

        expect(component['title']).toEqual(title);
        expect(el.textContent).toContain(title);
        done();
    });
    it('text should be showed if list is empty', (done) => {
        let text = 'Nenhum dado para ser exibido (re)faça sua busca.';
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('em'));
        el = de.nativeElement;

        expect(component['list'].length).toEqual(0);
        expect(de).not.toBeNull();
        expect(el.textContent).toContain(text);
        done();

    });
    it('text should be showed if list is empty after search', (done) => {
        let text = 'Nenhum dado para ser exibido (re)faça sua busca.';
        component['term'] = '';
        expect(component.onSearchInput()).toBeTruthy();
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('em'));
        el = de.nativeElement;

        expect(component['list'].length).toEqual(0);
        expect(de).not.toBeNull();
        expect(el.textContent).toContain(text);
        done();

    });
    it('text should not be showed if list is not empty', (done) => {
        component['term'] = 'cerqueiranews';
        component.onSearchInput().then(data => {
            fixture.detectChanges();
            de = fixture.debugElement.query(By.css('em'));

            expect(component['list'].length).toBeGreaterThan(0);
            expect(de).toBeNull();
            done();
        });

    });
    it('list should be clean if term is empty', (done) => {
        component['term'] = 'cerqueiranews';
        component.onSearchInput().then(data => {
            fixture.detectChanges();
            de = fixture.debugElement.query(By.css('em'));

            expect(component['list'].length).toBeGreaterThan(0);
            expect(de).toBeNull();

            let text = 'Nenhum dado para ser exibido (re)faça sua busca.';
            component['term'] = '';
            component.onSearchInput();
            fixture.detectChanges();
            de = fixture.debugElement.query(By.css('em'));
            el = de.nativeElement;

            expect(component['list'].length).toEqual(0);
            expect(de).not.toBeNull();
            expect(el.textContent).toContain(text);
            done();
        });
    });
    it('after search should be showed a list if list is not empty', (done) => {
        component['term'] = 'cerqueiranews';
        component.onSearchInput().then(data => {
            fixture.detectChanges();
            de = fixture.debugElement.query(By.css('em'));

            expect(component['list'].length).toBeGreaterThan(0);
            expect(de).toBeNull();
            done();
        });
    });
    it('after click on item should be showed a page profile', (done) => {
        component['term'] = 'cerqueiranews';
        component.onSearchInput().then(data => {
            fixture.detectChanges();
            spyOn(component, 'openProfile');

            de = fixture.debugElement.query(By.css('ion-list ion-item'));
            de.triggerEventHandler('click', null);
            //el = fixture.nativeElement.querySelector('ion-list ion-item');
            //el.click();
            fixture.detectChanges();

            expect(component['list'].length).toBeGreaterThan(0);
            expect(de).not.toBeNull();
            expect(component.openProfile).toHaveBeenCalledWith(component['list'][0]['detail_url']);
            done();
        });
    });
    it('push should be showed called after openProfile', (done) => {
        let navCtrl = fixture.debugElement.injector.get(NavController);
        spyOn(navCtrl, 'push');

        component.openProfile('https://api.github.com/users/cerqueiranews');
        fixture.detectChanges();

        expect(navCtrl.push).toHaveBeenCalledWith('ProfilePage', { url: 'https://api.github.com/users/cerqueiranews' });
        done();
    });
    it('info user should be showed after search', (done) => {
        component['term'] = 'cerqueiranews';
        component.onSearchInput().then(data => {
            fixture.detectChanges();

            de = fixture.debugElement.query(By.css('ion-list ion-item'));
            el = de.nativeElement;

            expect(el.textContent).toContain(component['list'][0]['login']);
            expect(el.textContent).toContain(component['list'][0]['profile_url']);

            de = fixture.debugElement.query(By.css('ion-list ion-item ion-avatar img'));
            el = de.nativeElement;
            expect(el.getAttribute('src')).toEqual(component['list'][0]['avatar_url']);
            expect(de).not.toBeNull();
            done();
        });
    });

});