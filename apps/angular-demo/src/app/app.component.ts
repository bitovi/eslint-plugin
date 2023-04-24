/* eslint-disable glue/bitovi/opinionated/no-stateful-methods */
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';

// enum Moo {
//   cow = 'cow',
//   milk = 'milk',
// }

// function getVal(): 'cow' {
//   return 'cow';
// }

// const test = Moo.cow;// okay
// const test2 = Moo['cow'];// ugly, but okay
// const val = 'cow';
// const test3 = Moo[val];// logically okay, but nope
// const test4 = Moo[getVal()];// for sure not okay

// test
// test2
// test3
// test4

@Component({
  selector: 'bitovi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnChanges {
  // value!: string;
  // constructor() {
  //   const moo = {
  //     "one": "two",
  //     "second": {
  //         "apple": "cow"
  //     }
  //   };

  //   this.value = 'moo';
  //   // new Observable<string>().subscribe((value: string) => {
  //   //   this.value = value;
  //   // });
  // }

  // ngOnInit(): void {
  //   this.value = 'moo';
  // }

  // foo() {
  //   // this.value = value;
  //   // ((that) => that.value = 'cow')(this);
  //   // Object.assign(this, { value: 'cow' });

  //   // new Observable<string>().subscribe((value: string) => {
  //   //   this.value = value;
  //   // });
  // }
  // // @Input() prop!: unknown;
  // // changes: any = {};
  // // title = 'angular-demo';

  // // @Output() x = new EventEmitter();
  // // @Output() y!: EventEmitter<{ name: string }>;
  // // @Output() s = new EventEmitter();

  // // @HostListener('click')
  // // moocow() {
  // //   console.log('woo');
  // // }

  // // @HostListener('keypress')
  // // moo() {
  // //   console.log('woo');
  // // }

  // // @HostListener('mouseover') cow() {
  // //   console.log('woo');
  // // }

  // // @HostListener('focus') cow2() {
  // //   console.log('woo');
  // // }

  // // ngOnChanges(changes: SimpleChanges): void {
  // //   const prop = changes['prop'];

  // //   if (changes['prop']) {
  // //     console.log('hello world');
  // //   }

  // //   while (changes['prop']) {
  // //     console.log('while loop');
  // //     break;
  // //   }

  // //   for (let i = 0; i < (changes['prop'] ? 1 : 1); i++) {
  // //     console.log('for loop');
  // //   }

  // //   this.changes['moo'];

  // //   const test = {
  // //     test: changes['prop'],
  // //   };

  // //   function namedFn(changes: { prop: string }): any {
  // //     const test = changes['prop'];
  // //   }

  // //   const arrayFn = (...changes: any): any => {
  // //     const test = changes['moo'];
  // //   };
  // // }

  // // constructor() {
  // //   const moo$ = {} as Observable;

  // //   moo$.subscribe();

  // //   moo$.subscribe((value) => { console.log(value) });
  // // }

  @Input() label!: string;
  @Input() value!: string;
  warning?: string;

  ngOnChanges(changes: SimpleChanges): void {
    changes;
    if (changes['label'] || changes['value']) {
      if (this.label.length + this.value.length > 50) {
        this.warning = 'content must be less than 50 characters';
      } else {
        this.warning = '';
      }
    }
  }
}
