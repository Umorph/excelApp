import {ExcelComponent} from '@core/ExcelComponent'
import {changeTitle} from '@/redux/actions'
import {$} from '@core/dom'
import {defaultTitle} from '@/constants'
import {debounce} from '@core/utils'

export class Header extends ExcelComponent {
  static className = 'excel__header'

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input'],
			...options,
		})
	}

	prepare() {
		this.onInput = debounce(this.onInput, 300)
	}

	toHTML() {
		const title = this.store.getState().title || defaultTitle
    return `
      <input class="input" type="text" value="${title}">
      <div>
        <div class="button">
          <span class="material-icons">delete</span>
        </div>
        <div class="button">
          <span class="material-icons">exit_to_app</span>
        </div>
      </div>
    `
  }

	onInput(event) {
		const $target = $(event.target)
		this.$dispatch(changeTitle($target.text()))
	}
}
