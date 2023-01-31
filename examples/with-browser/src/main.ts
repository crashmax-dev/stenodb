import 'reflect-metadata'
import { el } from '@zero-dependency/dom'
import { User } from './entity.js'
import { storage } from './storage.js'

const app = document.querySelector('#app')!

const userIdInput = el('input', {
  type: 'number',
  name: 'id',
  value: storage.data!.getLastUser().id.toString(),
  disabled: true,
  placeholder: 'UserId'
})

const usernameInput = el('input', {
  type: 'text',
  name: 'username',
  placeholder: 'Username'
})

const submitButton = el(
  'button',
  {
    type: 'submit'
  },
  'Submit'
)

const resetButton = el(
  'button',
  {
    onclick: () => {
      storage.reset()
      formReset()
    }
  },
  'Reset'
)

const form = el(
  'form',
  {
    onsubmit: (event: Event) => {
      event.preventDefault()
      const data = serializeForm(form.elements)
      const { value: username } = data.find(
        (element) => element.name === 'username'
      )!
      if (!username) return

      const lastUser = storage.data!.getLastUser()
      storage.data!.users.push(new User(lastUser.id + 1, username))
      storage.write()
      formReset()
    }
  },
  userIdInput,
  usernameInput,
  submitButton
)

app.append(form, resetButton)

function serializeForm(elements: HTMLFormControlsCollection) {
  const formData = Array.from(elements)
    .filter((element) => !!(element as HTMLInputElement).name)
    .map((element) => {
      const { name, value } = element as HTMLInputElement
      return { name, value }
    })

  return formData
}

function formReset() {
  const { id } = storage.data!.getLastUser()
  form.reset()
  userIdInput.value = id.toString()
  usernameInput.focus()
}
