<template>
  <v-data-table
    v-bind="$attrs"
    :headers="headers"
    :items="items"
    :hide-default-header="hideDefaultTableHeader"
    :hide-default-footer="true"
    :items-per-page="quantityPerPage"
    :sort-by="sortOptions.sortBy"
    :sort-desc="sortOptions.sortDesc"
    :search="props.search"
    class="elevation-0"
    @click:row="rowClicked"
  >
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

    <template v-for="header in headers" #[`item.${header.key}`]="{ item }">
      <slot :name="header.title" :item="item">
        {{ item[header.title] }}
      </slot>
    </template>

    <template #no-data>
      <ToolkitNoData />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type { TableEmits, TableProps } from '~/types/Table'

const props = withDefaults(defineProps<TableProps>(), {
  headers: () => [],
  items: () => [],
  hideDefaultTableHeader: true,
  quantityPerPage: 30,
  sortOptions: () => ({
    sortBy: [],
    sortDesc: false,
  }),
  search: '',
  canBeClicked: true,
})

const emit = defineEmits<TableEmits>()

const rowClicked = (item: any, rowData: any) => {
  emit('rowClicked', item, rowData)
}
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
          &:first-child {
            padding-left: 0px !important;
          }
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
  .v-data-table-rows-no-data td {
    padding: 0 !important;
  }
}
</style>
