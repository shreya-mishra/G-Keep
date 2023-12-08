import React from "react";
import ColorPickerModal from "../../../../src/module/index/components/ColorPickerModal";
import { render } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import "@testing-library/jest-native/extend-expect";

describe("ColorPickerModel", () => {
  test("should render ColorPickerModel", () => {
    const { getByTestId } = render(
      <ColorPickerModal
        testId="colorPickerModel"
        visible={false}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onSelectColor={function (color: string): {} {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const colorPickerModel = getByTestId("colorPickerModel");
    expect(colorPickerModel).toBeDefined();
  });
});
