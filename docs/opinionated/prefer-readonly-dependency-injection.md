# Rule `opinionated/prefer-readonly-dependency-injection`

References to dependency injections should not change

## Valid Usage

### Should pass for any class that doesn't use Angular's decorators

```ts
@MyCustomDecorator()
class MyClass {
  constructor(private http: HttpClient) {}
}
```


### Should pass for dependency injection that uses readonly keyword that provides accessibility keyword

```ts
@Directive()
class MyDirective {
  constructor(private readonly http: HttpClient) {}
}
```


### Should pass for dependency injection that uses readonly keyword that uses Inject decorator

```ts
@Component()
class MyService {
  constructor(@Inject('token') readonly data) {}
}
```


### Should pass for any property that uses readonly keyword

```ts
@Injectable()
class MyService {
  readonly http = inject(HttpClient);
}
```



## Invalid Usage

### Should fail for dependency injection that does NOT use readonly keyword

```ts
@Component()
class MyComponent {
  constructor(private http: HttpClient) {}
              ~~~~~~~~~~~~~~~~~~~~~~~~
}
```


### Should fail for any property that references dependency injection that does NOT use readonly keyword

```ts
@Pipe()
class MyPipe {
  private http = inject(HttpClient);
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```


