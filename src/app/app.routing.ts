import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { path: 'signup', component: SignupComponent },

    // otherwise redirect to signup
    { path: '**', redirectTo: 'signup' }
];

export const appRoutingModule = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });
