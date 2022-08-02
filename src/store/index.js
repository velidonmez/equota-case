import { createStore } from 'vuex'
import SymbolsModule from './modules/symbols'
import PortfolioModule from './modules/portfolio'

const store = createStore({
    modules: {
        symbols: SymbolsModule,
        portfolio: PortfolioModule
    }
})

export default store
