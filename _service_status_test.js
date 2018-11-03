{
  let component
  let fetchApiStub
  let SUCCESSFUL_RESPONSE = { "status": "UP" }

  function error() {
    var mockResponse = new window.Response(JSON.stringify("error"), {
      status: 500
    });

    return Promise.resolve(mockResponse);
  }

  function jsonOk (body) {
    var mockResponse = new window.Response(JSON.stringify(body), {
      status: 200,
      headers: {
        'Content-type': 'application/json'
      }
   });

   return Promise.resolve(mockResponse);
  }


  QUnit.testStart(() => {
    fetchApiStub = sinon.stub(window, 'fetch');
    component = document.createElement('ah-service-status')
  })

  QUnit.testDone(() => {
    document.body.removeChild(component)
    window.fetch.restore();
  })

  QUnit.test("it displays OK if service is up", assert => {
    fetchApiStub.onCall(0).returns(jsonOk(SUCCESSFUL_RESPONSE));
    const serviceName = 'foo-service'
    component.setAttribute('serviceName', serviceName)
    document.body.appendChild(component)

    let done = assert.async()
    setTimeout(_ => {
      const actualStatus = document.getElementById(serviceName).shadowRoot.querySelector('#status').innerText
      assert.equal(actualStatus, 'UP')
      done()
    })
  })

  QUnit.test("it displays DOWN if service is down", assert => {
    fetchApiStub.onCall(0).returns(error());
    const serviceName = 'bar-service'
    component.setAttribute('serviceName', serviceName)
    document.body.appendChild(component)

    let done = assert.async()
    setTimeout(_ => {
      const actualStatus = document.getElementById(serviceName).shadowRoot.querySelector('#status').innerText
      assert.equal(actualStatus, 'DOWN')
      done()
    })

  })
}
