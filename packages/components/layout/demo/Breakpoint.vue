<template>
  <IxLayout>
    <IxLayoutHeader>header</IxLayoutHeader>
    <IxLayoutSider breakpoint="md" :onCollapse="onCollapse" :onBreakpoint="onBreakpoint"> </IxLayoutSider>
    <IxLayoutContent> content </IxLayoutContent>
    <IxLayoutFooter>footer</IxLayoutFooter>
  </IxLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const collapsed = ref(true)
    const onCollapse = (collapsed: boolean, type: 'trigger' | 'breakpoint') => {
      console.log('onCollapse', collapsed, type)
    }
    const onBreakpoint = (collapsed: boolean) => {
      console.log('onBreakpoint', collapsed)
    }

    return {
      collapsed,
      onCollapse,
      onBreakpoint,
    }
  },
})
</script>

<style lang="less" scoped>
.ix-layout {
  background-color: @blue;
  &-footer,
  &-header {
    background-color: @blue-l20;
  }
  &-sider {
    background-color: @blue-l10;
  }
  &-content {
    height: 200px;
  }
  .trigger {
    position: absolute;
    left: -50px;
  }
}
</style>
