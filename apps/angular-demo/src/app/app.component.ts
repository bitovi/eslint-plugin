import {
  Component,
  // EventEmitter,
  // HostListener,
  // Input,
  // OnChanges,
  OnInit,
  // Output,
  // SimpleChanges,
  // inject,
} from '@angular/core';
// import { Observable } from 'rxjs';
// import { getObs } from './my-observable';
// import { HttpClient } from '@angular/common/http';

// enum Moo {
//   COW = 'cow',
//   MILK = 'milk',
// }

// enum Config {
//   COW = () => {/* callback for COW */},
//   MILK = () => {/* callback for MILK */},
// }

// const config = {
//   [Moo.COW]: () => {/* callback for COW */},
//   [Moo.MILK]: () => {/* callback for COW */},
// } as const;

// function getKey(): 'COW' {
//   return 'COW';
// }

// const test = Moo.COW;// okay
// const test2 = Moo['COW'];// ugly, but okay
// const key = 'COW';
// const test3 = Moo[key];// logically okay, but nope
// const test4 = Moo[getKey()];// for sure not okay

// function getValue(): Moo {
//   return Moo.COW;
// }

// const test5 = getValue();

// test
// test2
// test3
// test4

@Component({
  selector: 'bitovi-root',
  templateUrl: './app.component.html',
  // template: `
  //   <div (click)="test = 5"></div>
  //   <img src="cat.jpg">
  // `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // moo = "in the member";

  // constructor() {
  //   this.moo = "in the constructor";
  // }

  ngOnInit(): void {
    console.log('empty');
    //   this.moo = "in the ngOnInit";
  }

  // cow(): void {
  //   const that = this;

  //   that.moo = "some value";
  //   // this.moo = "some value";
  // }

  //   @Input() label!: string;
  //   @Input() value!: string;
  //   warning?: string;

  //   // ngOnInit() {
  //   //   // :D
  //   // }

  //   ngOnChanges(changes: SimpleChanges): void {
  //     changes;
  //     if (changes['label'] || changes['value']) {
  //       if (this.label.length + this.value.length > 50) {
  //         this.warning = 'content must be less than 50 characters';
  //       } else {
  //         this.warning = '';
  //       }
  //     }
  //   }
  // }
}

//   // moo!: Observable<string>;// Look into this D:

//   // test = 0;
//   // constructor() {
//   //   const moo = {
//   //     "one": "two",
//   //     "second": {
//   //         "apple": "cow"
//   //     }
//   //   };

//   //   this.value = 'moo';
//   //   // new Observable<string>().subscribe((value: string) => {
//   //   //   this.value = value;
//   //   // });
//   // }

//   // ngOnInit(): void {
//   //   this.value = 'moo';
//   // }

//   // ngOnInit(): void {
//   //   // TODO: setup some properties and stuff
//   // }

//   // ngOnInit(): void {
//   //   // TODO: setup some properties and stuff
//   // }

//   foo() {
//     // this.value = 'value';
//     ((that) => that.value = 'cow')(this);
//     Object.assign(this, { value: 'cow' });

//     new Observable<string>().subscribe((value: string) => {
//       // this.value = value;
//     });
//   }
//   // // @Input() prop!: unknown;
//   // // changes: any = {};
//   // // title = 'angular-demo';

//   // // @Output() x = new EventEmitter();
//   // // @Output() y!: EventEmitter<{ name: string }>;
//   // // @Output() s = new EventEmitter();

//   // // @HostListener('click')
//   // // moocow() {
//   // //   console.log('woo');
//   // // }

//   // // @HostListener('keypress')
//   // // moo() {
//   // //   console.log('woo');
//   // // }

//   // // @HostListener('mouseover') cow() {
//   // //   console.log('woo');
//   // // }

//   // // @HostListener('focus') cow2() {
//   // //   console.log('woo');
//   // // }

//   // // ngOnChanges(changes: SimpleChanges): void {
//   // //   const prop = changes['prop'];

//   // //   if (changes['prop']) {
//   // //     console.log('hello world');
//   // //   }

//   // //   while (changes['prop']) {
//   // //     console.log('while loop');
//   // //     break;
//   // //   }

//   // //   for (let i = 0; i < (changes['prop'] ? 1 : 1); i++) {
//   // //     console.log('for loop');
//   // //   }

//   // //   this.changes['moo'];

//   // //   const test = {
//   // //     test: changes['prop'],
//   // //   };

//   // //   function namedFn(changes: { prop: string }): any {
//   // //     const test = changes['prop'];
//   // //   }

//   // //   const arrayFn = (...changes: any): any => {
//   // //     const test = changes['moo'];
//   // //   };
//   // // }

//   constructor(private http: HttpClient) {
//     const moo$ = {} as Observable<string>;

//     moo$.subscribe();

//     // moo$.subscribe((value: string) => { console.log(value); this.warning = "test" });
//   }

//   @Input() label!: string;
//   @Input() value!: string;
//   warning?: string;

//   // ngOnInit() {
//   //   // :D
//   // }

//   ngOnChanges(changes: SimpleChanges): void {
//     changes;
//     if (changes['label'] || changes['value']) {
//       if (this.label.length + this.value.length > 50) {
//         this.warning = 'content must be less than 50 characters';
//       } else {
//         this.warning = '';
//       }
//     }
//   }
// }
