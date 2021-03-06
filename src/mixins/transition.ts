import Vue from 'vue';
import { isObj, requestAnimationFrame } from '../utils/utils';

const getClassNames = function (this: any, name: string) {
  let classes: {[name: string]: string} = {};
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  classes = {
    enter: `iox-${name}-enter iox-${name}-enter-active enter-class enter-active-class`,
    'enter-to': `iox-${name}-enter-to iox-${name}-enter-active enter-to-class enter-active-class`,
    leave: `iox-${name}-leave iox-${name}-leave-active leave-class leave-active-class`,
    'leave-to': `iox-${name}-leave-to iox-${name}-leave-active leave-to-class leave-active-class`,
  };
  // #endif
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  classes = {
    enter: `iox-${name}-enter iox-${name}-enter-active ${this.enterClass || ''} ${this.enterActiveClass || ''}`,
    'enter-to': `iox-${name}-enter-to iox-${name}-enter-active ${this.enterToClass || ''} ${this.enterActiveClass || ''}`,
    leave: `iox-${name}-leave iox-${name}-leave-active ${this.leaveClass || ''} ${this.leaveActiveClass || ''}`,
    'leave-to': `iox-${name}-leave-to iox-${name}-leave-active ${this.leaveToClass || ''} ${this.leaveActiveClass || ''}`,
  };
  // #endif

  return classes;
};

export type Duration = {
  enter: number;
  leave: number;
} | number;

export const transition = function (showDefaultValue: boolean) {
  return Vue.extend({
    props: {
      // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
      enterClass: String,
      enterActiveClass: String,
      enterToClass: String,
      leaveClass: String,
      leaveActiveClass: String,
      leaveToClass: String,
      // #endif
      show: {
        type: Boolean,
        default: showDefaultValue,
      },
      duration: {
        type: [Number, Object],
        default: 300,
        validator(val: any) {
          if (typeof val === 'number') {
            return val >= 0;
          } else if (typeof val === 'object') {
            if (!val.hasOwnProperty('enter') || !val.hasOwnProperty('leave')) {
              return false;
            }
            return true;
          }
          return false;
        }
      },
      name: {
        type: String,
        default: 'fade',
      },
    },
    // data
    data() {
      return {
        type: '',
        inited: false,
        display: false,
        status: null as null | string,
        classes: null as null | string,
        currentDuration: 300 as number | Duration,
        transitionEnded: false,
      };
    },
    watch: {
      show(newVal: boolean, oldVal: boolean) {
        if (newVal === oldVal) {
          return;
        }
    
        newVal ? this.enter() : this.leave();
      }
    },
    mounted() {
      if (this.show) {
        this.enter();
      }
    },
    methods: {
      enter() {
        const { duration, name } = (this as any);
        const classNames = getClassNames.call(this, name);
        const currentDuration = isObj(duration) ? duration.enter : duration;

        this.status = 'enter';
        this.$emit('before-enter');

        requestAnimationFrame(() => {
          this.checkStatus('enter');
          this.$emit('enter');

          this.inited = true;
          this.display = true;
          this.classes = classNames.enter;
          this.currentDuration = currentDuration;

          requestAnimationFrame(() => {
            this.checkStatus('enter');
            this.transitionEnded = false;

            this.classes =  classNames['enter-to'];
          });
        });
      },

      leave() {
        if (!this.display) {
          return;
        }

        const { duration, name } = (this as any);
        const classNames = getClassNames.call(this, name);
        const currentDuration = isObj(duration) ? duration.leave : duration;

        this.status = 'leave';
        this.$emit('before-leave');

        requestAnimationFrame(() => {
          this.checkStatus('leave');
          this.$emit('leave');

          this.classes = classNames.leave;
          this.currentDuration = currentDuration;

          requestAnimationFrame(() => {
            this.checkStatus('leave');
            this.transitionEnded = false;
            setTimeout(() => this.onTransitionEnd(), currentDuration);

            this.classes = classNames['leave-to'];
          });
        });
      },

      checkStatus(status: 'enter' | 'leave') {
        if (status !== this.status) {
          throw new Error(`incongruent status: ${status}`);
        }
      },

      onTransitionEnd() {
        if (this.transitionEnded) {
          return;
        }

        this.transitionEnded = true;
        this.$emit(`after-${this.status}`);

        const { show, display } = (this as any);
        if (!show && display) {
          this.display = false;
        }
      },
    }
  });
};