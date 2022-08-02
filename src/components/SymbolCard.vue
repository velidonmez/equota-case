<template>
  <div
    class="symbol-card text-white surface-border border-round border-2 p-4 flex flex-wrap justify-content-between gap"
  >
    <h3>{{ symbol.symbol }} - {{ symbol.lastPrice }}</h3>
    <h4 v-if="weightedAvgPrice">
      {{ symbol.weightedAvgPrice }}
    </h4>
    <div
      class="flex gap"
    >
      <InputText
        :value="symbol.qty ? symbol.qty : qty"
        type="number"
        :min="1"
        placeholder="Qty"
        @input="qty = $event.target.value"
      />
      <div class="flex gap">
        <EButton
          v-if="add"
          :disabled="qty === 0"
          @click="addSymbol({symbol, qty})"
        >
          Add
        </EButton>
        <EButton
          v-if="update"
          :disabled="qty === 0"
          @click="$store.dispatch('portfolio/update',{symbol: symbol.symbol, qty})"
        >
          Update
        </EButton>
        <EButton
          v-if="remove"
          class="p-button-danger"
          @click="$store.dispatch('portfolio/remove',symbol.symbol)"
        >
          Remove
        </EButton>
      </div>
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';

export default {
  name: 'SymbolCard',
  components: {
    InputText
  },
  props: {
    symbol: {
      type: Object,
      required: false,
      default: null,
    },
    add: {
      type: Boolean,
      required: false,
      default: false,
    },
    update: {
      type: Boolean,
      required: false,
      default: false,
    },
    remove: {
      type: Boolean,
      required: false,
      default: false,
    },
    weightedAvgPrice: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      qty: 1
    }
  },
  methods:{
    addSymbol(payload){
      this.$store.dispatch('portfolio/add', payload)
    }
  }
}
</script>
<style>
</style>
