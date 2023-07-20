# Rule `opinionated/prefer-readonly-observable-property`

Properties that reference an Observable should never be reassigned

## Valid Usage

### Should pass for properties with readonly property

```ts
import { Observable } from 'rxjs';

class MyClass {
  readonly moo = new Observable<string>();
}
```

### Should pass for properties that do NOT reference an Observable

```ts
import { Observable } from 'rxjs';

class MyClass {
  moo = 'value';
}
```

### Should pass for readonly properties with name that ends with $

```ts
import { Observable } from 'rxjs';

class MyClass {
  moo = 'value';
}
```

## Invalid Usage

### Should report for non-readonly properties that reference an Observable

```ts
import { Observable } from 'rxjs';

class MyClass {
  moo = new Observable<string>();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

### Should report for non-readonly properties that reference an rxjs classes that extend Observable

```ts
import { Subject } from 'rxjs';

class MyClass {
  moo = new Subject<boolean>();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

### Should report for non-readonly properties with name that ends with $

```ts
import { Subject } from 'rxjs';

class MyClass {
  moo$ = new MyObs();
  ~~~~~~~~~~~~~~~~~~~
}
```
