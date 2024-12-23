/**
 * @jest-environment jsdom
 */
import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  it("navigates to exercise pages when buttons are clicked", async () => {
    render(<Home />);

    const button1 = screen.getByRole("link", { name: /View Exercise 1/i });
    const button2 = screen.getByRole("link", { name: /View Exercise 2/i });

    userEvent.click(button1);

    expect(window.location.pathname).toBe("/exercise-one");

    userEvent.click(button2);
    expect(window.location.pathname).toBe("/exercise-two");
  });
});
