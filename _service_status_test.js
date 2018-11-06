{
  let component
  let fetchApiStub
  let SUCCESSFUL_RESPONSE = { "status": "UP" }

  const error = () => {
    var mockResponse = new window.Response(JSON.stringify("error"), {
      status: 500
    });

    return Promise.resolve(mockResponse);
  }

  const jsonOk = (body) => {
    var mockResponse = new window.Response(JSON.stringify(body), {
      status: 200,
      headers: {
        'Content-type': 'application/json'
      }
   });

   return Promise.resolve(mockResponse);
  }

  const setupComponentWithServiceName = (serviceName) => {
    component.setAttribute('serviceName', serviceName)
    document.body.appendChild(component)
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
    setupComponentWithServiceName(serviceName)

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
    setupComponentWithServiceName(serviceName)

    let done = assert.async()
    setTimeout(_ => {
      const actualStatus = document.getElementById(serviceName).shadowRoot.querySelector('#status').innerText
      assert.equal(actualStatus, 'DOWN')
      done()
    })
  })

  QUnit.test("it displays UNKNOWN if service status is unknown", assert => {
    fetchApiStub.onCall(0).returns(Promise.reject("unknown"));
    const serviceName = 'bee-service'
    setupComponentWithServiceName(serviceName)

    let done = assert.async()
    setTimeout(_ => {
      const actualStatus = document.getElementById(serviceName).shadowRoot.querySelector('#status').innerText
      assert.equal(actualStatus, 'UNKNOWN')
      done()
    })
  })

  QUnit.test("it queries the health endpoint of the service", assert => {
    fetchApiStub.onCall(0).returns(error());
    setupComponentWithServiceName('baz-service')

    let done = assert.async()
    setTimeout(_ => {
      assert.equal(fetchApiStub.getCall(0).args[0],
        `${window.location.href}/baz-service/management/health`)
      done()
    })
  })

  QUnit.test("it displays the name of the service with its status", assert => {
    fetchApiStub.onCall(0).returns(error());
    const serviceName = 'fobronik-service'
    setupComponentWithServiceName(serviceName)

    let done = assert.async()
    setTimeout(_ => {
      const webComponent = document.getElementById(serviceName).shadowRoot
      const serviceNameHeader = webComponent.querySelector('#service-name').innerText
      assert.equal(serviceNameHeader, serviceName)
      const actualStatus = webComponent.querySelector('#status').innerText
      assert.equal(actualStatus, 'DOWN')
      done()
    })
  })
}
