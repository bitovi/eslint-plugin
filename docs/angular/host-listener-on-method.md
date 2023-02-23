# Rule `angular/host-listener-on-method`

@HostListener decorator must be used on a method or function member.

## Valid Usage

### should be allowed on method definitions

```ts
@Component()
class MyComponent {
  @HostListener('click')
  handleClick(): void { }
}
```


### should be allowed on members assigned to arrow functions

```ts
@Component()
class MyComponent {
  @HostListener('click') clickHandler = () => {};
}
```


### should be allowed on members assigned to function expressions

```ts
@Component()
class MyComponent {
  @HostListener('click') clickHandler = function() {};
}
```



## Invalid Usage

### should error when decorator is used on member with no value

```ts
@Component()
class MyComponent {
  @HostListener('click') clickHandler!: () => void;
}
```


### Should warn when decorator is used on non-function member

```ts
@Component()
class MyComponent {
  @HostListener('click')
  ~~~~~~~~~~~~~~~~~~~~~~
  myProperty = true;
}
```


