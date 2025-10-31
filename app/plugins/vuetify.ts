// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import ArrowBack from '~/components/icons/ArrowBack.vue'
import ArrowBig from '~/components/icons/ArrowBig.vue'
import BulletPointConfirmed from '~/components/icons/BulletPointConfirmed.vue'
import BulletPointPending from '~/components/icons/BulletPointPending.vue'
import BulletPointRejected from '~/components/icons/BulletPointRejected.vue'
import Date from '~/components/icons/Date.vue'
import Exit from '~/components/icons/Exit.vue'
import Info from '~/components/icons/Info.vue'
import MenuHamb from '~/components/icons/MenuHamb.vue'
import SearchIcon from '~/components/icons/Search.vue'
import ServiceCheck from '~/components/icons/ServiceCheck.vue'
import Email from '~/components/icons/Email.vue'
import Wsp from '~/components/icons/Wsp.vue'
import EH from '~/components/icons/EH.vue'
import Minus from '~/components/icons/Minus.vue'
import Plus from '~/components/icons/Plus.vue'
import ArrowBackModal from '~/components/icons/ArrowBackModal.vue'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases: {
        ...aliases,
        arrow_big: ArrowBig,
        arrow_back: ArrowBack,
        exit: Exit,
        menu_hamb: MenuHamb,
        search: SearchIcon,
        bullet_point_confirmed: BulletPointConfirmed,
        bullet_point_pending: BulletPointPending,
        bullet_point_rejected: BulletPointRejected,
        info: Info,
        service_check: ServiceCheck,
        date: Date,
        email: Email,
        wsp: Wsp,
        eh_logo: EH,
        minus: Minus,
        plus: Plus,
        arrow_back_modal: ArrowBackModal,
      },
      sets: { mdi },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#3E4251',
            secondary: '#2992B3',
            greenSecondary: '#0CB4B5',
            bodyColor: '#E5E5E5',
            textLight: '#4F5667',
            yellowPending: '#E8B455',
            dryBrown: '#926948',
            dark: '#292D32',
            greyText: '#b7b3b3',
            ultraLightGrey: '#DADADA',
            lightGrey: '#F5F5F8',
            cancel: '#FF7B43',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
