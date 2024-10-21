import hello from "../src/hello"

describe("Example test", () => {
  it("Runs a test", () => {
    expect(hello()).toEqual("hello")
  })
})
