<script setup lang="ts">
defineProps<{ open?: boolean }>()
defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm"
        @click="$emit('close')"
      />
      <div class="relative z-10 w-full max-w-lg mx-4 bg-card border border-border rounded-xl shadow-xl">
        <slot />
      </div>
    </div>
  </Teleport>
</template>