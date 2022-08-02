import { createStore } from 'vuex'
import GlobalModule from './modules/global'
import SymbolsModule from './modules/symbols'
import PortfolioModule from './modules/portfolio'

const store = createStore({
    modules: {
        global: GlobalModule,
        symbols: SymbolsModule,
        portfolio: PortfolioModule
    }
})

export default store
