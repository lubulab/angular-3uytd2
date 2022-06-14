import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    console.log('v1.1');
    window.alert(navigator.userAgent.toLowerCase());
  }

}
