# Rule `angular-template/prefer-optimized-image-directive`

The NgOptimizedImage directive is preferred for performance best practices for loading images

## Valid Usage

### Should pass for any attribute that is NOT src

```ts
<img prop="value">
```

### Should pass for any Input bind that is NOT src

```ts
<img [prop]="value">
```

## Invalid Usage

### Should report for src attribute

```ts
<img src="value">
     ~~~
```

### Should report for src Input bind

```ts
<img [src]="value">
      ~~~
```
