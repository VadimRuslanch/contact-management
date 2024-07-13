<template>
  <div class="mb-4">
    <div v-if="editContact" class="mb-2 text-blue-500 text-18px">
      Введите данные для изменения
    </div>
    <form @submit.prevent="submitForm" class="space-y-4" novalidate>
      <span class="mt-2.5 block">ФИО</span>
      <div>
        <input v-model="form.name" type="text" placeholder="Полное имя" required />
        <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
      </div>
      <span class="mt-2.5 block">Номер телефона</span>
      <div>
        <input v-model="form.phone" type="tel" placeholder="Телефон" required />
        <span v-if="errors.phone" class="text-red-500">{{ errors.phone }}</span>
      </div>
      <span class="mt-2.5 block">Email</span>
      <div>
        <input v-model="form.email" type="email" placeholder="Email" required />
        <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
      </div>
      <div class="flex space-x-2">
        <button type="submit" class="bg-blue-500 text-white p-2 rounded">{{ editContact ? 'Изменить' : 'Добавить' }} Контакт</button>
        <button type="button" @click="cancelEdit" v-if="editContact" class="bg-gray-500 text-white p-2 rounded">Отменить</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue';
import { Contact } from '@/types/types';

export default defineComponent({
  name: 'ContactForm',
  props: {
    editContact: {
      type: Object as PropType<Contact | null>,
      default: null
    }
  },
  setup(props, { emit }) {
    const form = ref({
      name: '',
      phone: '',
      email: ''
    });
    const errors = ref({
      name: '',
      phone: '',
      email: ''
    });

    watch(() => props.editContact, (newVal) => {
      if (newVal) {
        form.value = { ...newVal };
      } else {
        form.value = {
          name: '',
          phone: '',
          email: ''
        };
      }
    }, { immediate: true });

    const validateForm = () => {
      errors.value = {
        name: '',
        phone: '',
        email: ''
      };
      let isValid = true;

      // Валидация имени
      if (!form.value.name) {
        errors.value.name = 'Имя обязательно к заполнению';
        isValid = false;
      } else if (form.value.name.length < 3) {
        errors.value.name = 'Не менее 3 символов';
        isValid = false;
      }

      // Валидация телефона
      const phoneRegex = /^\+7\d{10}$/;
      if (!form.value.phone) {
        errors.value.phone = 'Телефон обязателен к заполнению';
        isValid = false;
      } else if (!phoneRegex.test(form.value.phone)) {
        errors.value.phone = 'Введите номер полностью формата "+79525638308" без пробелов и других знаков';
        isValid = false;
      }

      // Валидация email
      const emailRegex = /\S+@\S+\.\S+/;
      if (!form.value.email) {
        errors.value.email = 'Email обязателен к заполнению';
        isValid = false;
      } else if (!emailRegex.test(form.value.email)) {
        errors.value.email = 'Введите email формата example@email.com';
        isValid = false;
      }

      return isValid;
    };

    const submitForm = () => {
      if (validateForm()) {
        emit('saveContact', { ...form.value });
        form.value = {
          name: '',
          phone: '',
          email: ''
        };
      }
    };

    const cancelEdit = () => {
      emit('cancelEdit');
      form.value = {
        name: '',
        phone: '',
        email: ''
      };
    };

    return {
      form,
      errors,
      submitForm,
      cancelEdit
    };
  }
});
</script>
