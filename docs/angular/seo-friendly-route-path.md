# Rule `angular/seo-friendly-route-path`

SEO Friendly URLs should common all lowercase alphanumerics separated by forward slash ('/') or hyphens ('-')

## Valid Usage

No test cases

## Invalid Usage

### Should fail when path includes uppercase characters

```ts
  const routes: Routes = [{ path: 'first/Second/Third' }];
                                  ~~~~~~~~~~~~~~~~~~~~

```


### Should fail when path is not slugified and type Route[]

```ts
  const routes: Route[] = [{ path: 'first/Second/Third' }];
                                   ~~~~~~~~~~~~~~~~~~~~

```


### Should fail when path is not slugified and used with RouterModule.forRoot

```ts
  RouterModule.forRoot([{ path: 'first/Second/Third' }]);
                                ~~~~~~~~~~~~~~~~~~~~

```


### Should fail when path is not slugified and used with RouterModule.forChild

```ts
  RouterModule.forChild([{ path: 'first/Second/Third' }]);
                                 ~~~~~~~~~~~~~~~~~~~~

```


### Should fail when path includes (unexpected) special characters

```ts
  const routes: Routes = [{ path: 'firs$t/second#third' }];
                                  ~~~~~~~~~~~~~~~~~~~~~

```


### Should fail when path includes spaces

```ts
  const routes: Routes = [{ path: 'first second third' }];
                                  ~~~~~~~~~~~~~~~~~~~~

```


### Should fail when path includes unexpected spaceChar

```ts
  const routes: Routes = [{ path: 'first_second_third' }];
                                  ~~~~~~~~~~~~~~~~~~~~

```


### Should fail when at least one route has a bad path

```ts
  const routes: Routes = [
    { path: 'a-b-c' },
    { path: 'x^y^z' },
            ~~~~~~~
    { path: '1-2-3' },
  ];

```


### Should fail when path does NOT match slugified path

```ts
  const routes: Routes = [{ path: 'moo/"Cow"/:yoo/space check/under_score/hyphen-check' }];
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

```


