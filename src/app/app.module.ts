import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { CreateSessionComponent } from './create-session/create-session.component';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    CreateSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideFirebaseApp(() => initializeApp({ projectId: "fwplanning-2841b", appId: "1:934243537679:web:73b6f9029ada9e9a53247a", storageBucket: "fwplanning-2841b.firebasestorage.app", apiKey: "AIzaSyBhtbtHAs6G_oBGnkouj1Y1gbOtHhzlXdQ", authDomain: "fwplanning-2841b.firebaseapp.com", messagingSenderId: "934243537679", measurementId: "G-GBWGVW1H04" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
