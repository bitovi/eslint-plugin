# Rule `angular/no-input-readonly`

Marking @Input properties as read-only prevents consumers from binding to inputs

## Valid Usage

### should pass for non-readonly input

```ts
@Component()
class MyComponent {
  @Input() userName!: string;
  @Input() color = 'red';
}
```


### should pass when readonly is used in non-component or directive class

```ts
@Fancy()
class MyComponent {
  @Input() readonly neverGonnaChangeMe = 'hah';
}
```



## Invalid Usage

### should fail for readonly input

```ts
@Component()
class MyComponent {
  @Input() readonly userName!: string;
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```


