<template>
  <div class="main-container-col">
    <div class="top-row">
    Top Row
    <br> <br> <br> <br> <br>

    <br> <br> <br> <br> <br>
    <br> <br> <br> <br> <br>
    </div>
    <div class="bottom-row">
      <div class="left-column">Left Column</div>
      <div class="right-column">
      Right Column
        <AttributeConfiguration />
      </div>
    </div>
  </div>
</template>


<script>
import AttributeConfiguration from '@/components/AttributeConfiguration.vue'

export default {
  name: 'WorldView2',
  components: {
    AttributeConfiguration,
  },
}

</script>

