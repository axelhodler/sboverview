{
  let template = document.createElement('template')
  template.innerHTML = `
    <div id="status">UP</div>
  `

  class AhServiceStatus extends HTMLElement {
    constructor() {
      super()
      let templateContent = template.content
      const shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(templateContent.cloneNode(true))
    }

    connectedCallback() {
      const serviceName = this.getAttribute("serviceName")
      this.setAttribute('id', serviceName)
    }

  }

  customElements.define('ah-service-status', AhServiceStatus)
}
