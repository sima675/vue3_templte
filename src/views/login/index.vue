<template>
  <div class="login-page">
    <header class="login-header">
      <div class="brand">DINSTAR</div>
      <a-select v-model:value="language" class="language-select" size="small">
        <a-select-option value="zh">中文</a-select-option>
        <a-select-option value="en">English</a-select-option>
      </a-select>
    </header>

    <main class="login-main">
      <section class="login-visual" aria-hidden="true">
        <div class="platform">
          <div class="device-card card-one"></div>
          <div class="device-card card-two"></div>
          <div class="screen">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="phone-icon">☎</div>
          <div class="user-icon">☻</div>
        </div>
      </section>

      <section class="login-panel">
        <h1>IPPBX</h1>
        <login-form />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
  import LoginForm from './Form.vue';

  const language = ref('zh');
</script>

<style lang="less" scoped>
  .login-page {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #f4f8ff;

    &::before {
      position: absolute;
      top: -190px;
      right: -70px;
      width: 520px;
      height: 360px;
      content: '';
      border-radius: 0 0 0 230px;
      background: linear-gradient(180deg, rgba(216, 232, 255, 0.78), rgba(244, 248, 255, 0));
    }

    &::after {
      position: absolute;
      bottom: -230px;
      left: -120px;
      width: 940px;
      height: 430px;
      content: '';
      transform: rotate(-9deg);
      background: linear-gradient(180deg, rgba(218, 236, 255, 0.88), rgba(244, 248, 255, 0.2));
    }
  }

  .login-header {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 34px;

    .brand {
      color: #0b76e0;
      font-size: 30px;
      font-weight: 800;
      line-height: 1;
    }

    .language-select {
      width: 72px;
    }
  }

  .login-main {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(420px, 1fr) 360px;
    align-items: center;
    gap: 86px;
    width: min(1080px, calc(100vw - 96px));
    height: calc(100vh - 112px);
    margin: 0 auto;
  }

  .login-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 430px;
  }

  .platform {
    position: relative;
    width: 410px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(
      circle at 50% 43%,
      #3ca5ff 0,
      #1686f2 45%,
      #dcefff 46%,
      #eef6ff 64%,
      transparent 65%
    );
    filter: drop-shadow(0 24px 24px rgba(48, 128, 224, 0.2));
  }

  .device-card {
    position: absolute;
    top: 74px;
    left: 130px;
    width: 142px;
    height: 88px;
    border: 2px solid #dbeafe;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 12px 30px rgba(65, 122, 180, 0.16);

    &::before,
    &::after {
      position: absolute;
      left: 18px;
      content: '';
      border-radius: 4px;
      background: #dceeff;
    }

    &::before {
      top: 18px;
      width: 34px;
      height: 8px;
    }

    &::after {
      top: 38px;
      width: 96px;
      height: 7px;
    }
  }

  .card-one {
    transform: rotate(-5deg) translate(-34px, -28px);
  }

  .card-two {
    transform: rotate(5deg) translate(24px, 8px);
  }

  .screen {
    position: absolute;
    top: 132px;
    left: 132px;
    width: 152px;
    height: 96px;
    border-radius: 9px;
    background: #ffffff;
    box-shadow: inset 0 -8px 0 #e3edf8, 0 18px 30px rgba(24, 87, 158, 0.18);

    span {
      display: block;
      width: 86px;
      height: 8px;
      margin: 14px 0 0 34px;
      border-radius: 5px;
      background: #cfe8ff;

      &:first-child {
        width: 52px;
        background: #2cc8d5;
      }
    }
  }

  .phone-icon,
  .user-icon {
    position: absolute;
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    color: #1187ef;
    font-size: 20px;
    border: 3px solid #31a8ff;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 12px 20px rgba(20, 123, 225, 0.16);
  }

  .phone-icon {
    top: 120px;
    left: 50px;
  }

  .user-icon {
    top: 88px;
    right: 40px;
  }

  .login-panel {
    width: 344px;
    padding: 34px 36px 32px;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 14px 40px rgba(29, 86, 151, 0.08);

    h1 {
      margin: 0 0 24px;
      color: #202733;
      font-size: 24px;
      font-weight: 700;
      line-height: 1.2;
      text-align: center;
    }
  }

  @media (max-width: 860px) {
    .login-main {
      grid-template-columns: 1fr;
      gap: 24px;
      height: auto;
      padding-top: 36px;
    }

    .login-visual {
      display: none;
    }

    .login-panel {
      width: min(344px, calc(100vw - 48px));
      margin: 0 auto;
    }
  }
</style>
