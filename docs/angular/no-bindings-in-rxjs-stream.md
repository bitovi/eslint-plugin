# Rule `angular/no-bindings-in-rxjs-stream`



## Valid Usage

No test cases

## Invalid Usage

### Should fail when importing Observable class from rxjs/internal/Observable

```ts
const moo = {};
moo.subscribe((value) => { this.value = value });
                           ~~~~~~~~~~~~~~~~~~
```


