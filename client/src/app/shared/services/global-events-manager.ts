import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map'

@Injectable()
export class GlobalEventsManager {

    private _showNavBarMessage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public showNavBarEmitter: Observable<boolean> = this._showNavBarMessage.asObservable();

    private _globalMessage: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public globalMessageEmitter: Observable<string> = this._globalMessage.asObservable();

    private _userLoginMessage: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
    public userLoginMessageEmitter: Observable<string> = this._userLoginMessage.asObservable();

    constructor() { }

    showNavBar(ifShow: boolean) {
        this._showNavBarMessage.next(ifShow);
    }

    showMessage(msg: string) {
        this._globalMessage.next(msg);
    }

    isUserLoggedIn(userType: string) {
        this._userLoginMessage.next(userType);
    }
}