<template>
  <router-link
    :to="name.toLowerCase()"
    :class="['navigation-item', {
      'navigation-item_selected': selected,
    }]"
  >
    <span class="navigation-item__label">
      {{ name }}
    </span>
  </router-link>
</template>

<script>
  export default {
    props: {
      name: { type: String, required: true },
      selected: { type: Boolean, default: false },
    },
  }
</script>

<style lang="scss">
  @import '../../styles/colors.scss';

  .navigation-item {
    display: flex;
    align-items: center;
    box-sizing: border-box;

    min-height: 40px;
    padding: 0 20px;

    border-top: 1px solid $neu200;
    border-left: 3px solid transparent;
    text-decoration: none;

    color: $sec200;

    &:first-child {
      border-top: 1px solid transparent;
    }

    &:hover,
    &_selected  {
      border-top: 1px solid transparent;

      border-left: 3px solid $prm100;

      & + a {
        border-top: 1px solid transparent;
      }
    }

    &:hover {
      background-color: $prm100;
      color: $neu100;
    }

    &_selected  {
      background-color: $sec100;
    }
  }
</style>