import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]), MatSidenavModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
