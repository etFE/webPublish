const defalut_options = {
  template: '',
  type: '',
  option: {},
  title: '',
  description: '',
  htmlCode: '',
  jsCode: '',
  col: 2,
}

class CreateDemo {
  constructor (props) {
    this.setting = $.extend({}, defalut_options, props)
    this.$container = $(
      `<div class="demo-container ${props.col === 1 ? '' : 'display-flex'}">
        <div class="demo-show ${props.col === 1 ? '' : 'flex-1'}">
          <div class="demo-show-plugin"></div>
          <div class="demo-show-title"></div>
          <div class="demo-show-tip"></div>
        </div>
        <div class="demo-code ${props.col === 1 ? '' : 'flex-1'}">
          <div class="demo-code-html"></div>
          <div class="demo-code-javascript"></div>
        </div>
      </div>`
    )

    this.$demo = $(props.template)

    this.init()
  }

  init () {
    const {
      title,
      jsCode,
      type,
      option,
    } = this.setting
    let { description, htmlCode } = this.setting

    $('body').append(this.$container)
    this.$container.find('.demo-show-plugin').html(this.$demo)
    this.$container.find('.demo-show-title').html(`<span>${title}</span>`)
    description = description.replace(/"[a-zA-Z0-9\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]+"/g, (str) => {
      str = str.replace(/"/g, '')
      return `<code>${str}</code>`
    })
    this.$container.find('.demo-show-tip').html(description)
    htmlCode = htmlCode.replace(/</g, '&lt;')
    htmlCode = htmlCode.replace(/>/g, '&gt;')
    this.$container.find('.demo-code-html').html(`<pre><code class="html">${htmlCode}</code></pre>`)
    this.$container.find('.demo-code-javascript').html(`<pre><code class="javascript">${jsCode}</code></pre>`)

    this.runDemo()

    return this
  }

  runDemo () {
    const { type, option } = this.setting

    if (type === 'etValidate') {
      this.plugin = $[type](option)
    } else if (type === 'etDialog' || type === 'common' || type === 'etCheck') {
      this.plugin = {}
    } else {
      this.plugin = this.$demo[type](option)
    }
  }
}

$.createDemo = function (props) {
  return new CreateDemo(props)
}
