import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
/*bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  providers: [
    provideRouter(routes)]
//aqui se le debe agregar esto*/

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideNoopAnimations(),
    provideHttpClient(), // Agrega esta línea
    // Otros providers necesarios
  ],
}).catch((err) => console.error(err));