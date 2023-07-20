# Rule `angular/lifecycle-hooks-require-class-this-context`

Lifecycle hooks must be methods and not arrow functions properties since lifecycle hooks require access to the "this" context of the class instance.

## Valid Usage

### Should pass for lifecycle hooks that are methods for components

```ts
@Component()
class MyComponent {
  ngOnInit(): void {
    /* ... */
  }
}
```

### Should pass for lifecycle hooks that are methods for directives

```ts
@Directive()
class MyDirective {
  ngAfterViewInit(): void {
    /* ... */
  }
}
```

### Should pass for lifecycle hooks that are methods for services

```ts
@Injectable()
class MyService {
  ngOnDestroy(): void {
    /* ... */
  }
}
```

### Should pass arrow function properties of classes with custom directives

```ts
@MyDecorator()
class MyComponent {
  ngOnInit = (): void => {
    /* ... */
  };
}
```

## Invalid Usage

### Should report for lifecycle hooks that are arrow function properties of a component

```ts
@Component()
class MyComponent {
  ngOnChanges = (changes: SimpleChanges): void => {/* ... */}
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

### Should report for lifecycle hooks that are arrow function properties of a directive

```ts
@Directive()
class MyDirective {
  ngDoCheck = (): void => {/* ... */}
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

### Should report for lifecycle hooks that are arrow function properties of a service

```ts
@Injectable()
class MyService {
  ngOnDestroy = (): void => {/* ... */}
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```
