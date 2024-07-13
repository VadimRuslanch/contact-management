<template>
  <div class="py-6">
    <p class="mb-2">Поиск</p>
    <input
           v-model="search" type="text" placeholder="Введите имя" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    search: {
      get(): string {
        return this.$props.modelValue;
      },
      set(value: string) {
        this.$emit('update:modelValue', value);
      }
    }
  }
});
</script>
