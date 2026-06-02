<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'default' | 'destructive'
  class?: string
}

const props = withDefaults(defineProps<Props>(), { variant: 'default' })

const variants = {
  default: 'bg-background text-foreground',
  destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/10',
}
</script>

<template>
  <div
    :class="cn(
      'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
      variants[props.variant],
      props.class
    )"
  >
    <slot />
  </div>
</template>