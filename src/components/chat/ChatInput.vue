<template>
  <div class="border-t border-border bg-card p-4">
    <form @submit.prevent="handleSubmit" class="flex items-center gap-2">
      <Input
        v-model="message"
        placeholder="Digite uma mensagem..."
        class="flex-1 rounded-full"
        :disabled="disabled"
      />
      <Button
        type="submit"
        size="icon"
        class="rounded-full"
        :disabled="!message.trim() || disabled"
      >
        <Send class="w-4 h-4" />
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Send } from 'lucide-vue-next'
import Input from '@/components/ui/input.vue'
import Button from '@/components/ui/button.vue'

defineProps<{ disabled?: boolean }>()
const emit = defineEmits<{ send: [message: string] }>()

const message = ref('')

function handleSubmit() {
  if (!message.value.trim()) return
  emit('send', message.value.trim())
  message.value = ''
}
</script>