<template>
  <div class="grid">
    <div
      class="col-12 flex flex-wrap p-4 gap"
    >
      <EButton @click="display = !display">
        {{ portfolio.length === 0 ? 'Add Stock' : 'Add / Update' }}
      </EButton>
      <EButton @click="refresh()">
        Refresh
      </EButton>
    </div>
    <div class="col-12">
      <div class="divider-horizontal" />
    </div>
    <div class="col-12 grid p-4">
      <div class="col-7 flex flex-column gap">
        <template v-if="portfolio.length === 0">
          <div class="flex align-center justify-content-center">
            <h2 class="text-white">
              Start by adding preferred coin pairs from above.
            </h2>
          </div>
        </template>
        <template v-else>
          <SymbolCard
            v-for="symbol in portfolio"
            :key="symbol.symbol"
            :symbol="symbol"
            update
            remove
            weighted-avg-price
          />
        </template>
      </div>
      <div class="col-1">
        <div class="divider-vertical" />
      </div>
      <div class="col-4">
        <Chart
          type="pie"
          :data="chartData"
          :options="lightOptions"
        />
      </div>
    </div>
  </div>
  <EDialog
    v-model:visible="display"
    style="width: 50vw;"
  >
    <template #header>
      <h3>Add & Update Stock List</h3>
    </template>
    <div
      class="flex flex-column gap"
    >
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <EInputText
          v-model="search"
          class="w-full"
          type="text"
          placeholder="Search"
        />
      </span>
      <template
        v-for="symbol in searchResults"
        :key="symbol.name"
      >
        <SymbolCard
          :symbol="symbol"
          :add="!symbol.qty"
          :update="symbol?.qty > 0"
          :remove="symbol?.qty > 0"
        />
      </template>
    </div>
  </EDialog>
</template>

<script>
import debounce from 'lodash.debounce'
import Chart from 'primevue/chart'
import EDialog from 'primevue/dialog';
import SymbolCard from "../components/SymbolCard.vue";

export default {
  name: 'IndexPage',
  components: {
    SymbolCard,
    Chart,
    EDialog
  },
  data() {
    return {
      display: false,
      search: '',
      searchResults: [],
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: []
          }
        ]
      },
      lightOptions: {
        responsive: true,
        layout: {
          padding: 20
        },
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        }
      },
      currentPortfolio: []
    }
  },
  computed: {
    symbols() {
      return this.$store.getters['symbols/getSymbols']
    },
    portfolio() {
      return this.$store.getters['portfolio/getPortfolio']
    }
  },
  watch: {
    portfolio: {
      immediate: true,
      deep: true,
      handler(data) {
        this.chartData = {
          labels: data.map(el => el.symbol),
          datasets: [
            {
              data: data.map(el => el.qty),
              backgroundColor: data.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`)
            }
          ]
        }
        if (this.searchResults.length > 0) {
          this.searchResults = this.updateSearchResults(this.searchResults)
        }
      }
    },
    search() {
      this.debounced()
    }
  },
  created () {
    // use debounce to prevent freezing. this happens because we are making search in a large array.
    this.debounced = debounce(this.searchPairs, 750)
  },
  async mounted() {
    window.setInterval(() => {
      this.refresh()
    }, 1000 * 60 * 20)
  },
  methods: {
    searchPairs(){
      if (this.search) {
        const searchResults = this.symbols.filter(el => el.symbol.includes(this.search.toUpperCase()))
        this.searchResults = this.updateSearchResults(searchResults)
      } else {
        this.searchResults = []
      }
    },
    updateSearchResults(searchResults) {
      return searchResults.map(el => {
        const findInPortfolio = this.portfolio.find(e => e.symbol === el.symbol)
        if (findInPortfolio) {
          return findInPortfolio
        } else {
          return el
        }
      })
    },
    async refresh() {
      await this.$store.dispatch('symbols/updateSymbols')
      await this.$store.dispatch('portfolio/init', {portfolio: this.portfolio, symbols: this.symbols})
    }
  }
}
</script>

<style lang="css">
</style>
