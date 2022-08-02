import {createApp} from 'vue'
import router from './router';
import store from './store';

import App from './App.vue'
import PrimeVue from 'primevue/config'
import EButton from 'primevue/button';
import EInputText from 'primevue/inputtext';

import 'primevue/resources/themes/lara-dark-purple/theme.css'   //theme
import 'primevue/resources/primevue.min.css'                    //core css
import 'primeicons/primeicons.css'                              //icons
import './assets/style.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(router)
app.use(store)

app.component('EButton', EButton);
app.component('EInputText', EInputText);

app.mount('#app')
