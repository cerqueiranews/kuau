import { async, TestBed, inject } from '@angular/core/testing';
import { IonicModule, Platform, NavParams, NavController } from 'ionic-angular';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
    PlatformMock,
    StatusBarMock,
    SplashScreenMock,
    NavParamsMock,
    NavControllerMock
} from '../../../test-config/mocks-ionic';
import { GithubProvider } from './github';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('Github Provider', () => {
    let fixture;
    let component;
    let de: DebugElement;
    let el: HTMLElement;
    let term: string = 'cerqueiranews';
    let url: string = 'https://api.github.com/users/cerqueiranews';
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                HttpClientModule
            ],
            providers: [
                GithubProvider,
                HttpClient
            ]
        }).compileComponents();
    }));
    beforeEach(() => {

    });
    afterEach(() => {

    });
    it('should be created', inject([GithubProvider], (githubPrvd) => {
        expect(githubPrvd instanceof GithubProvider).toBe(true);
    }));
    it('should be returned list searched', async(inject([GithubProvider], (githubPrvd) => {
        githubPrvd.search(term).subscribe(data => {
            expect(data).toBeTruthy();
            expect(Array.isArray(data.items)).toBeTruthy();
            expect(data.total_count).toBeGreaterThanOrEqual(1);
            expect(data.items.length).toBeGreaterThanOrEqual(1);
            expect(data.total_count == data.items.length);
        });
    })));
    it('should be returned info resource requested', async(inject([GithubProvider], (githubPrvd) => {
        githubPrvd.getUrl(url).subscribe(data => {
            expect(data).toBeTruthy();
        });
    })));

});