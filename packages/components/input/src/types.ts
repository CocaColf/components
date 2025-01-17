import type { DefineComponent, InputHTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import type { FormSize } from '@idux/components/form'

import { controlPropDef } from '@idux/cdk/forms'
import { IxPropTypes } from '@idux/cdk/utils'

export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical'
export type TextareaAutoRows = { minRows: number; maxRows: number }

export const commonProps = {
  value: IxPropTypes.string,
  control: controlPropDef,
  clearable: IxPropTypes.bool,
  clearIcon: IxPropTypes.string,
  disabled: IxPropTypes.bool.def(false),
  readonly: IxPropTypes.bool.def(false),
  size: IxPropTypes.oneOf<FormSize>(['large', 'medium', 'small']),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: string) => void>(),
  onClear: IxPropTypes.emit<(evt: Event) => void>(),
  onCompositionStart: IxPropTypes.emit<(evt: CompositionEvent) => void>(),
  onCompositionEnd: IxPropTypes.emit<(evt: CompositionEvent) => void>(),
  onInput: IxPropTypes.emit<(evt: Event) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
}

export type CommonProps = IxInnerPropTypes<typeof commonProps>

export const inputProps = {
  ...commonProps,
  addonAfter: IxPropTypes.string,
  addonBefore: IxPropTypes.string,
  borderless: IxPropTypes.bool,
  prefix: IxPropTypes.string,
  suffix: IxPropTypes.string,
}

export type InputProps = IxInnerPropTypes<typeof inputProps>
export type InputPublicProps = IxPublicPropTypes<typeof inputProps>
export interface InputBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}
export type InputComponent = DefineComponent<InputHTMLAttributes & typeof inputProps, InputBindings>
export type InputInstance = InstanceType<DefineComponent<InputProps, InputBindings>>
