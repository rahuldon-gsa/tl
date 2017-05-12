import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalEventsManager } from '../../services/global-events-manager';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    navExpandedCustomerDashBoard: boolean = false;
    navExpanded: boolean = false;
    mainNavExpandButton: boolean = false;

    constructor(private globalEventsManager: GlobalEventsManager) { }

    ngOnInit() {
        this.mainNavExpandButton = false;
        this.globalEventsManager.showMessage("HIDEME");
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        //this.translate.use(language);
    }
}
