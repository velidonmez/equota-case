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
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>
<style>
body {
  margin: 0 auto;
}
</style>
