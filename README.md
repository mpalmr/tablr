# Tablr




## Usage

`new Tablr(Element, [options])`

```javascript
var basic = new Tablr('#basic', {
  columns: ['Name', 'Email', 'Birthday'],
  rows: [
    { 'Patricia Fantastic', 'pfantastic@example.com', '1993-03-11' },
    { 'Mike Powers', 'mpowers@example.com', '1989-11-26' },
    { 'Dana Simco', 'dsimco@example.com', '1963-06-02' },
  ],
});

new Tablr(document.getElementById('advanced'), {
  columns: [
    {},
  ],
});
```


### Options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `Array<Object|string>` | _Required_ | |
| `rows` | `Array<Object>` | `[]` | |
| `pageinate` | `Object|boolean` | `false` | |
| `sync` | `Object|boolean` | `false` | |

#### `columns`
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | | |
| `sort` | `string|(a: any, b: any) => number` | | |

#### `rows[]`
| Name | Type | Default | Description |
| --- | --- | --- | --- |

#### `pageinate`
| Name | Type | Default | Description |
| --- | --- | --- | --- |

#### `sync`
| Name | Type | Default | Description |
| --- | --- | --- | --- |


### Methods

#### `add(row: Object | Array<Object>): Tablr`

#### `sort(a: Object, b: Object): number`
