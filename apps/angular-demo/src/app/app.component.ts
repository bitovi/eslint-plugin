import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'bitovi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-demo';

  @HostListener('click')
  moocow() {
    console.log('woo');
  }

  @HostListener('keypress')
  moo() {
    console.log('woo');
  }

  @HostListener('mouseover') cow() {
    console.log('woo');
  }

  @HostListener('focus') cow2() {
    console.log('woo');
  }
}
