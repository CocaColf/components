<template>
  <IxSwitch v-model:checked="checked" @change="updateChecked"></IxSwitch>
  <div class="mt-5">checked: {{ checked }}</div>
  <IxButton class="mt-5" @click="changeChecked">父组件触发改变</IxButton>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(true)
    const changeChecked = () => {
      checked.value = !checked.value
    }

    const updateChecked = (updateChecked: boolean) => {
      console.log(updateChecked)
    }

    return {
      checked,
      changeChecked,
      updateChecked,
    }
  },
})
</script>
<style lang="less" scoped>
.mt-5 {
  margin-top: 5px;
}
</style>
