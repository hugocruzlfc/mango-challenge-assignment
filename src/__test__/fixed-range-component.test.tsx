/**
 * @jest-environment jsdom
 */
import FixedRange from "@/components/FixedRange";
import { render, screen } from "@testing-library/react";

describe("FixedRange", () => {
  it("renders with initial min and max values", () => {
    render(<FixedRange values={[10, 20, 30, 40, 50]} />);

    const minLabel = screen.getByText("10€");
    const maxLabel = screen.getByText("50€");

    expect(minLabel).toBeInTheDocument();
    expect(maxLabel).toBeInTheDocument();
  });

  it("renders the range slider", () => {
    render(<FixedRange values={[10, 20, 30, 40, 50]} />);

    const rangeSlider = screen.getByTestId("range-slider");

    expect(rangeSlider).toBeInTheDocument();

    const minHandle = screen.getByTestId("min-handle");
    const maxHandle = screen.getByTestId("max-handle");

    expect(minHandle).toBeInTheDocument();
    expect(maxHandle).toBeInTheDocument();
  });

  it("adjusts the range when clicked", () => {
    render(<FixedRange values={[10, 20, 30, 40, 50]} />);

    const rangeSlider = screen.getByTestId("range-slider");

    const clickEvent = { clientX: 200 };
    rangeSlider.dispatchEvent(new MouseEvent("click", clickEvent));

    const minLabel = screen.getByText("30€");
    expect(minLabel).toBeInTheDocument();
  });
});
