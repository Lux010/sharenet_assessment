<template>
  <section class="card">
    <div class="head">
      <div class="line w55"></div>
      <div class="line w35"></div>
    </div>

    <div class="table">
      <div class="row row-head">
        <div class="cell w25"></div>
        <div class="cell w35"></div>
        <div class="cell w20"></div>
        <div class="cell w20"></div>
      </div>

      <div class="row" v-for="i in 6" :key="i">
        <div class="cell w25"></div>
        <div class="cell w35"></div>
        <div class="cell w20"></div>
        <div class="cell w20"></div>
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
  min-width: 0;
}

.head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.table {
  display: grid;
  gap: 10px;
}

.row {
  display: grid;
  grid-template-columns: 1.2fr 1.6fr 1fr 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid rgba(148, 163, 184, 0.10);
  border-radius: 14px;
  background: rgba(2, 6, 23, 0.35);
}

.row-head {
  background: rgba(2, 6, 23, 0.55);
}

.line, .cell {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background: rgba(148, 163, 184, 0.12);
}

.line { height: 14px; }
.cell { height: 12px; }

.w55 { width: 55%; }
.w35 { width: 35%; }

.w25 { width: 70%; }
.w35c { width: 90%; } /* not used */
.w35 { width: 90%; }
.w20 { width: 60%; }

.line::after, .cell::after {
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
