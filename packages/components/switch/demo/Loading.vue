<template>
  <div>
    <IxSwitch v-model:checked="checked1" :loading="loading"></IxSwitch>
  </div>
  <div class="mt-5">
    <IxSwitch v-model:checked="checked2" :loading="loading"></IxSwitch>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked1 = ref(true)
    const checked2 = ref(false)
    const loading = ref(true)

    const updateChecked = (updateChecked: boolean) => {
      console.log(updateChecked)
    }

    return {
      checked1,
      checked2,
      updateChecked,
      loading,
    }
  },
})
</script>
<style lang="less" scoped>
.mt-5 {
  margin-top: 5px;
}
</style>
