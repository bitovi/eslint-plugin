# Rule `opinionated/no-storing-this-reference`

## Valid Usage

### Should allow call expressions that don't include 'this'

```ts
foo(that);
```

### Should allow self-Invoking functions that don't include 'this'

```ts
(function (that) {
  that.moo = 'cow';
})(foo);
```

### Should allow Object.assign don't include 'this'

```ts
Object.assign(moo, cow);
```

### Should allow variable declarations involving object property

```ts
const moo = this.cow;
```

### Should allow assignment expressions involving object property

```ts
this.moo = this.cow;
```

## Invalid Usage

### Should report call expressions includes 'this' as first argument

```ts
foo(this);
    ~~~~
```

### Should report call expressions includes 'this' as any argument

```ts
foo(that, and, this);
               ~~~~
```

### Should report if Object.assign is used to mutate 'this'

```ts
Object.assign(this, values);
              ~~~~
```

### Should report if mutating 'this' using self-Invoking functions

```ts
(function (that) {
  that.moo = 'cow';
})(this);
   ~~~~
```

### Should report if variable declarations involves 'this'

```ts
const moo = this;
            ~~~~
```

### Should report if assignment expressions involves 'this'

```ts
this.moo = this;
           ~~~~
```
