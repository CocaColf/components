import type { StyleValue, VNodeTypes } from 'vue'

import { computed, defineComponent, inject, onBeforeUnmount, onMounted, provide, ref, watch, watchEffect } from 'vue'
import { isVisibleElement, offResize, onResize } from '@idux/cdk/utils'
import { tableBodyToken, tableToken } from '../token'
import ColGroup from './ColGroup'
import Head from './head/Head'
import Body from './body/Body'
import Foot from './tfoot/Foot'
import FixedHolder from './FixedHolder'
import StickyScroll from './StickyScroll'
import { Key } from '../types'

export default defineComponent({
  setup() {
    const {
      props,
      config,
      changeColumnWidth,
      isSticky,
      scrollBodyRef,
      handleScroll,
      pingedStart,
      pingedEnd,
      scrollX,
      scrollY,
      scrollHorizontal,
      scrollVertical,
      hasFixed,
      tableLayout,
      tableTag,
    } = inject(tableToken)!

    const mainTableRef = ref<HTMLDivElement>()
    const mainTableWidth = ref(0)

    const _changeColumnWidth = (key: Key, width: number | false) => {
      if (isVisibleElement(mainTableRef.value)) {
        changeColumnWidth(key, width)
      }
    }

    provide(tableBodyToken, { mainTableWidth, changeColumnWidth: _changeColumnWidth })

    const triggerScroll = () => {
      const currentTarget = scrollBodyRef.value
      if (currentTarget) {
        handleScroll({ currentTarget } as unknown as Event)
      }
    }

    const handleWrapperResize = (evt: ResizeObserverEntry) => {
      const { offsetWidth } = evt.target as HTMLDivElement
      if (offsetWidth !== mainTableWidth.value) {
        triggerScroll()
        mainTableWidth.value = offsetWidth
      }
    }

    onMounted(() => {
      triggerScroll()

      watch([() => props.dataSource, scrollHorizontal], ([, value]) => {
        if (value) {
          triggerScroll()
        }
      })

      watchEffect(() => {
        const element = mainTableRef.value
        if (scrollHorizontal.value) {
          onResize(element, handleWrapperResize)
        } else {
          offResize(element, handleWrapperResize)
        }
      })
    })

    onBeforeUnmount(() => offResize(mainTableRef.value, handleWrapperResize))

    const classes = computed(() => {
      const prefixCls = 'ix-table'
      const { borderless = config.borderless, size = config.size } = props
      return {
        [`${prefixCls}-container`]: true,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-ping-start`]: pingedStart.value,
        [`${prefixCls}-ping-end`]: pingedEnd.value,
        [`${prefixCls}-fixed-layout`]: tableLayout.value === 'fixed',
        [`${prefixCls}-fixed-column`]: hasFixed.value,
        [`${prefixCls}-scroll-horizontal`]: scrollHorizontal.value,
        [`${prefixCls}-scroll-vertical`]: scrollVertical.value,
      }
    })

    const contentStyle = computed<StyleValue>(() => {
      const x = scrollX.value
      const y = scrollY.value
      const overflowX = x ? 'auto' : undefined
      const overflowY = y ? 'scroll' : x ? 'hidden' : undefined
      const maxHeight = y
      return { overflowX, overflowY, maxHeight }
    })

    const tableStyle = computed<StyleValue>(() => {
      return {
        tableLayout: tableLayout.value,
        width: scrollX.value,
        minWidth: scrollY.value ? '100%' : undefined,
      }
    })

    return () => {
      const TableTag = tableTag.value as any
      let children: VNodeTypes

      if (scrollVertical.value || isSticky.value) {
        const tableHead = props.headless ? null : (
          <FixedHolder>
            <Head></Head>
          </FixedHolder>
        )
        const tableBody = (
          <div ref={scrollBodyRef} style={contentStyle.value} onScroll={handleScroll}>
            <TableTag style={tableStyle.value}>
              <ColGroup></ColGroup>
              <Body></Body>
              <Foot></Foot>
            </TableTag>
          </div>
        )
        // TODO
        const tableFoot = null
        const sticky = isSticky.value ? <StickyScroll></StickyScroll> : null

        children = [tableHead, tableBody, tableFoot, sticky]
      } else {
        children = (
          <div ref={scrollBodyRef} onScroll={handleScroll}>
            <TableTag style={tableStyle.value}>
              <ColGroup></ColGroup>
              {props.headless ? null : <Head></Head>}
              <Body></Body>
              <Foot></Foot>
            </TableTag>
          </div>
        )
      }

      return (
        <div ref={mainTableRef} class={classes.value}>
          {children}
        </div>
      )
    }
  },
})
