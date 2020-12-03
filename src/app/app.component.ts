import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    currentUser: User;

    constructor(private router: Router) {
    }
}
