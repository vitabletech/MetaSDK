<script setup>
import { ref, onMounted } from 'vue'

const products = [
  {
    name: 'Google Business Profile SDK',
    desc: 'Enterprise-grade Node.js SDK for Google Business Profile.',
    link: 'https://gbp.vitabletech.in/',
    badge: 'Node.js SDK'
  },
  {
    name: 'Ludo Player',
    desc: 'Play Ludo directly in your VS Code editor.',
    link: 'https://marketplace.visualstudio.com/items?itemName=vitabletech.ludo-player',
    badge: 'VS Code Extension'
  },
  {
    name: 'Fake Developer Mode',
    desc: 'Simulate developer mode in VS Code for fun and pranks.',
    link: 'https://marketplace.visualstudio.com/items?itemName=vitabletech.fake-developer-mode',
    badge: 'VS Code Extension'
  },
  {
    name: 'ANSI Spectrum',
    desc: 'Visualize ANSI color codes and spectrum in your editor.',
    link: 'https://marketplace.visualstudio.com/items?itemName=vitabletech.ansi-spectrum',
    badge: 'VS Code Extension'
  },
  {
    name: 'AutoDevKit',
    desc: 'A toolkit to automate development workflows and boost productivity.',
    link: 'https://github.com/msrajawat298/AutoDevKit',
    badge: 'Open Source'
  },
  {
    name: 'VitableTech Sandbox',
    desc: 'A playground for testing and experimenting with VitableTech tools.',
    link: 'https://sandbox.vitabletech.in/',
    badge: 'Web Tool'
  },
  {
    name: 'Interview Questions',
    desc: 'A curated collection of interview questions and answers.',
    link: 'https://interview-questions.vitabletech.in/',
    badge: 'Education'
  },
  {
    name: 'CareerBuddy',
    desc: 'Meet your personal AI career companion.',
    link: 'https://careerbuddy.vitabletech.in/',
    badge: 'AI Platform'
  },
  {
    name: 'Memory Leak Demo',
    desc: 'An interactive demonstration of memory leaks in JavaScript.',
    link: 'https://vitabletech.github.io/memory-leak-demo/',
    badge: 'Educational'
  },
  {
    name: 'Naukri Automation',
    desc: 'Playwright-based automation script for Naukri profile updates.',
    link: 'https://github.com/vitabletech/naukari_automation-playwright',
    badge: 'Automation'
  }
]

const currentProduct = ref(products[0])

onMounted(() => {
  // Randomly pick a product on mount
  const randomIndex = Math.floor(Math.random() * products.length)
  currentProduct.value = products[randomIndex]
})
</script>

<template>
  <div class="sidebar-ad-wrapper">
    <a :href="currentProduct.link" target="_blank" rel="noopener noreferrer" class="sidebar-ad">
      <div class="ad-badge">{{ currentProduct.badge }}</div>
      <div class="ad-title">{{ currentProduct.name }}</div>
      <div class="ad-desc">{{ currentProduct.desc }}</div>
      <div class="ad-sponsor">by VitableTech</div>
    </a>
  </div>
</template>

<style scoped>
.sidebar-ad-wrapper {
  margin: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.sidebar-ad {
  display: block;
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid transparent;
  transition: border-color 0.25s, background-color 0.25s;
  text-decoration: none !important;
}

.sidebar-ad:hover {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-alt);
}

.ad-badge {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--vp-c-brand);
  font-weight: 700;
  margin-bottom: 4px;
}

.ad-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.ad-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  margin-bottom: 8px;
}

.ad-sponsor {
  font-size: 10px;
  color: var(--vp-c-text-3);
  text-align: right;
  font-weight: 500;
}
</style>
