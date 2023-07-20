# Rule `angular-template/required-ng-src-attributes`

The NgOptimizedImage directive, ngSrc requires either height and width attributes or the fill attribute

## Valid Usage

### Should pass using an attribute that is not ngSrc directive

```ts
<img src="cat.jpg">
```

### Should pass using an Input bind that is not ngSrc directive

```ts
<img [src]="catImage">
```

### Should pass using ngSrc attribute if width and height is provided

```ts
<img ngSrc="cat.jpg" width="400" height="200">
```

### Should pass using ngSrc Input bind if width and height is provided

```ts
<img [ngSrc]="catImage" width="400" height="200">
```

### Should pass using ngSrc attribute if fill is provided

```ts
<img ngSrc="cat.jpg" fill>
```

### Should pass using ngSrc Input bind if fill is provided

```ts
<img [ngSrc]="cat.jpg" fill>
```

## Invalid Usage

### Should report if using ngSrc attribute with missing width/height or fill attribute

```ts
<img ngSrc="cat.jpg">
~~~~~~~~~~~~~~~~~~~~~
```

### Should report if using ngSrc Input bind with missing width/height or fill attribute

```ts
<img [ngSrc]="cat.jpg">
~~~~~~~~~~~~~~~~~~~~~~~
```

### Should report if using ngSrc attribute with missing height or fill attribute

```ts
<img ngSrc="cat.jpg" width="400">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

### Should report if using ngSrc Input bind with missing height or fill attribute

```ts
<img [ngSrc]="cat.jpg" width="400">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

### Should report if using ngSrc attribute with missing width or fill attribute

```ts
<img ngSrc="cat.jpg" height="400">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

### Should report if using ngSrc Input bind with missing width or fill attribute

```ts
<img [ngSrc]="cat.jpg" height="400">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```
