import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimeService } from './greeter/time.service'
import { ElapsedPipe } from './pipes/elapsed.pipe';
import * as moment from 'moment';
import { GreeterComponent } from './greeter/greeter.component';

@NgModule({
  declarations: [
    AppComponent,
    ElapsedPipe,
    GreeterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide : 'MOMENT', useValue: moment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
