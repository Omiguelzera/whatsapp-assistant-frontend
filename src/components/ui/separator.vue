<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string; orientation?: 'horizontal' | 'vertical' }>()
</script>

<template>
  <div
    :class="cn(
      'shrink-0 bg-border',
      ($props.orientation ?? 'horizontal') === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      $props.class
    )"
  />
</template>