# Contact Management Application

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

## Основной компонент `App.vue`

Компонент `App.vue` служит основным контейнером для приложения управления контактами. Он включает в себя следующие
компоненты:

- **SearchBar** для поиска контактов.
- **ContactForm** для добавления и редактирования контактов.
- **ContactList** для отображения списка контактов.

### Основные функции и методы:

#### Контакты:

- `contacts`: состояние, содержащее список контактов, загружаемый из локального хранилища.
- `filteredContacts`: вычисляемое свойство, фильтрующее контакты на основе поискового запроса.

#### Поиск:

- `searchQuery`: состояние, содержащее строку поиска.

#### Редактирование контактов:

- `editContact`: состояние, содержащее контакт, который редактируется в данный момент.
- `preparedEditContact`: вычисляемое свойство, возвращающее либо текущий контакт для редактирования, либо пустой
  контакт, если `editContact` отсутствует.

#### Методы:

- `saveContact`: сохраняет новый контакт или обновляет существующий.
- `deleteContact`: удаляет контакт по идентификатору.
- `setEditContact`: устанавливает контакт для редактирования.
- `cancelEdit`: отменяет режим редактирования.

#### Синхронизация с локальным хранилищем:

- Используется `watch`, чтобы синхронизировать изменения списка контактов с локальным хранилищем.

## Компонент `SearchBar.vue`

Компонент `SearchBar` предоставляет поле ввода для фильтрации контактов. Он использует двухстороннее связывание с
родительским компонентом через `v-model`.

## Компонент `ContactList.vue`

Компонент `ContactList` отвечает за отображение списка контактов и передачу данных о редактируемом контакте в
компонент `ContactItem`.

## Компонент `ContactItem.vue`

Компонент `ContactItem` отображает отдельный контакт и предоставляет кнопки для редактирования и удаления контакта.

## Компонент `ContactForm.vue`

Компонент `ContactForm` предоставляет форму для создания и редактирования контактов. Он также включает валидацию полей.

## Тестирование компонента ContactForm.vue

Компонент ContactForm.vue предоставляет форму для создания и редактирования контактов, включая валидацию полей. Для
обеспечения корректной работы этого компонента написаны следующие тесты с использованием @vue/test-utils и jest.

### Рендеринг полей формы

Тест проверяет, что форма корректно рендерит все необходимые поля ввода.

```typescript
it('renders form inputs correctly', () => {
  const wrapper = shallowMount(ContactForm);
  expect(wrapper.find('input[type="text"]')
    .exists())
    .toBe(true);
  expect(wrapper.find('input[type="tel"]')
    .exists())
    .toBe(true);
  expect(wrapper.find('input[type="email"]')
    .exists())
    .toBe(true);
});
```

### Установка значений формы при передаче пропса editContact

Тест проверяет, что форма корректно устанавливает значения полей при передаче пропса editContact.

```typescript
it('sets form values when editContact prop is passed', async () => {
  const editContact: Contact = {
    id: 1,
    name: 'John Doe',
    phone: '+79525638308',
    email: 'john.doe@example.com'
  };
  const wrapper = shallowMount(ContactForm, {
    props: { editContact }
  });

  await wrapper.vm.$nextTick();
  expect((wrapper.find('input[type="text"]').element as HTMLInputElement).value)
    .toBe(editContact.name);
  expect((wrapper.find('input[type="tel"]').element as HTMLInputElement).value)
    .toBe(editContact.phone);
  expect((wrapper.find('input[type="email"]').element as HTMLInputElement).value)
    .toBe(editContact.email);
});
```

### Эмит события saveContact при валидной форме

Тест проверяет, что событие saveContact эмитируется с правильными данными при валидной форме.

```typescript
it('emits saveContact event with correct data when form is valid', async () => {
  const wrapper = shallowMount(ContactForm);
  const nameInput = wrapper.find('input[type="text"]');
  const phoneInput = wrapper.find('input[type="tel"]');
  const emailInput = wrapper.find('input[type="email"]');

  await nameInput.setValue('John Doe');
  await phoneInput.setValue('+79525638308');
  await emailInput.setValue('john.doe@example.com');

  await wrapper.find('form')
    .trigger('submit.prevent');
  expect(wrapper.emitted().saveContact)
    .toBeTruthy();
  expect(wrapper.emitted().saveContact[0])
    .toEqual([{
      name: 'John Doe',
      phone: '+79525638308',
      email: 'john.doe@example.com'
    }]);
});
```

### Не эмитировать событие saveContact при невалидной форме

Тест проверяет, что событие saveContact не эмитируется при невалидной форме.

```typescript
it('does not emit saveContact event when form is invalid', async () => {
  const wrapper = shallowMount(ContactForm);
  const nameInput = wrapper.find('input[type="text"]');
  const phoneInput = wrapper.find('input[type="tel"]');
  const emailInput = wrapper.find('input[type="email"]');

  await nameInput.setValue('Jo');
  await phoneInput.setValue('+795256383');
  await emailInput.setValue('john.doe');

  await wrapper.find('form')
    .trigger('submit.prevent');
  expect(wrapper.emitted().saveContact)
    .toBeFalsy();
});
```

### Эмит события cancelEdit при клике на кнопку отмены

Тест проверяет, что событие cancelEdit эмитируется при клике на кнопку отмены.

```typescript
it('emits cancelEdit event when cancel button is clicked', async () => {
  const editContact: Contact = {
    id: 1,
    name: 'John Doe',
    phone: '+79525638308',
    email: 'john.doe@example.com'
  };
  const wrapper = shallowMount(ContactForm, {
    props: { editContact }
  });

  await wrapper.find('button[type="button"]')
    .trigger('click');
  expect(wrapper.emitted().cancelEdit)
    .toBeTruthy();
});
```

