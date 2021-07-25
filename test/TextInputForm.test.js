import React from "react";
import renderer from "react-test-renderer";
import { cleanup, render, fireEvent } from "@testing-library/react-native";
import TextInputForm from "../src/components/TextInputForm";
import { strings } from "../src/languages";
describe("TextInputForm", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<TextInputForm />).toJSON();
    // console.log(tree.props);
    expect(tree).toMatchSnapshot();
  });

  test("Change Text Input TextInputForm", () => {
    const onChangeTextMock = jest.fn();
    const page = render(
      <TextInputForm
        placeholder={strings.add_member_screen.search}
        onChangeText={onChangeTextMock}
      />
    );
    const inputSearch = page.getByPlaceholderText(
      strings.add_member_screen.search
    );
    fireEvent.changeText(inputSearch, "Hell323o");
    expect(onChangeTextMock).toHaveBeenCalled();
  });
});
afterEach(cleanup);

// it("Change Text Function", () => {
//   const instanceOf = renderer.create(<TextInputForm />);
//   console.log(instanceOf)
//   // instanceOf._onFocus();
//   expect(instanceOf.state.isFocus).toEqual(true);
// });
