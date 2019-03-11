<template>
  <div class="navigation custom-scroll">
    <NavigationItem
      v-for="o of options"
      :key="o.name"
      :name="o.name"
      :selected="isSelected(o.name)"
    />
  </div>
</template>

<script>
  import NavigationItem from './NavigationItem'

  export default {
    components: { NavigationItem },
    props: {
      options: { type: Array, default: () => [] },
      path: { type: String, required: true },
    },
    methods: {
      isSelected (path) {
        return this.path.toLowerCase().slice(1) === path.toLowerCase()
      },
    },
  }
</script>

<style lang="scss">
  @import '../../styles/colors.scss';

  .navigation {
    flex-direction: column;
    display: inline-flex;
    position: relative;

    min-width: 200px;
    height: 100%;

    background-color: $neu300;
    transition: all 0.3s ease 0s;
  }
</style>