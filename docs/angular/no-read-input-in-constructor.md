# Rule `angular/no-read-input-in-constructor`

@Input member values are not available in the constructor.

## Valid Usage

### should allow non-input values to be referenced in constructor of component

```ts
    @Component()
    class MyComponent {
      @Input() myInput!: string;
      nonInput!; string;

      constructor() {
        if(this.nonInput) {
          console.log('hi!');
        }
        const value = this.nonInput;
        this.nonInput = 'someValue';
      }
    }
```


### should allow non-input values to be referenced in constructor of directive

```ts
    @Directive()
    class MyDirective {
      @Input() myInput!: string;
      nonInput!; string;

      constructor() {
        if(this.nonInput) {
          console.log('hi!');
        }
        const value = this.nonInput;
        this.nonInput = 'someValue';
      }
    }
```


### should allow assigning to @Input() decorated members in constructor

```ts
    @Component()
    class MyComponent {
      @Input() myInput!: string;
      nonInput!; string;

      constructor() {
       this.myInput = this.nonInput;
      }
    }
```



## Invalid Usage

### should fail when accessing @Input decorated member within condition in constructor

```ts
      @Component()
      class MyComponent {
        @Input() inputA!: boolean;
        myProp = 'x';

        constructor() {
          if(this.inputA) {
             ~~~~~~~~~~~
             this.myProp = 'other value';
          }
        }
      }
```


### should fail when reading @Input decorated member in constructor

```ts
      @Component()
      class MyComponent {
        @Input() inputA!: boolean;
        myProp = 'x';

        constructor() {
          const temp = this.inputA;
                       ~~~~~~~~~~~
        }
      }
```


