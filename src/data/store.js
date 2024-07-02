import { reactive, watchEffect } from 'vue'

// Funzione per leggere dal localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

// Funzione per salvare nel localStorage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const store = reactive({
  apiUrl: 'http://127.0.0.1:8000/api/',

  houses: [],
  services: [],

  house:{},

  inputAddress: loadFromLocalStorage('inputAddress', ''),
  searchRange: loadFromLocalStorage('searchRange', 100),
  searchBath: loadFromLocalStorage('searchBath', 1),
  searchRooms: loadFromLocalStorage('searchRooms', 1),
  searchBeds: loadFromLocalStorage('searchBeds', 1),
  searchServices: loadFromLocalStorage('searchServices', []),

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

// Watcher per salvare automaticamente i cambiamenti nel localStorage
watchEffect(() => {
  saveToLocalStorage('inputAddress', store.inputAddress);
  saveToLocalStorage('searchRange', store.searchRange);
  saveToLocalStorage('searchBath', store.searchBath);
  saveToLocalStorage('searchRooms', store.searchRooms);
  saveToLocalStorage('searchBeds', store.searchBeds);
  saveToLocalStorage('searchServices', store.searchServices);
});