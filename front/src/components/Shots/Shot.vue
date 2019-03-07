<template>
  <div class="shot">
    
  </div>
</template>

<script>
  export default {
    props: {
      src: { String, required: true },
      status: {
        type: String,
        default: 'default',
        validator: x => ['default', 'success', 'warning', 'danger'].includes(x)
      },
    }
  }
</script>