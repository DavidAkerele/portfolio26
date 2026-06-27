<template>
  <div
    id="slider"
    class="column-gap relative mt-[10%] grid w-full grid-cols-12 gap-2 max-md:min-h-svh lg:h-[85svh]"
  >
    <!-- For larger devices, show one person at a time with index -->
    <template v-if="!isSmallScreen">
      <div
        class="columns-gap relative col-span-full flex flex-col max-lg:h-fit lg:col-span-6 lg:h-full"
      >
        <div>
          <p
            id="quote-text"
            class="heading-3 mb-14 min-h-36 max-w-[30ch] font-semibold md:min-h-fit md:max-w-full md:leading-none lg:min-h-36 lg:max-w-[30ch] lg:leading-normal"
            v-html="computedQuote"
          ></p>
          <div id="quote-author" class="heading-6 mb-6 font-semibold">
            <p>{{ people[index].author }}</p>
            <p class="text-flax-smoke-400">{{ people[index].position }}</p>
          </div>
          <div id="quote-tags" class="flex gap-3">
            <p
              class="border-flax-smoke-500 text-flax-smoke-600 rounded-full border px-3 uppercase"
              v-for="i in people[index].tags"
              :key="i"
            >
              {{ i }}
            </p>
          </div>
        </div>

        <div class="relative flex h-full items-end justify-between">
          <div class="heading-5 flex w-2/12 items-center gap-3 overflow-clip">
            <p
              id="current-index"
              class="-translate-y-full will-change-transform"
            >
              {{ index + 1 }}
            </p>
            <p class="h-0.5 w-full bg-black"></p>
            <p>{{ people.length }}</p>
          </div>
          <div
            class="lg:absolute lg:inset-0 lg:-bottom-10 lg:w-full lg:will-change-scroll"
          >
            <div
              class="sticky top-[90%] flex place-content-end gap-3 lg:will-change-scroll"
            >
              <Button label="Prev" @click="clickPrev" />
              <Button label="Next" @click="clickNext" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="columns-gap relative order-first col-span-full flex h-[60vh] w-full items-start justify-center overflow-clip max-sm:order-last lg:order-last lg:col-span-6 lg:h-full"
      >
        <template v-for="(p, i) in people" :key="i">
          <img
            :class="{ hidden: index !== i, invert: p.invert }"
            class="relative z-10 size-full rounded-lg object-contain object-center grayscale lg:h-[85svh] p-12 lg:p-20"
            :src="p.profile"
            alt=""
          />
        </template>
        <div
          id="quote-overlay"
          class="bg-flax-smoke-500 absolute inset-0 z-50 rounded-lg"
        ></div>
      </div>
    </template>

    <!-- For smaller devices, show all people at once -->
    <template v-else>
      <div class="col-span-full">
        <template v-for="(p, i) in people" :key="i">
          <div class="mt-10 grid w-full grid-cols-5 items-start sm:grid-cols-4">
            <div
              class="columns-gap heading-2 relative col-span-1 flex h-full flex-col leading-none font-bold"
            >
              {{ (i + 1).toString().padStart(2, '0') }}
            </div>
            <div class="col-span-3">
              <div class="columns-gap flex w-full flex-col gap-y-4">
                <img
                  :class="{ invert: p.invert }"
                  class="aspect-square size-full rounded-md object-contain object-center grayscale p-6"
                  :src="p.profile"
                  alt=""
                />

                <p
                  class="heading-4 mt-4 max-w-[25ch] leading-none font-semibold"
                >
                  " {{ p.quote }} "
                </p>

                <div class="heading-6 mt-4 font-semibold">
                  <p class="">{{ p.author }}</p>
                  <p class="text-flax-smoke-400">
                    {{ p.position }}
                  </p>
                </div>

                <div
                  class="flex max-w-60 flex-wrap gap-3 leading-[200%] uppercase"
                >
                  <p
                    class="border-flax-smoke-500 text-flax-smoke-600 rounded-full border px-3 text-nowrap uppercase"
                    v-for="i in p.tags"
                    :key="i"
                  >
                    {{ i }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { logoSportingLagos, logoDynastyAfrica, logoOnePortal, logoWholePurple } from '@/assets/images';
  import { Button } from '../common';
  import { computed, onMounted, ref } from 'vue';
  import { useWindowSize } from '@vueuse/core';
  import { textSplitterIntoChar } from '@/functions';
  import gsap from 'gsap';

  const { width } = useWindowSize();
  const isSmallScreen = computed(() => width.value < 640);
  const computedQuote = computed(() => {
    return textSplitterIntoChar(`" ${people[index.value].quote} "`);
  });

  const canClick = ref(true);

  const animateTextTransition = (direction: 'up' | 'zero') => {
    const translateY = direction === 'up' ? '-100%' : '0%';
    gsap.to('#quote-text .letters', {
      translateY,
      duration: 0.5,
      stagger: 0.001,
      ease: 'power1.inOut',
    });
  };

  const animateQuoteAuthorTransition = (
    direction: 'left' | 'right',
    onCompleteFunc?: () => void,
  ) => {
    const translateX = direction === 'left' ? '-50%' : '0%';
    const opacity = direction === 'left' ? 0 : 1;
    gsap.to(['#quote-author', '#quote-tags'], {
      translateX,
      opacity,
      duration: 0.5,
      ease: 'power1.inOut',
      onComplete: () => {
        if (onCompleteFunc) onCompleteFunc();
      },
    });
  };

  const animateCurrentQuoteIndex = (
    direction: 'up' | 'zero',
    onCompleteFunc?: () => void,
  ) => {
    const translateY = direction === 'up' ? '-100%' : '0%';
    gsap.to(['#current-index'], {
      translateY,
      duration: 0.5,
      ease: 'power1.inOut',
      onComplete: () => {
        if (onCompleteFunc) onCompleteFunc();
      },
    });
  };

  const animateQuoteOverlay = (
    newIndex: number,
    onCompleteFunc?: () => void,
  ) => {
    // const translateY = direction === 'up' ? '100%' : '-100%';
    gsap.to('#quote-overlay', {
      translateY: '0%',
      duration: 0.7,
      ease: 'power4.inOut',
      onComplete: () => {
        index.value = newIndex;
        if (onCompleteFunc) onCompleteFunc();

        gsap.to('#quote-overlay', {
          translateY: '-100%',
          duration: 0.7,
          ease: 'power4.inOut',
          onComplete: () => {
            gsap.set('#quote-overlay', { translateY: '100%' });

            canClick.value = true;
          },
        });
      },
    });
  };

  // Function to trigger the quote change
  const changeQuote = (newIndex: number) => {
    animateTextTransition('up');
    animateQuoteAuthorTransition('left');
    animateQuoteOverlay(newIndex, () => {
      setTimeout(() => {
        animateTextTransition('zero');
      }, 25);
      animateCurrentQuoteIndex('zero');
      animateQuoteAuthorTransition('right');
    });
    animateCurrentQuoteIndex('up', () => {
      gsap.set(['#current-index'], {
        y: '100%',
      });
    });
  };

  // Event handlers for next and previous clicks
  const clickNext = () => {
    if (!canClick.value) return;

    canClick.value = false;
    let newIndex = (index.value + 1) % people.length;
    if (newIndex < people.length) changeQuote(newIndex);
  };

  const clickPrev = () => {
    if (!canClick.value) return;

    canClick.value = false;
    const newIndex = (index.value - 1 + people.length) % people.length;
    changeQuote(newIndex);
  };

  onMounted(() => {
    if (!isSmallScreen.value) {
      gsap.set(['#quote-text .letters', '#current-index'], {
        translateY: 0,
      });
      gsap.set('#quote-overlay', {
        translateY: '100%',
      });
    }
  });

  // data
  const index = ref(0);
  const people = [
    {
      quote:
        "David brought our club's vision to life with a clean, fast, and professional website. His attention to detail and ability to translate our brand into a digital experience exceeded all expectations.",
      author: 'Sporting Lagos FC',
      position: 'Football Club, Lagos Nigeria',
      tags: ['Web Design', 'React', 'Sports'],
      profile: logoSportingLagos,
      invert: true,
    },
    {
      quote:
        "Working with David on the Dynasty Africa platform was outstanding. He delivered a polished, high-performance site that perfectly captures our brand identity and impressed our clients from day one.",
      author: 'Dynasty Africa',
      position: 'Creative & Marketing Agency',
      tags: ['Frontend', 'Branding', 'Performance'],
      profile: logoDynastyAfrica,
      invert: true,
    },
    {
      quote:
        "David delivered our property portal ahead of schedule. The luxury feel, seamless search experience, and mobile performance were exactly what we needed to stand out in Lagos's premium real estate market.",
      author: 'OnePortal Estates',
      position: 'Luxury Real Estate, Lagos Nigeria',
      tags: ['Next.js', 'TypeScript', 'Real Estate'],
      profile: logoOnePortal,
      invert: false,
    },
    {
      quote:
        "The Whole Purple platform David built for us is a game-changer. The storefront is beautiful, the admin dashboards are incredibly powerful, and the checkout experience has dramatically improved our conversion rate.",
      author: 'Whole Purple',
      position: 'Organic Food E-Commerce',
      tags: ['Full-Stack', 'Next.js', 'Prisma'],
      profile: logoWholePurple,
      invert: false,
    },
  ];
</script>
