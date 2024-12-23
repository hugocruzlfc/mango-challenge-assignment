/**
 * @jest-environment jsdom
 */
import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      name: /Mango Challenge Assignment/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the button links", () => {
    render(<Home />);
    const button1 = screen.getByRole("link", { name: /View Exercise 1/i });
    const button2 = screen.getByRole("link", { name: /View Exercise 2/i });
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });
});
