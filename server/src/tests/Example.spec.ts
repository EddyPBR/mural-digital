import { ExampleModel } from "@models/ExampleModel";

test("it should be ok", () => {
  const example = new ExampleModel();

  example.message = "This is a simple example";

  expect(example.message).toEqual("This is a simple example");
});
