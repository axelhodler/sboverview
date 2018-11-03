{
  let template = document.createElement('template')
  template.innerHTML = `
    <h1 id="service-name"></h1>
    <div id="status"></div>
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
      this.shadowRoot.querySelector('#service-name').innerHTML = serviceName

      let status = this.shadowRoot.querySelector('#status')

      fetch(`/${serviceName}/management/health`)
        .then(response => {
          if (response.ok) {
            status.innerHTML = "UP"
          } else {
            status.innerHTML = "DOWN"
          }
        })
    }
  }

  customElements.define('ah-service-status', AhServiceStatus)
}
