<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string; fallback?: string }>()
</script>

<template>
  <div :class="cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary/10 items-center justify-center', $props.class)">
    <slot>
      <span class="text-sm font-medium text-primary">{{ fallback }}</span>
    </slot>
  </div>
</template>