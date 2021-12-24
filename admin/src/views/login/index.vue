<template>
  <div class="login-container">
    <vue-particles
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <div class="login-form" ref="loginRef">
      <div class="login_title">
        <div>博客管理端</div>
      </div>
      <div class="login_fields">
        <div class="login_fields__user">
          <div :class="['icon', focusItem === 1 ? 'focus' : '']">
            <img src="@/assets/icon/user_icon_copy.png" />
          </div>
          <input
            v-model="loginForm.name"
            autofocus
            type="text"
            placeholder="用户名"
            @focus="focusItem = 1"
            @blur="focusItem = 0"
          />
        </div>
        <div class="login_fields__password">
          <div :class="['icon', focusItem === 2 ? 'focus' : '']">
            <img src="@/assets/icon/lock_icon_copy.png" />
          </div>
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            @focus="focusItem = 2"
            @blur="focusItem = 0"
            @keydown.enter="handleLoginClick"
          />
        </div>
        <div class="login_fields__submit">
          <input @click="handleLoginClick" type="button" value="登录" />
        </div>
      </div>
    </div>
    <transition name="login-loading">
      <div v-if="loginLoadingFlag" class="authent">
        <div class="loader" style="height: 60px; width: 60px; margin-left: 28px; margin-top: 40px">
          <div class="loader-inner ball-clip-rotate-multiple">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <p>认证中...</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { useStore } from '@/store';

const loginRef = ref<InstanceType<typeof HTMLElement>>();
const loginLoadingFlag = ref(false);
const loginForm = reactive({
  name: '',
  password: ''
});
const focusItem = ref(1);
const store = useStore();

const handleLoginClick = () => {
  if (!/[\w]{5,15}/.test(loginForm.name)) {
    ElNotification({
      type: 'error',
      title: '登录失败',
      message: '用户名必须是5-15位的字母、数字、下划线~'
    });
    focusItem.value = 1;
    return;
  }
  if (!loginForm.password) {
    ElNotification({
      type: 'error',
      title: '登录失败',
      message: '密码不能为空~'
    });
    focusItem.value = 2;
    return;
  }
  enterTheAnimation();
  setTimeout(() => {
    store.dispatch('login/loginAction', loginForm).catch((error) => {
      playTheAnimation();
    });
  }, 1000);
};

const enterTheAnimation = () => {
  // 登录入场动画
  loginRef.value?.classList.add('hou_yang');
  setTimeout(() => {
    loginRef.value?.classList.add('zuo_yi');
    loginLoadingFlag.value = true;
  }, 300);
};
const playTheAnimation = () => {
  // 登录出场动画
  setTimeout(() => {
    loginLoadingFlag.value = false;
    loginRef.value?.classList.remove('zuo_yi');
    setTimeout(() => {
      loginRef.value?.classList.remove('hou_yang');
    }, 300);
  }, 1000);
};
</script>

<style lang="less" scoped>
.login-container {
  .particles-js-canvas-el {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
.login-container {
  height: 100%;
  width: 100%;
  background-color: #242645;
  overflow: hidden;
  perspective: 800px;

  .login-form {
    box-sizing: content-box;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    opacity: 1;
    // top: 20px;
    transition-property: transform, opacity, box-shadow, top, left;
    transition-duration: 0.5s;
    transform-origin: 161px 100%;
    transform: rotateX(0deg);
    position: relative;
    width: 300px;
    /* border-top: 2px solid #D8312A; */
    height: 350px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    padding: 100px 40px 40px 40px;
    // background: #35394a;
    background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
    // filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(53, 57, 74, 0)', endColorstr='rgb(0, 0, 0)',GradientType=1 );
    .login_title {
      color: #d3d7f7;
      height: 60px;
      line-height: 60px;
      text-align: left;
      font-size: 20px;
    }
    .login_fields {
      margin-top: 10px;
      height: 208px;
      position: absolute;
      left: 0;
      .login_fields__user,
      .login_fields__password {
        margin-top: 15px;
        position: relative;
        .focus {
          opacity: 1;
        }
        input {
          height: 25px;
          color: #afb1be;
          font-size: 16px;
          width: 190px;
          margin-top: -2px;
          background: rgba(57, 61, 82, 0);
          left: 0;
          padding: 6px 65px;
          border-top: 2px solid rgba(57, 61, 82, 0);
          border-bottom: 2px solid rgba(57, 61, 82, 0);
          border-right: none;
          border-left: none;
          outline: none;
          font-family: 'Gudea', sans-serif;
          box-shadow: none;
          box-sizing: content-box;
          color: #61bfff;
        }
      }
      .login_fields__submit {
        position: relative;
        top: 17px;
        left: 0;
        width: 80%;
        right: 0;
        margin: auto;
        input {
          border-radius: 50px;
          background: transparent;
          padding: 10px 50px;
          border: 2px solid #4fa1d9;
          color: #4fa1d9;
          text-transform: uppercase;
          font-size: 16px;
          transition-property: background, color;
          transition-duration: 0.2s;
          outline: none;
          &:hover {
            color: white;
            background: #4fa1d9;
            cursor: pointer;
            transition-property: background, color;
            transition-duration: 0.2s;
          }
        }
      }
      .icon {
        position: absolute;
        z-index: 1;
        left: 36px;
        top: 8px;
        opacity: 0.5;
        img {
          margin-top: 5px;
          display: inline-block;
          border: none;
        }
      }
    }
    &.hou_yang {
      box-shadow: 0px 20px 30px 3px rgba(0, 0, 0, 0.55);
      pointer-events: none;
      top: -100px;
      transform: rotateX(70deg) scale(0.8);
      filter: blur(1px);
      opacity: 0.6;
    }
    &.zuo_yi {
      left: -320px !important;
    }
  }

  .authent {
    box-sizing: content-box;
    box-shadow: 0px 20px 30px 3px rgba(0, 0, 0, 0.55);
    background: #35394a;
    background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
    position: absolute;
    left: 0;
    right: -320px;
    margin: auto;
    width: 400px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    padding: 20px 70px;
    top: 100px;
    bottom: 0;
    height: 300px;
    p {
      font-size: 30px;
      text-align: center;
      color: white;
    }
    &.conceal {
      display: none;
      right: 90px;
      opacity: 0;
    }
    &.reveal {
      display: block;
      right: -320px;
      opacity: 1;
    }
    .ball-clip-rotate-multiple {
      position: relative;
      div {
        animation-fill-mode: both;
        position: absolute;
        left: 0px;
        top: 0px;
        border: 2px solid #fff;
        border-bottom-color: transparent;
        border-top-color: transparent;
        border-radius: 100%;
        height: 35px;
        width: 35px;
        animation: rotate 1s 0s ease-in-out infinite;
        &:last-of-type {
          display: inline-block;
          top: 10px;
          left: 10px;
          width: 15px;
          height: 15px;
          animation-duration: 0.5s;
          border-color: #fff transparent #fff transparent;
          animation-direction: reverse;
        }
      }
    }
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .login-loading-enter-active {
    transition: all 0.8s;
  }
  .login-loading-leave-active {
    transition: all 0.3s;
  }
  .login-loading-enter,
  .login-loading-leave-to {
    right: 90px;
    opacity: 0;
  }
  .login-loading-enter-to,
  .login-loading-leave {
    right: -320px;
    opacity: 1;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(0.6);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
}
</style>
