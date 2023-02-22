# Rule `angular/no-rxjs-internal-import`

Importing from 'rxjs/internal/\*' prevents tree shaking. Import from 'rxjs/\*' instead.

## Valid Usage

No test cases

## Invalid Usage

### Should fail when importing Observable class from rxjs/internal/Observable

```ts
import { Observable } from 'rxjs/internal/Observable';
                           ~~~~~~~~~~~~~~~~~~~~~~~~~~
```


### Should fail when importing operators from rxjs/internal/operators/*

```ts
import { switchMap } from 'rxjs/internal/operators/switchMap';
                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```


### Should fail when importing other utilies from their internal exports

```ts
import { ajax } from 'rxjs/internal/ajax/ajax';
                     ~~~~~~~~~~~~~~~~~~~~~~~~~
```


### Should fail when importing other types from their internal exports

```ts
import { AjaxDirection } from 'rxjs/internal/ajax/types';
                              ~~~~~~~~~~~~~~~~~~~~~~~~~~
```


