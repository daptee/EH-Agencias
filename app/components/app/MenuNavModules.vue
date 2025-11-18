<template>
  <v-list nav flat class="px-3">
    <v-list-item-group v-model="openGroups" mandatory color="primary">
      <template v-for="(item, i) in items" :key="`module_${i}`">
        <v-list-group
          v-if="item.subItems && hasPermission(item)"
          :value="openGroups[i]"
          @update:value="(val: any) => (openGroups[i] = val)"
          no-action
          append-icon=""
          :class="isMiniOpen ? '' : 'white'"
          class="mb-3 rounded"
        >
          <template #activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon size="32">{{
                  openGroups[i] ? 'mdi-chevron-up' : 'mdi-chevron-down'
                }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>

          <v-list-item
            v-for="(subItem, j) in getVisibleSubItems(item.subItems)"
            :key="`sub_${i}_${j}`"
            class="pl-8"
            :class="isMiniOpen ? '' : 'bodycolor'"
            @click="goto(subItem.pathName)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ subItem.text }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon size="32">{{ subItem.arrow }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-else-if="hasPermission(item)"
          class="d-flex mb-3 rounded"
          :class="[
            isMiniOpen ? '' : 'primary',
            router.currentRoute.value.fullPath === `/${item.pathName}`
              ? 'v-item--active'
              : '',
          ]"
          @click="goto(item.pathName)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon size="32">{{ item.arrow }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface MenuItem {
  text: string
  pathName?: string
  arrow?: string
  id: number
  subItems?: MenuItem[]
  icon?: string
  ids?: number[]
}

const router = useRouter()
const uiStore = useUiStore()

const items = ref<MenuItem[]>([
  { text: 'Reservas', pathName: 'reservas', arrow: '$arrow_big', id: 1 },
  {
    text: 'Mis reservas',
    pathName: 'mis-reservas',
    arrow: '$arrow_big',
    id: 1,
  },
])

const openGroups = ref<boolean[]>(items.value.map(() => false))
const isMiniOpen = computed(() => uiStore.isNavMini)
const userModules = computed<number[]>(() => [1])

const goto = async (pathName?: string) => {
  navigateTo(`/${pathName}`)
}

const getVisibleSubItems = (subItems?: MenuItem[]) => {
  if (!subItems) return []
  return subItems.filter((sub) => userModules.value.includes(sub.id))
}

const hasPermission = (item: MenuItem) => {
  if (item.ids) return item.ids.some((id) => userModules.value.includes(id))
  return userModules.value.includes(item.id)
}
</script>

<style lang="scss" scoped>
::v-deep {
  .item-icon-arrow-despl {
    svg > * {
      fill: white !important;
    }
  }
  .v-list-group__items {
    display: flex;
    margin-bottom: 10px;
    background-color: white;
  }
  .v-list-item {
    height: 60px;
    background-color: $lightGrey;
    display: flex;
    .v-list-item__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 100%;
      .v-list-item-title {
        @include fontStyle(bold, 14px, 0.01em, $primary);
      }
    }
    .v-list-item__icon {
      .item-left-icons {
        svg > * {
          fill: $primary !important;
        }
      }
    }
    &:hover {
      @include backgroundTransparency($white, 0.1);
      .v-list-item__content {
        .v-list-item-title {
          color: $dark;
        }
      }
      .v-icon {
        svg > * {
          fill: $greyText !important;
        }
      }
    }
    &.v-item--active {
      background-color: $primary !important;
      @include backgroundTransparency($white, 0.15);
      .v-list-item-title {
        color: $white !important;
      }
      .v-icon {
        svg > * {
          fill: $white !important;
        }
      }

      .item-icon-arrow {
        svg > * {
          fill: $primary !important;
        }
      }
    }
  }
  .v-list-group__header {
    padding-left: 0px !important;
    padding-right: 0px !important;
    .v-list-item__icon {
      i {
        color: $greyText;
        &:hover {
          color: $dark;
        }
        &:active {
          color: $primary;
        }
      }
    }
  }
}
</style>
