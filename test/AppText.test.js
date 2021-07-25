import React from "react";
import renderer from "react-test-renderer";

import AppText from "../src/components/AppText";

test("renders correctly", () => {
  const tree = renderer.create(<AppText text={"Hellozzz3232z"} />).toJSON();
  // tree.props.text;
  // tree.props.allowFontScaling;
  expect(tree).toMatchSnapshot();
});
