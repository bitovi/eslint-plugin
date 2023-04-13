# Rule `angular/no-subscribe-callback`



## Valid Usage

No test cases

## Invalid Usage

### Should fail when importing Observable class from rxjs/internal/Observable

```ts
const moo = {};
moo.subscribe(() => {/*...*/});
              ~~~~~~~~~~~~~~~
```


