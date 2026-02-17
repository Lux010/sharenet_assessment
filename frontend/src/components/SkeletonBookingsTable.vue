<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Ref</th>
          <th>Venue</th>
          <th>Date</th>
          <th>Time</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 8" :key="i">
          <td><div class="cell w40"></div></td>
          <td><div class="cell w90"></div></td>
          <td><div class="cell w60"></div></td>
          <td><div class="cell w50"></div></td>
          <td><div class="cell w80"></div></td>
          <td><div class="cell w90"></div></td>
          <td><div class="cell w70"></div></td>
          <td><div class="cell w80"></div></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrap {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.14);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 980px;
  background: rgba(2, 6, 23, 0.35);
}

thead th {
  background: rgba(2, 6, 23, 0.95);
  padding: 12px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #e2e8f0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  text-align: left;
}

tbody td {
  padding: 10px 12px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.10);
}

tbody tr:nth-child(odd) td { background: rgba(15, 23, 42, 0.22); }

.cell {
  height: 12px;
  border-radius: 10px;
  background: rgba(148, 163, 184, 0.12);
  position: relative;
  overflow: hidden;
}

.cell::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(226, 232, 240, 0.10), transparent);
  animation: shimmer 1.1s infinite;
}

@keyframes shimmer {
  100% { transform: translateX(100%); }
}

.w40 { width: 40px; }
.w50 { width: 50px; }
.w60 { width: 90px; }
.w70 { width: 120px; }
.w80 { width: 160px; }
.w90 { width: 220px; }
</style>
