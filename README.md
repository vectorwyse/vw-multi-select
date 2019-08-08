# vw-multi-select
A styleable multi-select component for Vue.js

## Installation
`npm install vw-multi-select`

## Usage
### Global

In your entry file:

`import 'VwMultiSelect' from 'vw-multi-select';
Vue.component(VwMultisSelect);`

*or:*

### Component
In your component:

`import 'VwMultiSelect' from 'vw-multi-select';
...
components: {VwMultisSelect},
...`

### In your template:

`<vw-multi-select
    v-model="listOfSelectedOptions"
    :list="listOfOptions"
></vw-multi-select>`

## Props

| Name                         | Description                                                      | Type      | Required  | Options | Default  |
|------------------------------|------------------------------------------------------------------|-----------|-----------|---------|----------|
| list                         | The list of options to select from                               | Array     | yes       |         |          |
| selectedListDisplayFunction  | Determines how an option is displayed in the selected items list | Function  |           |         |          |
| listItemDisplayFunction      | Determines how an option is displayed in the list                | Function  |           |         | `item => {return this.listItemProperty ? item[this.listItemProperty] : item;}` |
| valueProperty                | Determines how an option is displayed in the list                | Function  |           |         | `item => {return this.listItemProperty ? item[this.listItemProperty] : item;}` |


