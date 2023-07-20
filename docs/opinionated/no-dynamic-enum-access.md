# Rule `opinionated/no-dynamic-enum-access`

Enums should not be accessed dynamically and only only allow static keys

## Valid Usage

### Should be able to access enums

```ts
enum Moo {
  cow = 'cow',
}

const moo = Moo.cow;
```

### Should be able using literals

```ts
enum Moo {
  cow = 'cow',
}

const moo = Moo['cow'];
```

### Should allow dynamic keys for objects that are not enums

```ts
const Moo = {
  cow: 'cow',
};

const val = 'cow';
const moo = Moo[val];
const moo = Moo[getVal()];
```

## Invalid Usage

No test cases
