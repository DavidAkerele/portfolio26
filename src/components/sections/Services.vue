<template>
  <section id="services" class="padding-x mb-20">
    <div class="flex w-full flex-col">
      <h3
        id="what-i-do"
        v-html="whatIDo"
        class="heading-1 font-extrabold uppercase"
      ></h3>

      <div
        id="services-text"
        class="grid-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
      >
        <p
          class="heading-6 text-flax-smoke-300/85 col-span-4 col-start-0 text-center text-nowrap md:col-start-4"
        >
          ( SERVICES )
        </p>
        <p
          class="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold md:col-span-5"
        >
          User-Friendly interface don't happen by chance, they are built with
          intention. I code intuitive responsive solutions that make your users'
          journey effortless
        </p>
      </div>
    </div>

    <div class="relative mt-12 w-full lg:mt-[10%]">
      <div class="mt-12 flex flex-col justify-between gap-y-16">
        <ServicesCard
          v-for="(card, index) in servicesCardProps"
          :key="index"
          :number="index + 1"
          :title="card.title"
          :body="card.body"
          :headings="card.headings"
          :shape="card.shape"
          class="border-flax-smoke-500/50 sticky border-t bg-[#0B0B0A]"
          :class="getStyle(index)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { animateSplitText } from '@/animations';
  import { textSplitterIntoChar } from '@/functions';
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { ServicesCard } from '..';

  const whatIDo = ref('My services /');

  const servicesCardProps = [
    {
      title: 'Frontend Engineering',
      body: 'I build pixel-perfect, highly performant interfaces using React, Next.js, and Vue.js. Every component is crafted with accessibility, responsiveness, and smooth animation in mind to deliver memorable user experiences.',
      headings: ['React & Next.js', 'Motion & Animations', 'Responsive Design'],
      shape: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z"/>
  </svg>`,
    },
    {
      title: 'Full-Stack Development',
      body: 'From database schema to REST APIs to polished UI, I build complete web applications end-to-end. I work with Node.js, Express, MongoDB, Firebase, and Supabase to deliver scalable, production-ready backends.',
      headings: ['Node.js & APIs', 'Database Design', 'Cloud Deployment'],
      shape: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="M127.14 200C99.9942 200 99.9943 167.423 72.8487 167.423C41.6048 167.423 0 158.386 0 127.133C0 99.9885 32.5678 99.9885 32.5678 72.8445C32.5678 41.6139 41.6048 0 72.8602 0C100.006 0 100.006 32.5774 127.151 32.5774C158.384 32.5774 200 41.6139 200 72.8675C200 100.012 167.421 100.012 167.421 127.156C167.409 158.444 158.384 200 127.14 200Z"/>
  </svg>`,
    },
    {
      title: 'AI-Powered Solutions',
      body: 'I integrate machine learning and AI into web products to create intelligent, adaptive experiences. From data analytics dashboards to AI-driven personalisation, I bridge the gap between cutting-edge AI research and practical product value.',
      headings: ['ML Integration', 'Data Analytics', 'Intelligent UX'],
      shape: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 0L170.711 29.2893L200 100L170.711 170.711L100 200L29.2893 170.711L0 100L29.2893 29.2893L100 0Z"/>
  </svg>`,
    },
    {
      title: 'Mobile Development',
      body: 'I craft cross-platform mobile applications with React Native that feel native on both iOS and Android. From smooth animations to offline-first architecture, I deliver mobile experiences that users love and businesses rely on.',
      headings: ['React Native', 'iOS & Android', 'Cross-Platform'],
      shape: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 0L200 50V150L100 200L0 150V50L100 0Z"/>
  </svg>`,
    },
    {
      title: 'Hardware Engineering',
      body: 'With hands-on experience in embedded systems and IoT, I design and prototype hardware solutions that bridge the physical and digital worlds. From circuit design to firmware, I bring a full-stack mindset to hardware engineering.',
      headings: ['Embedded Systems', 'IoT Prototyping', 'Circuit Design'],
      shape: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="M75 0H125V75H200V125H125V200H75V125H0V75H75V0Z"/>
  </svg>`,
    },
    {
      title: 'Networking',
      body: 'I design and manage network infrastructure, from local area networks to cloud architectures. With expertise in protocols, security, and performance tuning, I ensure your systems are robust, secure, and built to scale.',
      headings: ['Network Design', 'Cloud Architecture', 'Security & VPN'],
      shape: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 0C55.817 0 20 35.817 20 80C20 110 36 136 60 152V170H80V200H120V170H140V152C164 136 180 110 180 80C180 35.817 144.183 0 100 0Z"/>
  </svg>`,
    },
  ];

  onBeforeMount(() => {
    whatIDo.value = textSplitterIntoChar('What I do /', true);
  });

  onMounted(() => {
    animateSplitText('#what-i-do .letters', '#services-text', 0.7, 0.01, 0);
  });

  const getStyle = (index: number) => {
    const styles = [
      'top-[calc(8vh_+_0em)] mb-[24em]',
      'top-[calc(8vh_+_4em)] mb-[20em]',
      'top-[calc(8vh_+_8em)] mb-[16em]',
      'top-[calc(8vh_+_12em)] mb-[12em]',
      'top-[calc(8vh_+_16em)] mb-[8em]',
      'top-[calc(8vh_+_20em)] mb-[4em]',
    ];
    return styles[index] ?? '';
  };
</script>
