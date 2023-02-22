# Rule `angular/event-emitter-has-output`

Warns if a property of type EventEmitter doesn't have an @Output decorator to avoid mistakes

## Valid Usage

No test cases

## Invalid Usage

### Should warn when property not decorated by @Output is assigned new EventEmitter value

```ts
@Component()
class MyComponent {
  myProperty = new EventEmitter();
               ~~~~~~~~~~~~~~~~~~
}
```


### Should warn when property not decorated by @Output has EventEmitter type annotation

```ts
@Component()
class MyComponent {
  myProperty: EventEmitter<MyType>;
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```


