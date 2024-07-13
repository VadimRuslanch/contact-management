<template>
  <transition-group name="fade" tag="div">
    <ContactItem
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
        :editContact="preparedEditContact"
        @edit="onEdit(contact)"
        @delete="onDelete(contact.id)"
    />
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ContactItem from './ContactItem.vue';
import { Contact } from '@/types/types';

export default defineComponent({
  name: 'ContactList',
  components: { ContactItem },
  props: {
    contacts: {
      type: Array as PropType<Contact[]>,
      required: true
    },
    preparedEditContact: {
      type: Object as PropType<Contact>,
      required: true
    }
  },
  methods: {
    onEdit(contact: Contact) {
      this.$emit('editContact', contact);
    },
    onDelete(id: number) {
      this.$emit('deleteContact', id);
    }
  }
});
</script>
