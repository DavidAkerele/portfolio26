<template>
  <section id="experience" class="padding-x mb-20">
    <!-- Header -->
    <div class="flex w-full flex-col">
      <h3
        id="experience-heading"
        v-html="headingHtml"
        class="heading-1 font-extrabold uppercase"
      ></h3>
      <div
        id="experience-subtext"
        class="md:column-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
      >
        <p
          class="heading-6 text-flax-smoke-300/85 col-span-4 col-start-0 text-center text-nowrap md:col-start-4"
        >
          ( WORK HISTORY )
        </p>
        <p
          class="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold md:col-span-5"
        >
          Technical roles across software engineering, hardware, infrastructure,
          and digital innovation.
        </p>
      </div>
    </div>

    <!-- Experience list -->
    <div class="relative mt-12 w-full lg:mt-[10%]">
      <div
        v-for="(exp, i) in experiences"
        :key="i"
        class="experience-row border-flax-smoke-500/50 grid grid-cols-12 items-center gap-x-4 border-t py-7 lg:gap-x-8"
      >
        <!-- Number -->
        <span
          class="heading-6 text-flax-smoke-500 col-span-1 hidden font-mono md:block"
        >
          {{ (i + 1).toString().padStart(2, '0') }}
        </span>

        <!-- Logo -->
        <div
          class="col-span-3 flex items-center md:col-span-2"
        >
          <img
            :src="exp.logo"
            :alt="exp.company"
            class="max-h-8 w-full max-w-[9rem] object-contain object-left mix-blend-screen brightness-200 contrast-200 grayscale"
          />
        </div>

        <!-- Role + Company + Tags -->
        <div class="col-span-6 md:col-span-7">
          <h3
            class="heading-3 font-title! font-bold leading-tight text-flax-smoke-50"
          >
            {{ exp.role }}
          </h3>
          <p class="heading-6 text-flax-smoke-400 mt-0.5">
            {{ exp.company }}
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="tag in exp.tags"
              :key="tag"
              class="border-flax-smoke-700 text-flax-smoke-500 rounded-full border px-3 py-0.5 text-xs"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Period -->
        <div class="col-span-3 col-start-10 text-right md:col-span-2 md:col-start-11">
          <p class="heading-6 text-flax-smoke-400 font-mono text-sm">
            {{ exp.period }}
          </p>
          <p class="text-flax-smoke-600 mt-1 text-xs uppercase">
            {{ exp.type }}
          </p>
        </div>
      </div>

      <!-- closing border -->
      <div class="border-flax-smoke-500/50 border-t"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { animateSplitText } from '@/animations';
  import { textSplitterIntoChar } from '@/functions';
  import { onBeforeMount, onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import {
    logoWorley,
    logoHuawei,
    logoTekktopia,
    logoKlarnow,
    logoDeltaAfrik,
    logoBucc,
  } from '@/assets/images';

  gsap.registerPlugin(ScrollTrigger);

  const headingHtml = ref('Experience /');

  onBeforeMount(() => {
    headingHtml.value = textSplitterIntoChar('Experience /', true);
  });

  onMounted(() => {
    animateSplitText(
      '#experience-heading .letters',
      '#experience-subtext',
      0.7,
      0.01,
      0,
    );

    gsap.utils.toArray('.experience-row').forEach((row: any, i) => {
      gsap.from(row, {
        scrollTrigger: {
          trigger: row,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.05,
        ease: 'power3.out',
      });
    });
  });

  const experiences = [
    {
      role: 'Software Engineer',
      company: 'Klarnow',
      period: '2024 — Present',
      type: 'Full-Time',
      logo: logoKlarnow,
      tags: ['React', 'Node.js', 'TypeScript', 'REST APIs'],
    },
    {
      role: 'Full-Stack Developer',
      company: 'Tekktopia',
      period: '2023 — 2024',
      type: 'Contract',
      logo: logoTekktopia,
      tags: ['Vue.js', 'Next.js', 'Python', 'Cloud'],
    },
    {
      role: 'Frontend Developer',
      company: 'BUCC Development Team',
      period: '2022 — 2023',
      type: 'Volunteer',
      logo: logoBucc,
      tags: ['React', 'TypeScript', 'UI/UX', 'GSAP'],
    },
    {
      role: 'ICT & Network Engineer',
      company: 'Huawei',
      period: '2021 — 2022',
      type: 'Internship',
      logo: logoHuawei,
      tags: ['Networking', 'Infrastructure', 'LTE', 'Routing'],
    },
    {
      role: 'Software & Systems Engineer',
      company: 'Worley Nigeria',
      period: '2020 — 2021',
      type: 'Contract',
      logo: logoWorley,
      tags: ['Embedded Systems', 'Python', 'SCADA', 'Hardware'],
    },
    {
      role: 'Junior Software Developer',
      company: 'Delta Afrik Engineering',
      period: '2019 — 2020',
      type: 'Full-Time',
      logo: logoDeltaAfrik,
      tags: ['JavaScript', 'Web Dev', 'AutoCAD', 'Engineering'],
    },
  ];
</script>
