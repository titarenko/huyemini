<template>
  <div class="layout">
    <Navigation
      :options="options"
      :path="$route.path"
    />
    <div class="layout__page custom-scroll">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
  @import '../../styles/index.scss';
  @import '../../styles/colors.scss';

  .layout {
    display: flex;
    width: 100%;
    height: 100%;

    &__page {
      flex: 1;
      display: flex;

      min-width: 0;
      min-height: 0;

      padding: 20px;
      box-sizing: border-box;

      background-color: $sec100;
    }
  }
</style>

<script>
  export default {
    props: {
      options: { type: Array, default: () => [] }
    }
  }
</script>
