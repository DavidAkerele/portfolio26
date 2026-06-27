<template>
  <section id="experience" class="mb-20">
    <!-- Header -->
    <div class="padding-x flex w-full flex-col">
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

    <!-- Mobile: vertical list -->
    <div class="padding-x mt-10 md:hidden">
      <div
        v-for="(exp, i) in experiences"
        :key="i"
        class="border-flax-smoke-800/50 border-t py-6"
      >
        <div class="mb-3 flex items-center justify-between">
          <img
            :src="exp.logo"
            :alt="exp.company"
            class="h-6 max-w-[7rem] object-contain object-left mix-blend-screen brightness-200 contrast-200 grayscale"
          />
          <span class="font-mono text-flax-smoke-600 text-xs">{{ (i + 1).toString().padStart(2, '0') }}</span>
        </div>
        <p class="text-flax-smoke-100 font-semibold">{{ exp.role }}</p>
        <p class="text-flax-smoke-400 mt-1 text-sm">{{ exp.company }} · {{ exp.period }}</p>
        <div class="mt-3 flex flex-wrap gap-1.5">
          <span
            v-for="tag in exp.tags"
            :key="tag"
            class="border-flax-smoke-800 text-flax-smoke-500 rounded-full border px-2.5 py-0.5 text-xs"
          >{{ tag }}</span>
        </div>
      </div>
      <div class="border-flax-smoke-800/50 border-t"></div>
    </div>

    <!-- Desktop: stacked horizontal scroll cards -->
    <div
      ref="triggerEl"
      :style="`height: ${experiences.length * 85}vh`"
      class="mt-10 hidden md:block"
    >
      <div
        ref="stickyEl"
        class="sticky top-0 h-screen overflow-hidden flex items-center"
      >
        <!-- Counter top-right -->
        <div class="absolute top-6 right-[5%] z-20 font-mono text-xs text-flax-smoke-400 tracking-widest">
          <span ref="counterEl">01</span>
          <span class="text-flax-smoke-700"> / {{ experiences.length.toString().padStart(2, '0') }}</span>
        </div>

        <!-- Progress bar bottom -->
        <div class="absolute bottom-6 left-[5%] right-[5%] z-20 h-px bg-flax-smoke-800">
          <div
            ref="progressBarEl"
            class="h-full bg-flax-smoke-400 origin-left"
            style="transform: scaleX(0)"
          ></div>
        </div>

        <!-- Stacked cards -->
        <div class="relative w-full h-full flex items-center">
          <div
            v-for="(exp, i) in experiences"
            :key="i"
            class="experience-card absolute left-[5%] right-[5%]"
          >
            <div
              class="w-full rounded-2xl border border-flax-smoke-800/40 bg-[#111110] overflow-hidden grid grid-cols-[1fr_2fr]"
              style="height: 65vh"
            >
              <!-- Left panel: number · logo · meta -->
              <div class="flex flex-col justify-between border-r border-flax-smoke-800/40 p-8 lg:p-10">
                <span class="font-mono text-flax-smoke-600 tracking-[0.35em] uppercase" style="font-size: 11px">
                  {{ (i + 1).toString().padStart(2, '0') }}
                </span>
                <img
                  :src="exp.logo"
                  :alt="exp.company"
                  class="max-h-8 w-auto max-w-[9rem] object-contain object-left mix-blend-screen brightness-200 contrast-200 grayscale"
                />
                <div class="space-y-2.5">
                  <p class="text-flax-smoke-400 tracking-widest uppercase" style="font-size: 11px">{{ exp.period }}</p>
                  <span class="inline-block border border-flax-smoke-700/60 text-flax-smoke-500 rounded-full px-3 py-1 tracking-wide" style="font-size: 11px">
                    {{ exp.type }}
                  </span>
                </div>
              </div>

              <!-- Right panel: company · role · tags -->
              <div class="flex flex-col justify-between p-8 lg:p-10 xl:p-14">
                <div>
                  <p class="text-flax-smoke-500 tracking-[0.25em] uppercase mb-5" style="font-size: 11px">{{ exp.company }}</p>
                  <h3
                    class="font-title text-flax-smoke-50 font-bold leading-[1.05]"
                    style="font-size: clamp(1.6rem, 3.2vw, 2.8rem)"
                  >
                    {{ exp.role }}
                  </h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in exp.tags"
                    :key="tag"
                    class="border-flax-smoke-800/80 text-flax-smoke-400 rounded-full border px-3 py-1.5 tracking-wide"
                    style="font-size: 11px"
                  >{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

  const triggerEl = ref<HTMLElement | null>(null);
  const counterEl = ref<HTMLElement | null>(null);
  const progressBarEl = ref<HTMLElement | null>(null);

  const headingHtml = ref('Experience /');

  onBeforeMount(() => {
    headingHtml.value = textSplitterIntoChar('Experience /', true);
  });

  const experiences = [
    {
      role: 'Machine Learning Engineer',
      company: 'KlarNow',
      period: 'Jan 2026 — Present',
      type: 'Full-Time',
      logo: logoKlarnow,
      tags: ['Machine Learning', 'Python', 'AI', 'Data Pipelines'],
    },
    {
      role: 'Lead Software Engineer',
      company: 'Tekktopia',
      period: '2025',
      type: 'Full-Time',
      logo: logoTekktopia,
      tags: ['Leadership', 'Full-Stack', 'TypeScript', 'Architecture'],
    },
    {
      role: 'Data Analyst & Software Engineer',
      company: 'Huawei',
      period: 'Jan 2025 — Aug 2025',
      type: 'Full-Time',
      logo: logoHuawei,
      tags: ['Data Analysis', 'Python', 'Software Engineering', 'Networking'],
    },
    {
      role: 'Software & Systems Engineer',
      company: 'Worley Nigeria',
      period: '2023 — 2024',
      type: 'Contract',
      logo: logoWorley,
      tags: ['Embedded Systems', 'Python', 'SCADA', 'Hardware'],
    },
    {
      role: 'Software Developer',
      company: 'Delta Afrik Engineering',
      period: '2022 — 2023',
      type: 'Full-Time',
      logo: logoDeltaAfrik,
      tags: ['JavaScript', 'Web Development', 'Engineering'],
    },
    {
      role: 'Frontend Developer',
      company: 'BUCC Development Team',
      period: '2021 — 2022',
      type: 'Volunteer',
      logo: logoBucc,
      tags: ['React', 'TypeScript', 'UI/UX'],
    },
  ];

  onMounted(() => {
    animateSplitText(
      '#experience-heading .letters',
      '#experience-subtext',
      0.7,
      0.01,
      0,
    );

    if (!triggerEl.value || window.innerWidth < 768) return;

    const cards = Array.from(
      document.querySelectorAll('.experience-card'),
    ) as HTMLElement[];
    const n = cards.length;

    // All cards except first start off-screen to the right
    gsap.set(cards.slice(1), { xPercent: 100 });

    ScrollTrigger.create({
      trigger: triggerEl.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        const p = self.progress;
        const step = p * (n - 1);

        cards.forEach((card, i) => {
          if (i === 0) return;
          const cardP = Math.max(0, Math.min(1, step - (i - 1)));
          gsap.set(card, { xPercent: (1 - cardP) * 100 });
        });

        if (progressBarEl.value) {
          gsap.set(progressBarEl.value, { scaleX: p });
        }

        const activeCard = Math.min(n - 1, Math.round(step));
        if (counterEl.value) {
          counterEl.value.textContent = (activeCard + 1)
            .toString()
            .padStart(2, '0');
        }
      },
    });
  });
</script>
