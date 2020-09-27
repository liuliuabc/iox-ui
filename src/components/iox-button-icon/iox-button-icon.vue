<template>
  <iox-button
    square
    :id="id"
    size="large"
    :lang="lang"
    :loading="loading"
    :disabled="disabled"
    :open-type="openType"
    :business-id="businessId"
    :style="mainStyle"
    custom-class="iox-button-icon"
    hover-class="hover-class"
    :session-from="sessionFrom"
    :app-parameter="appParameter"
    :send-message-img="sendMessageImg"
    :send-message-path="sendMessagePath"
    :show-message-card="showMessageCard"
    :send-message-title="sendMessageTitle"
    @click="onClick"
    @error="onError"
    @contact="onContact"
    @opensetting="onOpenSetting"
    @getuserinfo="onGetUserInfo"
    @getphonenumber="onGetPhoneNumber"
    @launchapp="onLaunchApp"
  >
    <view class="iox-button-icon__content">
      <iox-icon
        v-if="icon"
        size="20px"
        :name="icon"
        :dot="dot"
        :info="info"
        class="iox-button-icon__icon"
        custom-class="icon-class"
      />
      <slot name="icon" />
      <text class="text-class">{{ text }}</text>
    </view>
  </iox-button>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop, Mixins } from 'vue-property-decorator';

import Base from '../../mixins/base';
import ButtonProps from '../../mixins/button';
import OpenType from '../../mixins/open-type';
import Link from '../../mixins/link';

const classPrefix = 'iox-button-icon';
@Component({
  externalClasses: ['hover-class', 'icon-class', 'text-class', 'custom-class']
})
export default class IoxButtonIcon extends Mixins(Base, Link, ButtonProps, OpenType) {
  @Prop({
    type: String,
  })
  text?: string;

  @Prop({
    type: String,
  })
  icon?: string;

  @Prop({
    type: Boolean,
  })
  dot?: boolean;

  @Prop({
    type: String,
  })
  info?: string;
  
  @Prop({
    type: Boolean,
    default: false,
  })
  loading!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  disabled!: boolean;

  get classPrefix() {
    return classPrefix;
  }

  onClick(event: Event) {
    this.$emit('click', event);
    this.jumpLink();
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-button-icon/iox-button-icon.less';

</style>