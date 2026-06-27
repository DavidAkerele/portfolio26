<template>
  <section id="works" class="common-padding mb-20">
    <div class="flex flex-col">
      <h3
        id="selectedWorks"
        v-html="selectedWorks"
        class="heading-1 text-start leading-none font-bold uppercase"
      ></h3>
      <p
        class="heading-1 text-flax-smoke-400 text-opacity-50 hidden w-4/5 text-end font-extrabold sm:block"
      >
        ( {{ selectedWorksProps.length }} )
      </p>

      <div
        id="selected-works-text"
        class="md:column-gap text-flax-smoke-300 mt-[5%] grid grid-cols-12 justify-end opacity-0 lg:grid"
      >
        <p
          class="heading-6 text-flax-smoke-300/85 col-span-4 text-center text-nowrap lg:col-start-2"
        >
          (
          <span class="inline sm:hidden">{{ selectedWorksProps.length }} </span>
          PROJECTS )
        </p>
        <p
          class="heading-4 font-fancy col-span-8 w-full text-balance sm:font-semibold lg:col-span-7"
        >
          Featured client projects that have been meticulously crafted with
          passion and purpose over the years.
        </p>
      </div>
    </div>

    <div
      class="sm:column-gap relative mt-12 grid size-full grid-cols-12 lg:mt-[10%]"
    >
      <div
        class="text-flax-smoke-100 sticky top-12 col-span-5 hidden h-fit w-full overflow-hidden text-[22vw] leading-[0.8] font-semibold md:flex"
      >
        <span class="font-title! relative -tracking-wider">0</span>
        <span
          id="index"
          class="font-title! relative -tracking-wider will-change-transform"
          >{{ index + 1 }}.</span
        >
      </div>
      <aside
        @mouseenter="showCursor"
        @mouseleave="hideCursor"
        class="relative col-span-full flex flex-col space-y-14 md:col-span-7"
      >
        <div
          v-for="(work, i) in selectedWorksProps"
          :key="i"
          class="work-card group @container"
        >
          <!-- Full-width landscape screenshot -->
          <div class="relative w-full overflow-clip rounded-lg" style="aspect-ratio: 16/10">
            <img
              :src="work.screenshot"
              :alt="work.name"
              loading="lazy"
              class="h-full w-full object-cover object-top transition-all duration-700 ease-in-out group-hover:scale-105 md:grayscale md:brightness-75 md:group-hover:grayscale-0 md:group-hover:brightness-100"
            />
          </div>

          <!-- Meta & links -->
          <div class="mt-4">
            <p class="heading-6 font-title! mb-[1%] leading-none">
              {{ work.category }}
            </p>
            <div class="items-center justify-between sm:flex">
              <h3 class="heading-3 font-title! font-bold uppercase">
                {{ work.name }}
              </h3>
              <div class="flex gap-1.5 select-none">
                <p
                  class="border-flax-smoke-300 hover:bg-flax-smoke-300 hover:text-flax-smoke-900 rounded-full border px-4 py-2 transition-[background-color,color] duration-500 ease-in-out"
                  v-for="tag in work.tags"
                  :key="tag"
                >
                  <span>{{ tag }}</span>
                </p>
                <p
                  class="border-flax-smoke-300 bg-flax-smoke-300 text-flax-smoke-900 hover:text-flax-smoke-300 rounded-full border px-4 py-2 transition-[background-color,color] duration-500 ease-in-out hover:bg-transparent"
                >
                  <span>{{ work.year }}</span>
                </p>
              </div>
            </div>

            <!-- Two action links -->
            <div class="mt-5 flex gap-3">
              <a
                v-if="work.url"
                :href="work.url"
                target="_blank"
                rel="noopener"
                class="border-flax-smoke-300 hover:bg-flax-smoke-300 hover:text-flax-smoke-900 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ease-in-out"
              >
                View Live ↗
              </a>
              <button
                @click="selectedProject = work"
                class="border-flax-smoke-300 bg-flax-smoke-300 text-flax-smoke-900 hover:bg-transparent hover:text-flax-smoke-300 rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ease-in-out"
              >
                Case Study →
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>

  <ProjectOverlay :project="selectedProject" @close="selectedProject = null" />
</template>

<script setup lang="ts">
  import { animateSplitText } from '@/animations';
  import { textSplitterIntoChar } from '@/functions';
  import { computed, onBeforeMount, onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import { useWindowSize } from '@vueuse/core';
  import {
    workSportingLagos,
    workOnePortal,
    workTreasureTrove,
    workDynastyAfrica,
    workWholePurple,
  } from '@/assets/images';
  import { ProjectOverlay } from '@/components/design';

  interface WorkItem {
    name: string;
    category: string;
    tags: string[];
    screenshot: string;
    url: string;
    year: string;
    description: string;
    challenge: string;
    solution: string;
    tech: string[];
  }

  const isSmallScreen = computed(() => {
    return useWindowSize().width.value < 768;
  });
  const index = ref(0);
  const selectedWorks = ref('Selected Projects /');
  const selectedProject = ref<WorkItem | null>(null);

  const tl = gsap
    .timeline({ defaults: { duration: 0.25 } })
    .to(['#cursor', '#inner'], {
      scale: 1,
      opacity: 1,
    })
    .paused(true);

  const showCursor = () => {
    tl.play();
  };
  const hideCursor = () => {
    tl.reverse();
  };

  const selectedWorksProps: WorkItem[] = [
    {
      name: 'Sporting Lagos FC',
      category: 'Frontend & Sports',
      tags: ['Web Design', 'React', 'Sports'],
      screenshot: workSportingLagos,
      url: 'https://sportinglagos.com',
      year: '2024',
      description:
        "A fast, modern digital home for one of Lagos's most exciting football clubs — built to showcase the squad, publish match results and news, and grow the club's online fanbase.",
      challenge:
        'The club lacked a credible online presence that could keep pace with match-day energy. Content needed to be updated quickly by non-technical staff, and the site had to perform on the low-bandwidth connections common across Nigeria.',
      solution:
        "Built a React-powered website with a lightweight CMS integration, aggressive image optimisation, and lazy loading. The design mirrors the club's bold identity with dynamic layouts and match statistics pulled in real time. Page loads under 2 seconds on 3G.",
      tech: ['React', 'JavaScript', 'CSS Modules', 'REST API', 'Vercel'],
    },
    {
      name: 'OnePortal Estates',
      category: 'Frontend & Real Estate',
      tags: ['Next.js', 'TypeScript', 'Real Estate'],
      screenshot: workOnePortal,
      url: 'https://oneportalestates.com',
      year: '2024',
      description:
        'A luxury real estate portal for high-value properties across Ikoyi, Victoria Island, and Banana Island — designed to reflect the exclusivity of the listings and convert serious buyers.',
      challenge:
        "Luxury real estate buyers expect a premium digital experience that matches the calibre of the properties. The existing platform felt generic and failed to communicate the brand's prestige or surface listings effectively.",
      solution:
        'Crafted a Next.js portal with cinematic hero imagery, an advanced property search and filter system, and TypeScript-typed listing data. Bespoke micro-interactions and smooth page transitions deliver the high-end feel that high-net-worth buyers expect.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    },
    {
      name: 'Dynasty Africa',
      category: 'Frontend & Creative Agency',
      tags: ['React', 'Branding', 'Marketing'],
      screenshot: workDynastyAfrica,
      url: 'https://www.dynastyafrica.com/',
      year: '2024',
      description:
        "A bold, high-impact marketing agency website for Dynasty Africa — a creative powerhouse helping brands and talent across the continent do powerful, purposeful marketing.",
      challenge:
        'The agency needed a digital presence as powerful as their work. Their previous site failed to communicate their edge, lacked the visual boldness of their campaigns, and did not convert prospective clients effectively.',
      solution:
        'Designed and built a React website centred around strong typographic statements and high-contrast visuals, with scroll-driven animations that mirror the kinetic energy of great campaigns. The result is a site that instantly communicates authority and creative confidence.',
      tech: ['React', 'GSAP', 'CSS Animations', 'JavaScript', 'Netlify'],
    },
    {
      name: 'Treasure Trove Sewing',
      category: 'E-Commerce & Retail',
      tags: ['Vue.js', 'Tailwind', 'E-Commerce'],
      screenshot: workTreasureTrove,
      url: 'https://www.treasuretrovesewingmachines.com/',
      year: '2024',
      description:
        'An e-commerce platform for a UK-based sewing machine specialist — covering new machine sales, repair bookings, and a nationwide postal service for Brother, Juki, and Janome products.',
      challenge:
        'The business was running on a slow, outdated website that made browsing machines and booking repairs cumbersome. Customers on mobile had a particularly poor experience, and the repair booking process was entirely manual via phone.',
      solution:
        'Rebuilt the storefront in Vue.js with Tailwind CSS, creating a clean product catalogue with filters by brand and type, an online repair booking form, and a polished mobile-first layout. Page speed scores improved significantly and phone enquiries for bookings dropped as the online system took over.',
      tech: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'Netlify'],
    },
    {
      name: 'Whole Purple',
      category: 'Full-Stack & E-Commerce',
      tags: ['Next.js', 'TypeScript', 'Prisma'],
      screenshot: workWholePurple,
      url: 'https://wholepurple.vercel.app/',
      year: '2025',
      description:
        'A premium full-stack e-commerce ecosystem for ethically sourced fresh produce, marinated proteins, and organic pantry essentials — built with a cinematic storefront and a powerful operational backbone.',
      challenge:
        'The client needed a single platform to serve multiple user roles — Clients, Shop Managers, and Admins — each with distinct permissions, alongside a complex product catalogue, real-time inventory, and seamless order fulfilment workflows.',
      solution:
        'Designed a robust role-based access system with Prisma and Supabase, built a high-fidelity Next.js storefront with TypeScript, and delivered a suite of executive dashboards giving managers live inventory health, fulfilment velocity charts, and cross-platform performance analytics. Stripe powers a smooth, conversion-optimised checkout.',
      tech: ['Next.js 15', 'TypeScript', 'Prisma', 'Supabase', 'Tailwind CSS', 'Stripe'],
    },
  ];

  // Reusable function to handle forward scroll animation
  const createForwardTimeline = (
    index: any,
    i: any,
    selectedWorksProps: any[],
  ) => {
    const tl = gsap.timeline({
      defaults: { duration: 0.3 },
    });

    // Set and move the #index element
    tl.set('#index', {
      yPercent: 100,
      onComplete: () => {
        index.value = Math.min(i, selectedWorksProps.length - 1);
      },
    }).to('#index', {
      yPercent: 0,
      ease: 'power1.inOut',
    });

    return tl;
  };

  // Reusable function to handle backward scroll animation
  const createBackwardTimeline = (index: any, i: any) => {
    const tl = gsap.timeline({ defaults: { duration: 0.3 } });

    // Set and move the #index element
    tl.set('#index', {
      yPercent: -100,
      onComplete: () => {
        index.value = Math.max(i, 0);
      },
    }).to('#index', {
      yPercent: 0,
      duration: 0.3,
      ease: 'power1.inOut',
    });

    return tl;
  };

  onBeforeMount(() => {
    selectedWorks.value = textSplitterIntoChar('Selected Works / ', true);
  });

  onMounted(() => {
    animateSplitText(
      '#selectedWorks .letters',
      '#selected-works-text',
      0.7,
      0.01,
      0,
    );

    // Apply GSAP animations to each div
    if (!isSmallScreen.value)
      gsap.utils.toArray('.work-card').forEach((div: any, i: any) => {
        gsap.timeline({ defaults: { duration: 0.7 } }).to(div, {
          scrollTrigger: {
            trigger: div,
            // start: 'top 40%',
            start: 'top 25%',
            // end: 'bottom 40%',
            end: 'bottom 25%',
            scrub: 0.01,
            // markers: true,
            onLeaveBack: () => {
              // Backward scroll animation
              if (index.value !== 0) {
                gsap.to('#index', {
                  yPercent: 100,
                  duration: 0.3,
                  ease: 'power4.inOut',
                  onComplete: () => {
                    createBackwardTimeline(index, i - 1);
                  },
                });
              }
            },
          },
          ease: 'power1.inOut',
          onComplete: () => {
            // Forward scroll animation
            if (index.value !== selectedWorksProps.length - 1) {
              gsap.to('#index', {
                yPercent: -100,
                duration: 0.3,
                ease: 'power4.inOut',
                onComplete: () => {
                  createForwardTimeline(index, i + 1, selectedWorksProps);
                },
              });
            }
          },
        });
      });
  });
</script>
