import { shallowMount } from '@vue/test-utils';
import ContactForm from '@/components/ContactForm.vue';
import { Contact } from '@/types/types';

describe('ContactForm.vue', () => {
  it('renders form inputs correctly', () => {
    const wrapper = shallowMount(ContactForm);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="tel"]').exists()).toBe(true);
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
  });

  it('sets form values when editContact prop is passed', async () => {
    const editContact: Contact = { id: 1, name: 'John Doe', phone: '+79525638308', email: 'john.doe@example.com' };
    const wrapper = shallowMount(ContactForm, {
      props: { editContact }
    });

    await wrapper.vm.$nextTick();
    expect((wrapper.find('input[type="text"]').element as HTMLInputElement).value).toBe(editContact.name);
    expect((wrapper.find('input[type="tel"]').element as HTMLInputElement).value).toBe(editContact.phone);
    expect((wrapper.find('input[type="email"]').element as HTMLInputElement).value).toBe(editContact.email);
  });

  it('emits saveContact event with correct data when form is valid', async () => {
    const wrapper = shallowMount(ContactForm);
    const nameInput = wrapper.find('input[type="text"]');
    const phoneInput = wrapper.find('input[type="tel"]');
    const emailInput = wrapper.find('input[type="email"]');

    await nameInput.setValue('John Doe');
    await phoneInput.setValue('+79525638308');
    await emailInput.setValue('john.doe@example.com');

    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().saveContact).toBeTruthy();
    expect(wrapper.emitted().saveContact[0]).toEqual([{
      name: 'John Doe',
      phone: '+79525638308',
      email: 'john.doe@example.com'
    }]);
  });

  it('does not emit saveContact event when form is invalid', async () => {
    const wrapper = shallowMount(ContactForm);
    const nameInput = wrapper.find('input[type="text"]');
    const phoneInput = wrapper.find('input[type="tel"]');
    const emailInput = wrapper.find('input[type="email"]');

    await nameInput.setValue('Jo');
    await phoneInput.setValue('+795256383');
    await emailInput.setValue('john.doe');

    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().saveContact).toBeFalsy();
  });

  it('emits cancelEdit event when cancel button is clicked', async () => {
    const editContact: Contact = { id: 1, name: 'John Doe', phone: '+79525638308', email: 'john.doe@example.com' };
    const wrapper = shallowMount(ContactForm, {
      props: { editContact }
    });

    await wrapper.find('button[type="button"]').trigger('click');
    expect(wrapper.emitted().cancelEdit).toBeTruthy();
  });
});
