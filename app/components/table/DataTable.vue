<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :headers="headers"
    :items="items"
    :hide-default-header="hideDefaultTableHeader"
    :hide-default-footer="true"
    :items-per-page="quantityPerPage"
    :sort-by="sortOptions.sortBy"
    :sort-desc="sortOptions.sortDesc"
    :search="search"
    class="elevation-0"
    @click:row="rowClicked"
  >
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>

    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
    <template #top="{ pagination, options, updateOptions }">
      <!-- Here is the custom header of the table -->
      <slot
        name="tableToolbar"
        :pagination="pagination"
        :options="options"
        :update-options="updateOptions"
      />
      <slot name="componentDelete" />
    </template>

    <template #[`item.status`]="{ item }">
      <!-- let add chip styeles in a specific data in every item -->
      <slot name="chipStatus" :item="item" />
    </template>

    <template #[`item.actions`]="{ item, index }">
      <!-- Let add a menu in every item -->
      <ActionsMenu :item="item" :index="index" />
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    hideDefaultTableHeader: {
      type: Boolean,
      default: true,
    },
    quantityPerPage: {
      type: Number,
      default: 30,
    },
    sortOptions: {
      type: Object,
      default: () => {
        return {
          sortBy: "",
          sortDesc: false,
        };
      },
    },
    search: {
      type: String,
      default: "",
    },
  },
  methods: {
    rowClicked(item, rowData) {
      this.$emit("rowClicked", item, rowData);
    },
  },
};
</script>

<style lang="scss" scoped>
.user__h3 {
  @include fontStyle(200, 16px, 0.01em, $dark);
  font-style: normal;
}
.user__p {
  @include fontStyle(normal, 14px, 0.01em, $textLight);
  font-style: normal;
}
::v-deep {
  .v-table__wrapper {
    padding: 5px 22px;
    background-color: $lightGrey;
    table {
      border-spacing: 0 15px !important;
      tr {
        height: 58px;
        background-color: $white;
        @media (max-width: 960px) {
          margin-top: 20px;
        }
        td {
          border-radius: 4px !important;
          border-bottom: $border;
          border-top: $border;
          // &:first-child {
          //   border-radius: 10px; 
          // }
          &:last-child {
            border-right: $border;
          }
        }

        &:hover {
          background-color: $white !important;
          cursor: pointer;
          td {
            &:first-child {
              border-top-left-radius: $borderRadius;
              border-bottom-left-radius: $borderRadius;
            }
            &:last-child {
              border-top-right-radius: $borderRadius;
              border-bottom-right-radius: $borderRadius;
            }
          }
        }
      }
    }
    .v-data-table-header {
      tr {
        th > span {
          @include fontStyle(700, 14px, 0.01em, $textLight);
        }
      }
    }
    tbody {
      tr {
        td:last-child {
          width: 40px;
        }
      }
    }
  }
}
</style>
