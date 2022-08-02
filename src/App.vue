<template>
  <div class="min-h-screen flex flex-column surface-ground">
    <div class="surface-overlay py-3 px-6 flex align-items-center justify-content-between relative lg:static">
      <img
        src="/logo.svg"
        alt="Image"
        height="80"
        class="mr-0 lg:mr-6"
      >
    </div>
    <div class="flex relative lg:static p-5 flex-auto">
      <div class="flex flex-column flex-auto">
        <div class="border-2 border surface-border border-round surface-section flex-auto">
          <template v-if="loading">
            <div class="w-full h-full flex flex-column justify-content-center align-items-center">
              <ProgressSpinner />
              <img
                src="/logo.svg"
                alt="Image"
                height="120"
              >
            </div>
          </template>
          <template v-else>
            <router-view />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner';

export default {
  components: {
    ProgressSpinner
  },
  computed: {
    loading() {
      return this.$store.getters['global/getLoadingStatus']
    }
  },
}
</script>
<style>
body {
  margin: 0 auto;
}
</style>
