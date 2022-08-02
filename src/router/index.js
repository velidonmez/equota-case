import {createRouter, createWebHistory} from 'vue-router';
import store from '../store'
import Index from '../pages/Index.vue'
import Cookies from 'js-cookie'

function loadView(path, view) {
    return () => import(`../pages/${path}/${view}.vue`);
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'IndexPage',
            component: Index
        }
    ]
});

router.beforeEach(async (to, from) => {
    await store.dispatch('global/updateLoadingStatus',true)
    const symbols = store.getters['symbols/getSymbols']
    if (symbols?.length === 0) {
        await store.dispatch('symbols/updateSymbols')
        const portfolio = Cookies.get('portfolio')
        if (portfolio) {
            await store.dispatch('portfolio/init', {
                portfolio: JSON.parse(portfolio),
                symbols: store.getters['symbols/getSymbols']
            })
        }
        await store.dispatch('global/updateLoadingStatus',false)
    }
})

export default router
