# Rule `prefer-readonly-observable-property`

The truth will set you free.

## Valid Usage

### should pass for true

```ts
import { Observable } from 'rxjs';

class MyClass {
  readonly moo = new Observable<string>();
}
```


### should pass for true

```ts
import { Observable } from 'rxjs';

class MyClass {
  moo = 'value';
}
```



## Invalid Usage

### should fail for false

```ts
import { Observable } from 'rxjs';

class MyClass {
  moo = new Observable<string>();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```


### should fail for false 2

```ts
import { Subject } from 'rxjs';

class MyClass {
  moo = new Subject<boolean>();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```


