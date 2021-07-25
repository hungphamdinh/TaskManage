import React from "react";
import { cleanup } from "@testing-library/react-native";
import * as reactRedux from "react-redux";
import InviteForm from "../src/screens/team/InviteMemberScreen/components/InviteForm/InviteForm";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

jest.mock("react-native-keyboard-aware-scroll-view", () => {
  const KeyboardAwareScrollView = ({ children }) => children;
  return { KeyboardAwareScrollView };
});
Enzyme.configure({ adapter: new Adapter() });
const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((init) => [init, setState]);

let wrapper;
const userMock = {
  id: "0",
  googleUserId: "0",
  name: "Phạm Đình HƯng",
  mail: "abc@gmail.com",
  role: "Deb",
  profile: "",
  members: [],
};

const mockUsers = [
  {
    id: "0",
    googleUserId: "0",
    name: "Phạm Đình HƯng",
    mail: "abc@gmail.com",
    role: "Deb",
    profile: "",
    members: [],
  },
  {
    id: "1",
    googleUserId: "0",
    name: "Hello",
    mail: "abc@gmail.com",
    role: "Deb",
    profile: "",
    members: [],
  },
  {
    id: "2",
    googleUserId: "0",
    name: "Hihi",
    mail: "abc@gmail.com",
    role: "Deb",
    profile: "",
    members: [],
  },
];
const userAction = {
  params: {
    id: "abc",
    taskId: "abcd12312312",
  },
  type: "GET_USERS",
};

const userActionSearchMember = {
  params: {
    id: "abc",
    taskId: "abcd12312312",
  },
  name: "somenewpassword",
  type: "GET_USERS_ACTION_SEARCH_MEMBER"
};
const dummyDispatch = jest.fn();
useDispatchMock.mockReturnValue(dummyDispatch);
useSelectorMock.mockReturnValue({ user: userMock, users: mockUsers });

describe("Invite Form", () => {
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
    wrapper = shallow(<InviteForm user={userMock} dispatch={dummyDispatch} />);
  });

  test("InviteForm renders correctly", () => {
    const tree = wrapper;
    expect(toJson(tree)).toMatchSnapshot();
  });

  it("Search Input props", () => {
    const props = {
      testID: "searchInput",
      value: "",
      onChangeText: expect.any(Function),
      placeholder: "Search...",
      allowFontScaling: true,
      rejectResponderTermination: true,
      underlineColorAndroid: "transparent",
    };
    expect(wrapper.find({ testID: "searchInput" }).props()).toEqual(props);

    // expect(wrapper.props().product).toEqual(product);
  });

  it("Search Input value", () => {
    wrapper
      .find({ testID: "searchInput" })
      .simulate("changeText", "somenewpassword");
    wrapper.update();
    expect(wrapper.find({ testID: "searchInput" }).prop("value")).toEqual(
      "somenewpassword"
    );
    expect(dummyDispatch).toHaveBeenCalledTimes(1);
    expect(dummyDispatch).toHaveBeenCalledWith(userActionSearchMember);

  });

  it("should flatlist render Correct", () => {
    const flatListWrapper = wrapper.find("FlatList").props();
    const key = flatListWrapper.keyExtractor(3, 10);
    const listData = flatListWrapper.data;
    expect(key).toEqual("10");
    expect(listData.length).toEqual(mockUsers.length);
  });

  // it("should mock Dispatch", () => {
  //   // expect(dummyDispatch).toHaveBeenCalledWith(userAction);
  //   expect(dummyDispatch).toHaveBeenCalledTimes(2);
  //   expect(dummyDispatch).toHaveBeenCalledWith(userAction);
  // });
});

afterEach(cleanup);

// it("InviteForm Function", () => {
//   const instanceOf = renderer.create(<InviteForm />);
//   console.log(instanceOf);
//   // instanceOf._onFocus();
//   expect(instanceOf.state.isFocus).toEqual(true);
// });
