import { Routes } from '@angular/router';
import { LineUpBuilderComponent } from './features/line-up-builder/pages/line-up-builder/line-up-builder.component';
import { HomepageComponent } from './features/homepage/pages/homepage/homepage.component';
import { StyleguideComponent } from './styleguide/styleguide.component';

export const routes: Routes = [

    { path: 'styleguide', component: StyleguideComponent },
    { path: 'builder', component: LineUpBuilderComponent },
    { path: 'home', component: HomepageComponent },
    { path: '', redirectTo: '/builder', pathMatch: 'full' }
];
