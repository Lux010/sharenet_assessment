<script setup>
import { ref } from 'vue'
import { useToast } from '../composables/useToast'
const toast = useToast()

const form = ref({
  title: '',
  firstNames: '',
  surname: '',
  email: '',
  phone: '',
  city: '',
  message: ''
})

const snackOpen = ref(false)
const snackMsg = ref('')
const snackType = ref('info')

function showSnack(message, type = 'info') {
  snackMsg.value = message
  snackType.value = type
  snackOpen.value = true
}

function submitForm() {
  if (!form.value.email || !form.value.message) {
    toast.warning('Please enter your email and a message.')
    return
  }

  toast.success('Thanks! Your message has been sent.')
}
</script>


<template>
  <main class="page">
    <!-- NEED HELP SECTION -->
    <section class="panel">
      <div class="panel-left">
        <h1 class="text_p">NEED HELP? <span class="kicker">WE ARE HERE.</span></h1>

        <div class="block">
          <h3>CALL US</h3>
          <p>
            Contact us on +27 21 700 4800<br />
            Monday - Friday, 8am - 5pm
          </p>
        </div>

        <div class="block">
          <h3>SEND US A MESSAGE</h3>
          <p>
            Contact our support centre and we'll get back to you as soon as possible.
            During business hours, we will respond within 4 hours.<br /><br />
            Email us on support@sharenet.co.za
          </p>
        </div>

        <div class="block">
          <h3>FIND A SHARENET WEALTH MANAGER OR ADVISER</h3>
          <p>
            Get on the road to financial independence. Consult with a Sharenet Wealth
            Manager or Adviser in your area to help you plan your financial future and reach your goals.
          </p>

          <select class="select">
            <option value="">Select an option</option>
            <option>Bellville</option>
            <option>City Centre</option>
            <option>Durbanville</option>
          </select>
        </div>
      </div>

      <div class="panel-right image-card">
        <div class="image-overlay"></div>
        <img
          class="hero-img"
          src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1600&q=60"
          alt="Support"
        />
      </div>
    </section>

    <!-- TALK TO US SECTION -->
    <section class="panel panel-alt">
      <!-- WhatsApp -->
      <div class="panel-left">
        <h1>
          TALK TO US ON <span class="green">WhatsApp</span>
        </h1>

        <p class="muted">
          Chat with us on WhatsApp by scanning the QR code to add Sharenet as a contact.
        </p>

        <div class="block">
          <h3>How it works</h3>
          <ul class="list">
            <li>Open WhatsApp to chat with us on your computer, or scan the QR code to add Sharenet as a contact</li>
            <li>Say “Hi” to us in the WhatsApp chat to start the conversation</li>
            <li>Follow the prompts to complete your request</li>
          </ul>
        </div>

        <div class="qr">
          <img
            src="../../src/assets/qr_code.png"
            alt="WhatsApp QR"
          />
        </div>
      </div>

      <!-- Form -->
      <div class="panel-right form-card">
        <h2 class="form-title">
          COMPLETE THE FORM <span class="muted">BELOW AND WE WILL GET BACK TO YOU</span>
        </h2>

        <form class="form" @submit.prevent="submitForm">
          <label class="label">Title</label>
          <select v-model="form.title" class="input">
            <option value="">Select an option</option>
            <option>Mr</option>
            <option>Ms</option>
            <option>Mrs</option>
            <option>Dr</option>
          </select>

          <label class="label">First Names</label>
          <input v-model="form.firstNames" class="input" type="text" placeholder="First names" />

          <label class="label">Surname</label>
          <input v-model="form.surname" class="input" type="text" placeholder="Surname" />

          <label class="label">Email Address</label>
          <input v-model="form.email" class="input" type="email" placeholder="Email" />

          <label class="label">Phone Number</label>
          <input v-model="form.phone" class="input" type="tel" placeholder="+27 ..." />

          <label class="label">Specify Closest City</label>
          <select v-model="form.city" class="input">
            <option value="">Select an option</option>
            <option>Bellville</option>
            <option>Cape Town</option>
            <option>Durbanville</option>
          </select>

          <label class="label">Message</label>
          <textarea v-model="form.message" class="input" rows="4" placeholder="Message"></textarea>

          <button class="btn" type="submit">Submit</button>
        </form>
      </div>
    </section>

    <!-- MAP SECTION -->
    <section class="map-section">
      <h1>FIND US <span class="kicker">HERE</span></h1>
      <div class="map-wrap">
        <iframe
          class="map"
          src="https://www.google.com/maps?q=Bella%20Rosa%20Village%20Bellville%20Cape%20Town&z=17&output=embed"
          loading="lazy"
        ></iframe>

        <div class="map-details">
          <h3 class="h3_title"3>Head Office</h3>
          <p>
            Anzio Building<br />
            Bella Rosa Village<br />
            1 Village Crescent<br />
            Rosendal, Bellville<br />
            Cape Town, 7550
          </p>

          <h3 class="h3_title">Telephone</h3>
          <p>
            +27 21 700 4800<br />
            +27 21 700 4800 (International)
          </p>

          <h3 class="h3_title">Email</h3>
          <p>support@sharenet.co.za</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  width: 100%;
  padding: 24px;
  background: rgba(2, 6, 23, 0.15);
}

/* shared panel layout */
.panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 28px;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 16px;
  overflow: hidden;
}

.panel-alt {
  background: rgba(15, 23, 42, 0.55);
}

.panel-left {
  padding: 26px;
}

.panel-right {
  padding: 0;
}

.h3_title {
  font-size: medium;
  font-weight: 900;
}

.kicker {
  margin: 0 0 18px;
  letter-spacing: 0.08em;
  font-weight: 900;
  color: #67e8f9;
}

.block {
  margin-top: 18px;
}

.block h3 {
  margin: 0 0 8px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(226, 232, 240, 0.85);
}

.block p {
  margin: 0;
  line-height: 1.6;
  color: rgba(226, 232, 240, 0.75);
}

.select {
  margin-top: 10px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.35);
  color: #e2e8f0;
}

/* right hero image */
.image-card {
  position: relative;
  min-height: 420px;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(2, 6, 23, 0.35), rgba(2, 6, 23, 0.55));
  z-index: 1;
}

.image-card img {
  position: relative;
  z-index: 0;
}

/* WhatsApp */
.title {
  margin: 0 0 12px;
  font-weight: 900;
}
.green {
  font-weight: 800;
  color: #22c55e;
}
.muted {
  color: rgba(226, 232, 240, 0.65);
}
.list {
  margin: 0;
  padding-left: 18px;
  color: rgba(226, 232, 240, 0.75);
  line-height: 1.6;
}
.qr {
  margin-top: 18px;
  width: 240px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.14);
  background: rgba(2, 6, 23, 0.35);
}
.qr img {
  width: 100%;
  display: block;
}

/* Form */
.form-card {
  padding: 26px;
  border-left: 1px solid rgba(148, 163, 184, 0.14);
}
.form-title {
  margin: 0 0 14px;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.02em;
}
.form {
  display: grid;
  gap: 10px;
}
.label {
  font-size: 12px;
  color: rgba(226, 232, 240, 0.75);
  margin-top: 6px;
}
.input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.35);
  color: #e2e8f0;
  outline: none;
}
.input:focus {
  border-color: rgba(103, 232, 249, 0.5);
  box-shadow: 0 0 0 4px rgba(103, 232, 249, 0.08);
}
.btn {
  margin-top: 10px;
  justify-self: start;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(34, 197, 94, 0.35);
  background: rgba(34, 197, 94, 0.18);
  color: #dcfce7;
  font-weight: 900;
  cursor: pointer;
}
.btn:hover {
  background: rgba(34, 197, 94, 0.25);
}

/* Map section */
.map-section {
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 16px;
  padding: 26px;
}

.map-title {
  margin: 0 0 14px;
  font-size: 22px;
  font-weight: 900;
}

.map-wrap {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 18px;
}

.map {
  width: 100%;
  height: 380px;
  border: none;
  border-radius: 14px;
}

.map-details h3 {
  margin: 0 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(226, 232, 240, 0.85);
}

.map-details p {
  margin: 0 0 16px;
  color: rgba(226, 232, 240, 0.75);
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 980px) {
  .panel {
    grid-template-columns: 1fr;
  }
  .form-card {
    border-left: none;
    border-top: 1px solid rgba(148, 163, 184, 0.14);
  }
  .image-card {
    min-height: 280px;
  }
  .map-wrap {
    grid-template-columns: 1fr;
  }
  .map {
    height: 320px;
  }
}
</style>
