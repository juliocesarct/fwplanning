import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app-routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes), // <-- Configure o roteador com suas rotas
    provideFirebaseApp(() => initializeApp( environment.firebaseConfig)),
    // 2. Fornece o Firestore, usando a instância do aplicativo Firebase
    provideFirestore(() => getFirestore()),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
