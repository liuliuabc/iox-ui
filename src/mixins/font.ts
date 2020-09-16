import Vue from 'vue';
import { getSystemInfoSync, compareVersion } from '../utils/utils';

/**
 * if SDK version less than 2.10.0, load fonts for each page.
 */
export default Vue.extend({
  created() {
    const app = (this as any).$app();
    const info: WechatMiniprogram.GetSystemInfoSyncResult = getSystemInfoSync();
    if (info && compareVersion(info.SDKVersion, '2.10.0') < 0) {
      const fontUrl = `${app.globalData.config.urls.baseResUrl}/assets/fonts/fontawesome-webfont.woff`;
      wx.loadFontFace({
        global: true,
        family: 'FontAwesome',
        source: `url("${fontUrl}")`,
        success: console.log,
        fail: console.warn
      });
    }
  }
});