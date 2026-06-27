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
        <div class="relative w-full h-full flex items-center overflow-hidden">
          <div
            v-for="(exp, i) in experiences"
            :key="i"
            class="experience-card absolute left-[5%] right-[5%]"
          >
            <div
              class="w-full rounded-2xl border border-flax-smoke-200 bg-flax-smoke-50 overflow-hidden grid grid-cols-[1fr_2fr]"
              style="height: 68vh"
            >
              <!-- Left panel: number · logo · meta -->
              <div class="flex flex-col justify-between border-r border-flax-smoke-200 p-8 lg:p-10">
                <span class="font-mono text-flax-smoke-400 tracking-[0.35em] uppercase" style="font-size: 11px">
                  {{ (i + 1).toString().padStart(2, '0') }}
                </span>

                <!-- Logo — bigger and centered -->
                <div class="flex items-center justify-center py-4">
                  <img
                    :src="exp.logo"
                    :alt="exp.company"
                    class="w-full object-contain object-center mix-blend-multiply grayscale"
                    :class="exp.company === 'BUCC Development Team'
                      ? 'max-h-28 max-w-[15rem]'
                      : 'max-h-20 max-w-[13rem]'"
                  />
                </div>

                <div class="space-y-3">
                  <p class="text-flax-smoke-500 tracking-widest uppercase" style="font-size: 11px">{{ exp.period }}</p>
                  <span class="inline-block border border-flax-smoke-300 text-flax-smoke-500 rounded-full px-3 py-1 tracking-wide" style="font-size: 11px">
                    {{ exp.type }}
                  </span>
                </div>
              </div>

              <!-- Right panel: company · role · description · tags -->
              <div class="flex flex-col justify-between p-8 lg:p-10 xl:p-12">
                <div class="flex flex-col gap-4">
                  <p class="text-flax-smoke-400 tracking-[0.25em] uppercase" style="font-size: 11px">{{ exp.company }}</p>
                  <h3
                    class="font-title text-flax-smoke-900 font-bold leading-[1.05]"
                    style="font-size: clamp(1.5rem, 2.8vw, 2.4rem)"
                  >
                    {{ exp.role }}
                  </h3>
                  <ul class="space-y-1.5">
                    <li
                      v-for="(point, j) in exp.description"
                      :key="j"
                      class="text-flax-smoke-600 flex gap-2"
                      style="font-size: clamp(0.78rem, 1vw, 0.88rem); line-height: 1.6"
                    >
                      <span class="text-flax-smoke-400 mt-[3px] shrink-0">—</span>
                      <span>{{ point }}</span>
                    </li>
                  </ul>
                </div>

                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in exp.tags"
                    :key="tag"
                    class="border-flax-smoke-300 text-flax-smoke-600 bg-flax-smoke-100 rounded-full border px-3 py-1.5 tracking-wide"
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
      description: [
        'Building and deploying ML models that power real-time business intelligence and decision-support features across the KlarNow platform.',
        'Designing robust data pipelines and ETL workflows in Python to ensure clean, reliable inputs for model training and inference.',
        'Collaborating with product and engineering teams to ship AI-driven features that directly improve operational efficiency for clients.',
      ],
    },
    {
      role: 'Lead Software Engineer',
      company: 'Tekktopia',
      period: '2025',
      type: 'Full-Time',
      logo: logoTekktopia,
      tags: ['Leadership', 'Full-Stack', 'TypeScript', 'Architecture'],
      description: [
        'Led a cross-functional engineering team responsible for delivery across web and mobile, setting technical direction and reviewing all major system designs.',
        'Architected scalable, maintainable systems using TypeScript and modern full-stack frameworks, reducing time-to-feature across multiple product lines.',
        'Mentored junior and mid-level engineers through structured code reviews, pair programming, and weekly technical knowledge-sharing sessions.',
      ],
    },
    {
      role: 'Data Analyst & Software Engineer',
      company: 'Huawei',
      period: 'Jan 2025 — Aug 2025',
      type: 'Full-Time',
      logo: logoHuawei,
      tags: ['Data Analysis', 'Python', 'Software Engineering', 'Networking'],
      description: [
        'Analysed large-scale network performance datasets to surface anomalies and operational insights, informing infrastructure decisions across the Nigeria region.',
        'Built internal dashboards and automation tooling in Python that reduced manual reporting overhead for the infrastructure and operations team.',
        'Contributed to software development projects alongside networking duties, bridging the gap between systems engineering and application-level problem-solving.',
      ],
    },
    {
      role: 'Software & Systems Engineer',
      company: 'Worley Nigeria',
      period: '2023 — 2024',
      type: 'Contract',
      logo: logoWorley,
      tags: ['Embedded Systems', 'Python', 'SCADA', 'Hardware'],
      description: [
        'Developed and maintained SCADA and embedded systems for oil and gas infrastructure projects, ensuring reliable monitoring and control of critical assets.',
        'Wrote Python automation scripts that significantly reduced manual operational processes, improving uptime and accuracy across site systems.',
        'Worked closely with systems and process engineers to integrate hardware and software components in high-stakes industrial environments.',
      ],
    },
    {
      role: 'Software Developer',
      company: 'Delta Afrik Engineering',
      period: '2022 — 2023',
      type: 'Full-Time',
      logo: logoDeltaAfrik,
      tags: ['JavaScript', 'Web Development', 'Engineering'],
      description: [
        'Built web-based applications to support internal engineering workflows, project documentation, and inter-departmental reporting processes.',
        'Developed JavaScript tools to automate repetitive engineering documentation tasks, freeing up engineer time for higher-value activities.',
        'Contributed to the company\'s digital transformation efforts, modernising legacy processes with maintainable, well-structured web solutions.',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'BUCC Development Team',
      period: '2021 — 2022',
      type: 'Volunteer',
      logo: logoBucc,
      tags: ['React', 'TypeScript', 'UI/UX'],
      description: [
        'Built and maintained the BUCC developer community platform using React and TypeScript, serving as the central hub for events, resources, and team showcases.',
        'Led UI/UX improvements that increased platform accessibility and engagement among student developers across the university community.',
        'Collaborated with a remote volunteer team using agile practices, contributing to open-source tooling and helping onboard new contributors.',
      ],
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

    // 120% ensures cards are fully off-screen to the right
    // (cards are 90% wide so xPercent:100 leaves a 5% sliver visible)
    gsap.set(cards.slice(1), { xPercent: 120 });

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
          gsap.set(card, { xPercent: (1 - cardP) * 120 });
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
