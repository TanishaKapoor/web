import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div>
          <div class="container-fluid">
            <a class='navbar-brand'>{{pageTitle}}</a>
            <div>
               <a [routerLink]="['/courses']">Courses</a>
               <a [routerLink]="['/students']">Students</a>
                <a [routerLink]="['/subjects']">Subjects</a>
               <a [routerLink]="['/teachers']">Teachers</a>
                <a [routerLink]="['/batches']">Batches</a>
          </div>
          </div><p></p>
      <div class="container">
              <router-outlet></router-outlet>
     </div>
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
