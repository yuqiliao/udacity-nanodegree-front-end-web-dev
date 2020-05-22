import { checkUserInput } from "./checkUserInput";
import { handleSubmit } from "./formHandler";


describe("Testing url check", () => {
  test('is a valid url', () => {
    expect(checkUserInput("https://jestjs.io/docs/en/getting-started")).toStrictEqual({url: "https://jestjs.io/docs/en/getting-started"});
  });
  test('is not a valid url', () => {
      expect(checkUserInput("asdfssdfd")).toStrictEqual({error: "Please enter a valid URL"});
    });
})

describe("Testing the handleSubmit function ", () => {
  test('function is defined', () => {
    expect(handleSubmit).toBeDefined();
  });
})