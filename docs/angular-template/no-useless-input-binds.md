# Rule `angular-template/no-useless-input-binds`

Binding string literals to inputs can be simplified to just using an attribute

## Valid Usage

### Should pass for attributes

```ts
<app-input label="value"></app-input>
```

### Should pass for any primative value that is NOT a string

```ts
<app-input [label]="1"></app-input>
```

### Should pass for binded properties

```ts
<app-input [label]="value"></app-input>
```

## Invalid Usage

### Should report for binded string literals

```ts
<app-input [label]="'username'"></app-input>
           ~~~~~~~~~~~~~~~~~~~~
```
