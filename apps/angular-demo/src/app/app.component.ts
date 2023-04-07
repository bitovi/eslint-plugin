import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
// import { Observable } from 'rxjs';
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: 'bitovi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnChanges {
  // @Input() prop!: unknown;
  // changes: any = {};
  // title = 'angular-demo';

  // @Output() x = new EventEmitter();
  // @Output() y!: EventEmitter<{ name: string }>;
  // @Output() s = new EventEmitter();

  // @HostListener('click')
  // moocow() {
  //   console.log('woo');
  // }

  // @HostListener('keypress')
  // moo() {
  //   console.log('woo');
  // }

  // @HostListener('mouseover') cow() {
  //   console.log('woo');
  // }

  // @HostListener('focus') cow2() {
  //   console.log('woo');
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   const prop = changes['prop'];

  //   if (changes['prop']) {
  //     console.log('hello world');
  //   }

  //   while (changes['prop']) {
  //     console.log('while loop');
  //     break;
  //   }

  //   for (let i = 0; i < (changes['prop'] ? 1 : 1); i++) {
  //     console.log('for loop');
  //   }

  //   this.changes['moo'];

  //   const test = {
  //     test: changes['prop'],
  //   };

  //   function namedFn(changes: { prop: string }): any {
  //     const test = changes['prop'];
  //   }

  //   const arrayFn = (...changes: any): any => {
  //     const test = changes['moo'];
  //   };
  // }


  constructor() {
    const moo$ = {} as Observable;

    moo$.subscribe();

    moo$.subscribe((value) => { console.log(value) });
  }
  
  @Input() label!: string;
  value!: string;
  warning?: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['label'] || changes['value']) {
      if (this.label.length + this.value.length > 50) {
        this.warning = "content must be less than 50 characters";
      } else {
        this.warning = "";
      }
    }
  }
}
