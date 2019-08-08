# vw-multi-select

A styleable multi-select component for Vue.js

## Installation

`npm install vw-multi-select`

## Usage

### Global

In your entry file:

```
import 'VwMultiSelect' from 'vw-multi-select';
Vue.component(VwMultisSelect);
```

_or:_

### Component

In your component:

```
import 'VwMultiSelect' from 'vw-multi-select';
...
components: {VwMultisSelect},
...
```

### In your template:

```
<vw-multi-select
    v-model="listOfSelectedOptions"
    :list="listOfOptions"
></vw-multi-select>
```

## Props

| Name                        | Description                                                                                                                                           | Type     | Required | Options            | Default                                                                        |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------------------ | ------------------------------------------------------------------------------ |
| list                        | The list of options to select from                                                                                                                    | Array    | yes      |                    |                                                                                |
| selectedListDisplayFunction | Determines how an option is displayed in the selected items list                                                                                      | Function |          |                    | `item => {return this.listItemProperty ? item[this.listItemProperty] : item;}` |
| listItemDisplayFunction     | Determines how an option is displayed in the list                                                                                                     | Function |          |                    | `item => {return this.listItemProperty ? item[this.listItemProperty] : item;}` |
| valueProperty               | The property from the option which will be used in the v-model a                                                                                      | String   |          |                    |                                                                                |
| listItemProperty            | The property from the option which will be used in the lists, can overridden on render by `selectedListDisplayFunction` and `listItemDisplayFunction` | String   |          |                    |                                                                                |
| isInvalid                   | Applies the 'invalid' class to the wrapper if set to true                                                                                             | Boolean  |          |                    | false                                                                          |
| iconset                     | The set of icons used                                                                                                                                 | String   |          | ['font-awesome']   |                                                                                |
| template                    | The name of the classes template                                                                                                                      | String   |          | ['bootstrap']      |                                                                                |
| appendRandomId              | If a random 6-digit string should be appended to the wrapper, selected and list ids in order to avoid conflicts                                       | Boolean  |          |                    | true                                                                           |
| showSelectedFirst           | If the selected items should be moved to the top of the list                                                                                          | Boolean  |          |                    | false                                                                          |
| searchable                  | If the search field should be displayed                                                                                                               | Boolean  |          |                    | false                                                                          |
| tags                        | If the selectd items should be displayed as tags at the top                                                                                           | Boolean  |          |                    | false                                                                          |
| classes                     | An object containing the classes to be applied to each element                                                                                        | Object   |          | `{}`               |                                                                                |
| styles                      | An object containing the styles object to be applied to each element                                                                                  | Object   |          | `{}`               |                                                                                |
| inputPlaceholder            | The search input placeholder text                                                                                                                     | String   |          |                    | "Search..."                                                                    |
| autoAddText                 | The text to be displayed next to the list item, if the search yields only one unselected result                                                       | String   |          | "Hit enter to add" |

## Styling

### Classes

```
{
    autoAddText: "",
    input: "",
    invalid: "",
    list: "",
    removeIcon: "",
    selected: "",
    selectedIcon: "",
    selectedItem: "",
    selectedListItem: "",
    selectedListItemText: "",
    unselectedIcon: "",
    unselectedListItem: "",
    unselectedListItemText: "",
    wrapper: "",
}
```

### Styles

```
{
    autoAddText: {},
    input: {},
    invalid: {},
    list: {},
    removeIcon: {},
    selected: {},
    selectedIcon: {},
    selectedItem: {},
    selectedListItem: {},
    selectedListItemText: {},
    unselectedIcon: {},
    unselectedListItem: {},
    unselectedListItemText: {},
    wrapper: {},
}
```

### Icons
```
{
    removeIcon: "",
    selectedIcon: "",
    unselectedIcon: "",
    unselectedListItem: "",
    unselectedListItemText: "",
    wrapper: "",
}
```

## Support Us

[Vectorwyse](https://vectorwyse.com) is a digital agency offering advisory and web development services. We love building things with Laravel and Vue.js, so when we have an opportunity to give back to the community, we're super excited!

If you find this package useful, or if you would like us to build something for you, feel free to [drop us a line!](mailto:hello@vectorwyse.com)