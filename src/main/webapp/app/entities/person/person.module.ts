import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PersonComponent } from './list/person.component';
import { PersonDetailComponent } from './detail/person-detail.component';
import { PersonUpdateComponent } from './update/person-update.component';
import { PersonDeleteDialogComponent } from './delete/person-delete-dialog.component';
import { PersonRoutingModule } from './route/person-routing.module';
import { PersonSaveComponent } from './person-save/person-save.component';

@NgModule({
  imports: [SharedModule, PersonRoutingModule],
  declarations: [PersonComponent, PersonDetailComponent, PersonUpdateComponent, PersonDeleteDialogComponent, PersonSaveComponent],
  entryComponents: [PersonDeleteDialogComponent],
})
export class PersonModule {}
