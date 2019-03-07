<template>
  <div class="test">
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    mounted () {
      this.getEvents()
    },
    methods: {
      async getEvents () {
        const data = await axios.get('/get-paths')
        console.log(data)
      },
    }
  }
</script>