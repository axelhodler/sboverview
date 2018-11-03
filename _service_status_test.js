{
  let successfulResponse = { "status": "UP" }

  let component

  QUnit.testStart(() => {
    component = document.createElement('ah-service-status')
  })

  QUnit.testDone(() => {
    document.body.removeChild(component)
  })

  QUnit.test("fails", assert => {
    assert.equal(true, false)
  })
}
