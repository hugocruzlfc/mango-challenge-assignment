/**
 * @jest-environment jsdom
 */
import NormalRange from "@/components/NormalRange";
import { render, screen } from "@testing-library/react";

describe("NormalRange", () => {
  it("renders with initial min and max values", () => {
    render(
      <NormalRange
        min={10}
        max={100}
      />
    );

    const minLabel = screen.getByText("10€");
    const maxLabel = screen.getByText("100€");

    expect(minLabel).toBeInTheDocument();
    expect(maxLabel).toBeInTheDocument();
  });

  it("renders the range slider", () => {
    render(
      <NormalRange
        min={10}
        max={100}
      />
    );

    const rangeSlider = screen.getByTestId("range-slider");

    expect(rangeSlider).toBeInTheDocument();

    const minHandle = screen.getByTestId("min-handle");
    const maxHandle = screen.getByTestId("max-handle");

    expect(minHandle).toBeInTheDocument();
    expect(maxHandle).toBeInTheDocument();
  });
});
