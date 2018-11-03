{
  let successfulResponse = { "status": "UP" }

  let component

  QUnit.testStart(() => {
    component = document.createElement('ah-service-status')
  })

  QUnit.testDone(() => {
    document.body.removeChild(component)
  })

  QUnit.test("it displays OK if service is up", assert => {
    const serviceName = 'foo-service'
    component.setAttribute('serviceName', serviceName)
    document.body.appendChild(component)

    const actualStatus = document.getElementById(serviceName).shadowRoot.querySelector('#status').innerText

    assert.equal(actualStatus, 'UP')
  })
}
