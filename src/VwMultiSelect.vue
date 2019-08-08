<template>
  <div
    :id="`vwms-wrapper${appendRandomId ? random : ''}`"
    :class="[_classes.wrapper, isInvalid ? _classes.invalid : '']"
    :style="_styles.wrapper"
  >
    <template v-if="tags || searchable">
      <div
        :id="`vwms-selected${appendRandomId ? random : ''}`"
        :class="_classes.selected"
        :style="_styles.selected"
      >
        <template v-if="tags">
          <span
            :class="_classes.selectedItem"
            :style="_styles.selectedItem"
            v-for="item in selectedItems"
            @click="() => toggleItem(item)"
            >{{ selectedListDisplayFunction(item) }}
            <template v-if="_icons.removeIcon">
              <i
                :class="[_classes.removeIcon, _icons.removeIcon]"
                :style="_styles.removeIcon"
                @click="toggleItem(item)"
              ></i>
            </template>
            <template v-else="">
              <span :class="_classes.removeIcon" :style="_styles.removeIcon"
                >✖</span
              >
            </template>
          </span>
        </template>

        <template v-if="searchable">
          <input
            :class="_classes.input"
            :style="_styles.input"
            type="text"
            v-model="query"
            :placeholder="inputPlaceholder || 'Search...'"
            @keyup.enter.prevent="autoAddItem ? autoAdd(autoAddItem) : null"
          />
        </template>
      </div>
    </template>

    <div
      :id="`vwms-list${appendRandomId ? random : ''}`"
      :class="_classes.list"
      :style="_styles.list"
    >
      <template v-if="showSelectedFirst">
        <div
          v-for="item in selectedItems.filter(listItem =>
            listItemDisplayFunction(listItem)
              .toLowerCase()
              .includes(query.toLowerCase().trim())
          )"
          :key="listItemDisplayFunction(item)"
          :class="_classes.selectedListItem"
          :style="_styles.selectedListItem"
          @click="() => toggleItem(item)"
        >
          <template v-if="_icons.selectedIcon">
            <i
              :class="[_classes.selectedIcon, _icons.selectedIcon]"
              :style="_styles.selectedIcon"
            ></i>
          </template>
          <template v-else="">
            <input
              type="checkbox"
              checked="checked"
              :style="_styles.selectedIcon"
            />
          </template>
          <span
            :class="_classes.selectedListItemText"
            :style="_styles.selectedListItemText"
            >{{ listItemDisplayFunction(item) }}</span
          >
        </div>
        <div
          v-for="item in unselectedItems.filter(listItem =>
            listItemDisplayFunction(listItem)
              .toLowerCase()
              .includes(query.toLowerCase().trim())
          )"
          :key="listItemDisplayFunction(item)"
          :class="_classes.unselectedListItem"
          :style="_styles.unselectedListItem"
          @click="() => toggleItem(item)"
        >
          <template v-if="_icons.unselectedIcon">
            <i
              :class="[_classes.unselectedIcon, _icons.unselectedIcon]"
              :style="_styles.unselectedIcon"
            ></i>
          </template>
          <template v-else="">
            <input
              type="checkbox"
              :value="false"
              :style="_styles.unselectedIcon"
            />
          </template>

          <span
            :class="_classes.unselectedListItemText"
            :style="_styles.unselectedListItemText"
            >{{ listItemDisplayFunction(item) }}</span
          >
          <span
            v-if="autoAddItem"
            :class="_classes.autoAddText"
            :style="_styles.autoAddText"
            >{{ autoAddText || "Hit enter to add" }}</span
          >
        </div>
      </template>

      <template v-else="">
        <div
          v-for="item in list.filter(listItem =>
            listItemDisplayFunction(listItem)
              .toLowerCase()
              .includes(query.toLowerCase().trim())
          )"
          :key="listItemDisplayFunction(item)"
          :class="
            isItemSelected(item)
              ? _classes.selectedListItem
              : _classes.unselectedListItem
          "
          :style="
            isItemSelected(item)
              ? _styles.selectedListItem
              : _styles.unselectedListItem
          "
          @click="() => toggleItem(item)"
        >
          <template v-if="isItemSelected(item) && _icons.selectedIcon">
            <i
              :class="[_classes.selectedIcon, _icons.selectedIcon]"
              :style="_styles.selectedIcon"
            ></i>
          </template>
          <template v-if="isItemSelected(item) && !_icons.selectedIcon">
            <input
              type="checkbox"
              checked="checked"
              :style="_styles.selectedIcon"
            />
          </template>
          <template v-if="!isItemSelected(item) && _icons.unselectedIcon">
            <i
              :class="[_classes.unselectedIcon, _icons.unselectedIcon]"
              :style="_styles.unselectedIcon"
            ></i>
          </template>
          <template v-if="!isItemSelected(item) && !_icons.unselectedIcon">
            <input
              type="checkbox"
              :value="false"
              :style="_styles.unselectedIcon"
            />
          </template>

          <span
            :class="
              isItemSelected(item)
                ? _classes.selectedListItemText
                : _classes.unselectedListItemText
            "
            :style="
              isItemSelected(item)
                ? _styles.selectedListItemText
                : _styles.unselectedListItemText
            "
            >{{ listItemDisplayFunction(item) }}</span
          >
          <span
            v-if="autoAddItem"
            :class="_classes.autoAddText"
            :style="_styles.autoAddText"
            >{{ autoAddText || "Hit enter to add" }}</span
          >
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import bootstrap from "./vwms_bootstrap";
import fa from "./vwms_fontawesome";

export default {
  name: "MultiSelect",
  props: {
    value: {
      type: Array,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    selectedListDisplayFunction: {
      type: Function,
      required: false,
      default: item => {
        return this.listItemProperty ? item[this.listItemProperty] : item;
      }
    },
    listItemDisplayFunction: {
      type: Function,
      required: false,
      default: item => {
        return this.listItemProperty ? item[this.listItemProperty] : item;
      }
    },
    valueProperty: {
      type: String,
      required: false
    },
    listItemProperty: {
      type: String,
      required: false
    },
    isInvalid: {
      type: Boolean,
      default: false
    },
    iconset: {
      type: String,
      required: false
    },
    template: {
      type: String,
      required: false
    },
    appendRandomId: {
      type: Boolean,
      default: true
    },
    showSelectedFirst: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Boolean,
      default: false
    },
    classes: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    styles: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    icons: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
      //remove
      //selected
      //unselected
    },
    inputPlaceholder: {
      type: String,
      required: false
    },
    autoAddText: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      defaultClasses: {
        autoAddText:
          "font-size-080 font-style-italic text-decoration-underline",
        input: "background-transparent border-none width-100 font-size-080",
        invalid: "border-darkred",
        list: "height-120px padding-6px overflow-y-auto",
        removeIcon: "margin-x-6px",
        selected: "border-bottom display-flex padding-6px",
        selectedIcon: "",
        selectedItem:
          "cursor-pointer border display-flex font-size-080 padding-6px margin-x-6px",
        selectedListItem: "cursor-pointer",
        selectedListItemText: "font-size-080 font-weight-bold",
        unselectedIcon: "",
        unselectedListItem: "cursor-pointer",
        unselectedListItemText: "font-size-080",
        wrapper: "border"
      },
      defaultStyles: {
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
        wrapper: {}
      },
      random: parseInt(Math.random() * 1e6),
      query: ""
    };
  },
  computed: {
    _icons() {
      switch (this.iconset) {
        case "font-awesome":
          return {
            ...fa.icons,
            ...this.icons
          };
        default:
          return {
            ...this.icons
          };
      }
    },
    _classes() {
      switch (this.template) {
        case "bootstrap":
          return {
            ...this.defaultClasses,
            ...bootstrap.classes,
            ...this.classes
          };
        default:
          return {
            ...this.defaultClasses,
            ...this.classes
          };
      }
    },
    _styles() {
      switch (this.template) {
        case "bootstrap":
          return {
            ...this.defaultStyles,
            ...bootstrap.styles,
            ...this.styles
          };
        default:
          return {
            ...this.defaultStyles,
            ...this.styles
          };
      }
    },
    selectedItems() {
      return this.list.filter(item => {
        if (this.valueProperty) {
          return this.value.includes(item[this.valueProperty]);
        }
        return this.value.includes(item);
      });
    },
    unselectedItems() {
      return this.list.filter(item => {
        if (this.valueProperty) {
          return !this.value.includes(item[this.valueProperty]);
        }
        return !this.value.includes(item);
      });
    },
    autoAddItem() {
      let filteredItems = this.unselectedItems.filter(listItem =>
        this.listItemDisplayFunction(listItem)
          .toLowerCase()
          .includes(this.query.toLowerCase().trim())
      );

      if (this.query && filteredItems.length === 1) {
        return filteredItems[0];
      }

      return null;
    }
  },
  mounted() {
    setTimeout(this.scrollListToTop, 0);
  },
  methods: {
    autoAdd(item) {
      this.toggleItem(item);
      this.query = "";
    },

    isItemSelected(item) {
      return this.itemIndex(item) > -1;
    },

    itemIndex(item) {
      return this.selectedItems.findIndex(selected =>
        this.valueProperty
          ? item[this.valueProperty] === selected[this.valueProperty]
          : item === selected
      );
    },

    scrollListToTop() {
      const list = document.getElementById(
        `vwms-list${this.appendRandomId ? this.random : ""}`
      );
      if (list) {
        list.scrollTop = 0;
      }
    },

    toggleItem(item) {
      let resultingSelectedItems = [...this.selectedItems];
      const itemIndex = this.itemIndex(item);
      if (itemIndex > -1) {
        resultingSelectedItems.splice(itemIndex, 1);
      } else {
        resultingSelectedItems.push(item);
      }
      const formattedResult = resultingSelectedItems.map(result =>
        this.valueProperty ? result[this.valueProperty] : result
      );
      this.$emit("input", formattedResult);
      if (this.showSelectedFirst) {
        this.scrollListToTop();
      }
    }
  }
};
</script>

<style scoped>
:root {
  --border-style: solid 1px #ced4da;
}

.background-transparent {
  background: transparent;
}

.border-bottom {
  border-bottom: var(--border-style);
}

.border {
  border: var(--border-style);
  border-radius: 4px;
}

.border-darkred {
  border: solid 1px darkred;
  border-radius: 4px;
}

.border-none {
  border: none;
}

.cursor-pointer {
  cursor: pointer;
}

.display-flex {
  display: flex;
}

.font-size-080 {
  font-size: 80%;
}

.font-style-italic {
  font-style: italic;
}

.font-weight-bold {
  font-weight: bold;
}

.height-120px {
  height: 120px;
}

.margin-x-6px {
  margin: 0 6px 0 6px;
}

.padding-6px {
  padding: 6px;
}

.overflow-y-auto {
  overflow-y: auto;
}

.text-decoration-underline {
  text-decoration: underline;
}

.width-100 {
  width: 100%;
}
</style>
