import { reactive } from 'vue'

export const store = reactive({
  apiUrl: 'http://127.0.0.1:8000/api/',

  houses: [],
  services: [],

  house:{},

  inputAddress: '',
  searchRange: 100,
  searchBath: 1,
  searchRooms: 1,
  searchBeds: 1,
  searchServices: [],

  serviceName: '',

  footernav: [],

  socialIcons: [
    {
      name: 'Facebook',
      iconClass: 'fab fa-facebook-f'
    },

    {
      name: 'Instagram',
      iconClass: 'fa-brands fa-instagram'
    },

    {
      name: 'Pinterest',
      iconClass: 'fa-brands fa-pinterest'
    },

    {
      name: 'X',
      iconClass: 'fa-solid fa-x'
    }

  ],

  footerDates: [

    { email: 'boolbnb@gmail.com' },
    { phone: '+39 02 5321789' },
    { address: "Via Brera, 28 20121 Milano" },
    { location: 'Milano' },
    { pIva: '0360602600350' },
    { social: 'Stay in touch with us' },

  ],

  footerLinks: [
    'Termini e condizioni',
    'FAQ',
    'Privacy',
    'GDPR 679/2016'
  ]

})