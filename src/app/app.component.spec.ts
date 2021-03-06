import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import {
    PlatformMock,
    StatusBarMock,
    SplashScreenMock
} from '../../test-config/mocks-ionic';
describe('MyApp Component', () => {
    let fixture;
    let component;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp],
            imports: [
                IonicModule.forRoot(MyApp)
            ],
            providers: [
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: Platform, useClass: PlatformMock }
            ]
        })
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MyApp);
        component = fixture.componentInstance;
    });
    afterEach(() => {
        fixture.destroy();
        component = null;
    });
    it('should be created', () => {
        expect(component instanceof MyApp).toBe(true);
    });
    it('should be returned from platform ready', () => {
        let platform = fixture.debugElement.injector.get(Platform);
        platform.ready().then((data) => {
            expect(data).toBe('READY');
        });
    });
    it('should be displayed the home page to the user', () => {
        expect(component['rootPage']).toBe('HomePage');
    });
});