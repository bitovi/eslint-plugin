# Rule `angular/on-changes-use-input-bind`

OnChanges lifecycle hook is only called on data-bound properties.

This requires using the Input bind directive on the member of a Component or Directive

## Valid Usage

No test cases

## Invalid Usage

### Should fail when Input bind is missing

```ts
      @Component({})
      class MyComponent {
        prop = 50;

        ngOnChanges(changes: SimpleChanges): void {
          changes['prop'];
                  ~~~~~~
        }
      }
      
```


### Should fail when member is missing

```ts
@Component({})
class MyComponent {
  ngOnChanges(changes: SimpleChanges): void {
    changes['prop'];
            ~~~~~~
  }
}

```


### Should fail even if mistake is within if statement

```ts
@Directive({})
class MyDirective {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prop']) {
                ~~~~~~
      console.log('changed');
    }
  }
}

```


