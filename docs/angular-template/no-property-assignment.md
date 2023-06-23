# Rule `angular-template/no-property-assignment`

Property assignment in templates is discouraged for enforcing immutability and can be hard to detect

## Valid Usage

### Should pass if no property assignment

```ts
<div (click)="moo()"></div>
```



## Invalid Usage

### Should report if property assignment

```ts
<div (click)="moo = cow"></div>
              ~~~~~~~~~
```


### Should report if nested property assignment

```ts
<div (click)="moo.milk = cow"></div>
              ~~~~~~~~~~~~~~
```


