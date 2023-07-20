# Rule `opinionated/no-stateful-methods`

Methods should not mutate values

## Valid Usage

### Should allow setting members

```ts
class Moo {
  moo = 'cow';
}
```

### Should allow setting members in constructor

```ts
class Moo {
  constructor() {
    this.moo = 'cow';
  }
}
```

### Should allow setting variables

```ts
class Moo {
  foo() {
    const moo = 'cow';
  }
}
```

### Should allow setting variables to properties of class instance

```ts
class Moo {
  cow = 'cow';
  foo() {
    const moo = this.cow;
  }
}
```

### Should allow setting properties of new this context

```ts
class Moo {
  cow = 'cow';
  foo() {
    function bar() {
      this.moo = 'cow';
    }
  }
}
```

### Should allow whitelisted method names

```ts
class Moo {
  ngOnInit() {
    this.moo = 'cow';
  }
}

class Cow {
  foo() {
    this.moo = 'cow';
  }
}
```

## Invalid Usage

### Should report if setting property within class method

```ts
class Moo {
  foo() {
    this.moo = 'cow';
    ~~~~~~~~~~~~~~~~
  }
}
```

### Should report if setting property within arrow function

```ts
class Moo {
  foo() {
    const bar = () => {
      this.moo = 'cow';
      ~~~~~~~~~~~~~~~~
    }
  }
}
```

### Should report if setting nested property

```ts
class Moo {
  state = {};
  foo() {
    this.state.moo = 'cow';
    ~~~~~~~~~~~~~~~~~~~~~~
  }
}
```

### Should report if setting property in subscribe callback

```ts
class Moo {
  value!: string;
  constructor() {
    new Observable<string>().subscribe((value: string) => {
      this.value = value;
      ~~~~~~~~~~~~~~~~~~
    });
  }
}
```
