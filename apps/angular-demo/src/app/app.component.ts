import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'bitovi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-demo';

  @Output() x = new EventEmitter();
  @Output() y!: EventEmitter<{ name: string }>;
  @Output() s = new EventEmitter();
  @Output() t = new EventEmitter();

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
