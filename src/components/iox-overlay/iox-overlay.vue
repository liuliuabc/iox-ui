<template>
  <iox-transition
    :show="show"
    :custom-class="mainClass"
    :custom-style="mainStyle"
    :duration="duration"
    :name="transition"
    @touchmove.stop="noop"
  >
    <view class="iox-overlay__backdrop" @touchmove.stop="noop" @tap.stop="onClick"/>
    <slot />
  </iox-transition>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { Duration } from '../../mixins/transition';

const classPrefix = 'iox-overlay';

@Component
export default class IoxOverlay extends mixins(Base) {
  //datas
  @Prop({
    type: Boolean,
    default: false,
  })
  show!: boolean;

  @Prop({
    type: [Number, Object],
    default: 300,
  })
  duration!: number | Duration;

  @Prop({
    type: Number,
    default: 1,
  })
  zIndex!: number;

  @Prop({
    type: String,
    default: 'fade',
  })
  transition!: string;

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    return `z-index: ${this.zIndex}; ${this._rootStyles}`;
  }

  onClick() {
    this.$emit('click');
  }

  noop() {}
}
</script>

<style lang="less">
@import '../../style/widget/iox-overlay/iox-overlay.less';

</style>