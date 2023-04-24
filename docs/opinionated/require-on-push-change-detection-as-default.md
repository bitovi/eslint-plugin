# Rule `opinionated/require-on-push-change-detection-as-default`

Always default to OnPush plz

## Valid Usage

### Should allow json with no projects

```ts
{ "moo": "cow" }
```


### Should allow for json with changeDetection default is OnPush

```ts
{
        "projects": {
          "moo": {
            "schematics": {
              "@schematics/angular:component": {
                "changeDetection": "OnPush"
              }
            }
          }
        }
      }
```



## Invalid Usage

### Should report if schematics is missing for project

```ts
{
        "projects": {
          "moo": {
          ~~~~~
            "cow": "milk"
          }
        }
      }
```


### Should report if component schematic settings are missing for project

```ts
{
        "projects": {
          "moo": {
            "cow": "milk",
            "schematics": {
            ~~~~~~~~~~~~
              "carrot": "cake"
            }
          }
        }
      }
```


### Should report if default change detection is missing from component schematic settings

```ts
{
        "projects": {
          "moo": {
            "cow": "milk",
            "schematics": {
              "@schematics/angular:component": {
              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              }
            }
          }
        }
      }
```


### Should report if default change detection is not OnPush

```ts
{
        "projects": {
          "moo": {
            "cow": "milk",
            "schematics": {
              "@schematics/angular:component": {
                "changeDetection": "meep"
                                   ~~~~~~
              }
            }
          }
        }
      }
```


