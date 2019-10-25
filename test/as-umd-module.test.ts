import asUmdModule from "../src/as-umd-module";

describe("Module create test", () => {
  it("should create module", () => {
    let actual: any = {};
    let umdModule = asUmdModule({
      name: "example",
      exports: function() {
        return "Test completed";
      }
    });
    let checkFunction = Function(umdModule);

    checkFunction.call(actual);

    expect(actual.example).toBeDefined();
    expect(actual.example()).toBe("Test completed");
  });
});
