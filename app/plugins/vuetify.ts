// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import ArrowBig from '~/components/icons/ArrowBig.vue'
import Exit from '~/components/icons/Exit.vue'
import MenuHamb from '~/components/icons/MenuHamb.vue'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      sets: { mdi },
      aliases: {
        ...aliases,
        arrow_big: ArrowBig,
        exit: Exit,
        menu_hamb: MenuHamb
      }
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
                primary: '#3E4251',
                secondary: '#2992B3',
                greenSecondary: '#0CB4B5',
                bodyColor: '#E5E5E5',
                textLight: '#4F5667',
                yellowPending: 'E8B455',
                dryBrown: "#926948",
                dark: '#292D32',
                greyText: '#b7b3b3',
                ultraLightGrey: '#DADADA',
                lightGrey: '#F5F5F8',
                cancel: '#FF7B43',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            }
      },
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
