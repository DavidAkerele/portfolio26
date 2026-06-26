<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div
        v-if="project"
        class="fixed inset-0 z-[9998] overflow-y-auto bg-[#0d0d0c]"
      >
        <!-- Sticky header -->
        <div
          class="padding-x sticky top-0 z-10 flex items-center justify-between border-b border-flax-smoke-800/40 bg-[#0d0d0c]/90 py-5 backdrop-blur-md"
        >
          <button
            @click="$emit('close')"
            class="font-fancy group flex items-center gap-3 text-flax-smoke-400 transition-colors duration-300 hover:text-flax-smoke-50"
          >
            <span class="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Back to Projects
          </button>
          <a
            :href="project.url"
            target="_blank"
            rel="noopener"
            class="border-flax-smoke-300 bg-flax-smoke-50 text-flax-smoke-900 hover:bg-transparent hover:text-flax-smoke-50 rounded-full border px-6 py-2 text-sm font-semibold transition-all duration-300 ease-in-out"
          >
            View Live ↗
          </a>
        </div>

        <!-- Hero screenshot -->
        <div class="w-full overflow-hidden">
          <img
            :src="project.screenshot"
            :alt="project.name"
            class="h-[55vh] w-full object-cover object-top"
          />
        </div>

        <!-- Content -->
        <div class="common-padding pb-[10%]">
          <div class="md:column-gap mt-14 grid grid-cols-12">
            <!-- Left: meta -->
            <div class="col-span-full mb-10 md:col-span-4 md:mb-0">
              <h1
                class="heading-2 font-title! font-extrabold uppercase leading-none text-flax-smoke-50"
              >
                {{ project.name }}
              </h1>
              <p class="heading-6 mt-3 font-bold uppercase text-flax-smoke-400">
                {{ project.category }}
              </p>
              <p class="heading-6 text-flax-smoke-500">{{ project.year }}</p>

              <div class="mt-8 flex flex-wrap gap-2">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="border-flax-smoke-600 text-flax-smoke-300 rounded-full border px-4 py-1 text-sm"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Right: content -->
            <div
              class="col-span-full space-y-10 md:col-span-7 md:col-start-6"
            >
              <p
                class="heading-4 font-medium leading-snug text-flax-smoke-100"
              >
                {{ project.description }}
              </p>

              <div>
                <p
                  class="heading-6 mb-4 font-bold uppercase tracking-widest text-flax-smoke-500"
                >
                  The Challenge
                </p>
                <p
                  class="font-fancy text-balance leading-relaxed text-flax-smoke-300"
                >
                  {{ project.challenge }}
                </p>
              </div>

              <div>
                <p
                  class="heading-6 mb-4 font-bold uppercase tracking-widest text-flax-smoke-500"
                >
                  The Solution
                </p>
                <p
                  class="font-fancy text-balance leading-relaxed text-flax-smoke-300"
                >
                  {{ project.solution }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  defineProps<{
    project: {
      name: string;
      category: string;
      year: string;
      url: string;
      screenshot: string;
      description: string;
      challenge: string;
      solution: string;
      tech: string[];
    } | null;
  }>();

  defineEmits<{ close: [] }>();
</script>

<style scoped>
  .overlay-enter-active,
  .overlay-leave-active {
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1),
      opacity 0.4s ease;
  }
  .overlay-enter-from,
  .overlay-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
</style>
