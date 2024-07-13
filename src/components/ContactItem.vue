<template>
  <div class="p-2 shadow-sm mb-2">
    <p class="mb-2">{{ contact.name }}</p>
    <p class="mb-2">{{ contact.phone }}</p>
    <p class="mb-6">{{ contact.email }}</p>
    <div class="flex space-x-4">
      <button
          class="edit bg-blue-500 text-white py-2 px-4 rounded"
          :disabled="isEditing"
          @click="$emit('edit', contact)"
      >Изменить</button>
      <button
          class="delete bg-red-500 text-white py-2 px-4 rounded"
          :disabled="isEditing"
          @click="$emit('delete', contact.id)"
      >Удалить</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Contact } from '@/types/types';

export default defineComponent({
  name: 'ContactItem',
  props: {
    contact: {
      type: Object as PropType<Contact>,
      required: true
    },
    editContact: {
      type: Object as PropType<Contact>,
      required: true
    }
  },
  computed: {
    isEditing(): boolean {
      return !!this.editContact && this.editContact.id === this.contact.id;
    }
  }
});
</script>
