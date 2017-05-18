# Tablr

Tablr is a lightweight, dependancy free, easy to use data table library.

- [Goals](#goals)
  - [Maybes](#maybes)
  - [Needs Consideration](#needs-consideration)
- [Example](#example)
- [Options](#options)
  - [Columns](#columns)
  - [Page](#page)
  - [Filter](#filter)
- [Methods](#methods)
- [Sorting](#sorting)




## Goals

- Displays data passed into it with no configuration
- Column header labels
- Can transform values into display values shown in cell
- Can sort columns
- Pagination
- Provide TypeScript definition file
- Default theme


### Maybes

- AJAX polling
- Validation
- Handling of unsafe strings / HTML?
- Filtering


## Needs Consideration

- `columns` can be an object
- Column `id` member which allows for the reference of that column as an ID. Would be required for **ALL** columns
- Pagination UI
- Templating of `page.textBefore` and `page.textAfter`
- By default require call of `render` method unless option `deferRender: true`




## Example

`new Tablr(Element, [options])`

```javascript
var dataArr = [
  ['Patricia Fantastic', '1993-03-11', '124839285'],
  ['Mike Powers', '1989-11-26', '84821'],
  ['Dana Simco', '1963-06-02', '8597335'],
];

var dataObj = {
  {
    name: 'Patricia Fantastic',
    birthday: '1993-03-11',
    diskQuota: '124839285',
  },
  {
    name: 'Mike Powers',
    birthday: '1989-11-26',
    diskQuota: '84821',
  },
  {
    name: 'Dana Simco',
    birthday: '1963-06-02',
    diskQuota: '8597335',
  },
};

var basic = new Tablr('#my-thing', {
  data: dataArr,
  columns: ['Name', 'Birthday', 'Disk Quota'],
});

var headlessBasic = new Tablr(element, dataArr);

var advanced = new Tablr(element, {
  data: dataObj,
  columns: [
    {
      id: 'name',
      label: 'Name',  // Will assume string type
    },
    {
      id: 'birthday',
      label: 'Birthday',
      sort: 'date',
    },
    {
      id: 'diskQuota',
      label: 'Disk Quota',
      sort: function sort(a, b) {
        return a - b;
      },
      displayValue: function displayValue(value) {
        return toHumanReadableUnits(value)
      },
    },
  ],
  page: true,
  filter: (query, row) => row.name.includes(query),
});

var advancedPageination = new Tablr(element, {
  data: dataObj,
  columns: ['Name', 'Birthday', 'Disk Quota'],
  page: {
    size: [10, 25 , 50, 100, 'All'],
    sizeDefault: 25,  // Otherwise 10
    position: 'bottom',
    textBefore: 'Show',
    textAfter: 'entries',
  },
});

var advancedFiltering = new Tablr(element, {
  data: dataObj,
  columns: ['Name', 'Birthday', 'Disk Quota'],
  filter: {
    rule: (query, row) => row.name.includes(query),
    debounce: 300,
    minQueryLength: 1,
    placeholder: 'Filter...',
    singlePage: false,
  },
})
```


## Options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `any[][] &#124; Object[]` | `[]` | Data to be rendered as rows in a table. Must be a nested array where each nested array represents a row, and can contain any data type. |
| `columns` | `Array<Object &#124; string>` | _Required_ | Table schema. [More...](#columns). |
| `page` | `boolean &#124; Object` | `false` | Set to `true` to enable pagination with default settings. Else pass an Object with specific settings. [More...](#page) |
| `filter` | `(query: string, row: any[] &$124; Object): boolean &#124; Object` | `false` | If set to a function or an object display an `input[type="text"]` element by the table to be used to filter values. The filter fuction run on the input element's change event, has a `query` parameter which is the value of the input element, and a second parameter for the row. It must return a boolean to determine whether to omit the row or not. [More...](#filter) |
| `deferRender` | `boolean` | `false` | Whether the table should be rerendered upon adding or removing data from its data set, or if it should wait until the `render` method is called. |

### `columns`
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | Transformed label | If `data` is an object, the key corresponding with the value for this column. If `label` exists for this column, not ID is passed, but `data` is an object, it will transform `Disk Quota` to `diskQuota`. |
| `label` | `string` | `''` | Text to display in column heading. |
| `display` | `(a: any) => string` | _N/A_ | By default the display value is the actual cell value. Otherwise the output of the passed function will be. |
| `sort` | `string &#124; boolean|(a: any, b: any) => number` | _N/A_ | Sorts the entire table by a columns values. [More...](#sorting) |

### `page`
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number &#124; Array<number&#124;string>` | 25 | The number of items to display at once without going to / from a page. If passed an array, a select menu will appear in the pagination controls with these values. Aside from a number, any string passed into it will count as displaying all rows while using the string as the label. `-1` can also be used and default the label to _All_. |
| `sizeDefault` | `number` | 25 | If `size` is an array, the default value selected. |
| `position` | `string` | `'bottom'` | Where the pagination controls are situated relative to the table. Possible values are `top` and `bottom`. |
| `textBefore` | `string` | `'Showing'` | Text to show _before_ page size select menu if visible. |
| `textAfter` | `string` | `'of n'` | Text to show _after_ page size select menu if visible. |

### `filter`
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `rule` | `(query: string, row: any[] &$124; Object): boolean` | _Required_ | The sorting function that can be passed into the `filter` parameter instead of this object. |
| `throttle` | `number` | `200` | How frequently to refilter the list. Cannot be set alongside `debounce`. |
| `debounce` | `number &#124; boolean` | _N/A_ | How long before user input ends before executing the filter. Cannot be set alongside `throttle`. If set to `true` will use a default value of `30`. |
| `minQueryLength` | `number` | `2` | Minimum length of input value before table can be filtered. |
| `placeholder` | `string` | `Filter...` | Placeholder text for input element. |
| `singlePage` | `boolean` | `false` | If set to `true` the filter will only apply to the currently viewed page. Otherwise it will filter all results and show the maximum amount of items allowed within view. _(Need to figure out what to do about page number)_ |


## Methods

`add(row: any[]): Tablr`

`remove(any[] => bool): Tablr`

`map((row: any[]) => any[]): Tablr` _(maybe)_

`replace(match: ((row: any[]) => boolean), transform: ((row: any[]) => any[])): Tablr` _(maybe)_

`sort((a: Object, b: Object) => number): Tablr`

`moveColumn(a: number, b: number): Tablr` _(maybe)_




## Sorting
