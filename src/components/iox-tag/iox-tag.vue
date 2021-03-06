<template>
  <view :class="mainClass" :style="mainStyle" >
    <slot />
    <iox-icon
      v-if="closeable"
      name="close"
      :custom-class="spinnerClass"
      custom-style="font-size:12px;"
      @click="onClose"
    />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';

const classPrefix = 'iox-tag';
declare type Type ={
  type?: string;
  value?: 'default';
} | string;

@Component
export default class IoxTag extends mixins(Base) {
  @Prop({
    type: String,
    default: ''
  })
  size!: string;

  @Prop({
    type: Boolean,
    default: false
  })
  mark!: boolean;

  @Prop({
    type: String,
    default: '',
  })
  color!: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  plain!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  round!: boolean;

  @Prop({
    type: String,
    default: '',
  })
  textColor!: string;

  @Prop({
    type: [String,Object],
    default: 'primary',
  })
  type!: Type;

  @Prop({
    type: Boolean,
    default: false,
  })
  closeable!: boolean;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes: string = this.bem('tag', [
      this.type,
      this.size,
      {
        mark: this.mark,
        plain: this.plain,
        round: this.round,
      }
    ]);
    return `${classes} ${this.plain ? 'iox-hairline--surround' : ''} ${this._rootClasses}`;
  }

  get mainStyle() {
    return `${this.color && !this.plain ? 'background-color: '+ this.color + ';' : ''} ${this.textColor || (this.color && this.plain) ? 'color: ' + (this.textColor || this.color) + ';' : '' } ${this._rootStyles}`;
  }

  get spinnerClass() {
    return `${this.classPrefix}__close`;
  }

  //hooks
  created() {
  }

  //methods
  onClose() {
    this.$emit('close');
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-tag/iox-tag.less';

</style>