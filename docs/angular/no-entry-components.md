# Rule `angular/no-entry-components`

entryComponents property for NgModule metadata is deprecated in Angular v9. If project consumes Ivy Engine, entryComponents doesn't perform any functionality and are safe to remove.

## Valid Usage

No test cases

## Invalid Usage

### Should fail when NgModule metadata includes entryComponents property

```ts
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
  ~~~~~~~~~~~~~~~
})
export class AppModule {}
```


### Should remove entryComponents property, trailing comma, and unnecessary whitespace

```ts
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
  ~~~~~~~~~~~~~~~
})
export class MyModule {}
```


### Should remove entryComponents property even if its the only property

```ts
@NgModule({
  entryComponents: [DialogComponent]
  ~~~~~~~~~~~~~~~
})
export class EmptyModule {}
```


### Should remove entryComponents property even if its the only property and its trailing comma

```ts
@NgModule({
  entryComponents: [DialogComponent],
  ~~~~~~~~~~~~~~~
})
export class EmptyModule {}
```


### Should remove inline entryComponents property

```ts
@NgModule({ entryComponents: [DialogComponent] })
            ~~~~~~~~~~~~~~~
export class EmptyModule {}
```


