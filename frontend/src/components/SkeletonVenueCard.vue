<template>
  <section class="card">
    <div class="head">
      <div class="line w60"></div>
      <div class="line w90"></div>
    </div>

    <div class="rows">
      <div class="row" v-for="i in 3" :key="i">
        <div class="left">
          <div class="line w45"></div>
          <div class="line w35"></div>
        </div>
        <div class="right">
          <div class="pill"></div>
          <div class="btn"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.65);
  padding: 16px;
  overflow: hidden;
}

.head { display: grid; gap: 10px; margin-bottom: 14px; }
.rows { display: grid; gap: 10px; }

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 10px 12px;
  border: 1px solid rgba(148, 163, 184, 0.10);
  border-radius: 14px;
  background: rgba(2, 6, 23, 0.35);
}

.left { display: grid; gap: 8px; }
.right { display: flex; align-items: center; gap: 10px; }

.line, .pill, .btn {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background: rgba(148, 163, 184, 0.12);
}

.line { height: 12px; }
.w60 { width: 60%; }
.w90 { width: 90%; }
.w45 { width: 160px; }
.w35 { width: 120px; }

.pill { width: 82px; height: 26px; border-radius: 999px; }
.btn { width: 58px; height: 34px; border-radius: 12px; }

.line::after, .pill::after, .btn::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(226, 232, 240, 0.10),
    transparent
  );
  animation: shimmer 1.1s infinite;
}

@keyframes shimmer {
  100% { transform: translateX(100%); }
}
</style>
