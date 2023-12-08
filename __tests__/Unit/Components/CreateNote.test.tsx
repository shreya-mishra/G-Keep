import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
// import "@testing-library/jest-native/extend-expect";
import RenderText from "../../../src/module/index/components/RenderText";
import CreateNote from "../../../src/module/index/components/CreateNote";

describe("render created notes", () => {
  test("renders correctly", () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(
      <CreateNote visible={true} onClose={() => {}} onCreate={() => {}} />
    );
    // Verify that the modal is rendered
    const getTestId = getByTestId("createNote");
    expect(getTestId).toBeDefined();

    // Verify that input fields are rendered
    expect(getByPlaceholderText("Title")).toBeDefined();
    expect(getByPlaceholderText("Content")).toBeDefined();

    // Verify that the "Create" button is rendered
    expect(getByText("Create")).toBeDefined();
  });
  test('calls onCreate callback when "Create" button is pressed with valid input', () => {
    const onCreateMock = jest.fn();
    const onCloseMock = jest.fn();

    const { getByPlaceholderText, getByText, queryByTestId } = render(
      <CreateNote
        visible={true}
        onClose={onCloseMock}
        onCreate={onCreateMock}
      />
    );

    // Type valid input in the title and content input fields
    fireEvent.changeText(getByPlaceholderText("Title"), "Test Title");
    fireEvent.changeText(getByPlaceholderText("Content"), "Test Content");

    // Press the "Create" button
    fireEvent.press(getByText("Create"));

    // Verify that the onCreate callback is called with the expected values
    expect(onCreateMock).toHaveBeenCalledWith({
      title: "Test Title",
      content: "Test Content",
    });

    // Verify that the modal is closed
    expect(onCloseMock).toHaveBeenCalled();
    expect(queryByTestId("createNote")).toBeNull();
  });
  test('does not call onCreate callback when "Create" button is pressed with invalid input', () => {
    const onCreateMock = jest.fn();
    const onCloseMock = jest.fn();

    const { getByText } = render(
      <CreateNote
        visible={true}
        onClose={onCloseMock}
        onCreate={onCreateMock}
      />
    );

    // Press the "Create" button without entering valid input
    fireEvent.press(getByText("Create"));

    // Verify that the onCreate callback is not called
    expect(onCreateMock).not.toHaveBeenCalled();

    // Verify that the onClose callback is not called
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
