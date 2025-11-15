import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  id: "123",
  title: "Mars settlement",
  author: "Elon Musk",
  url: "https://nasa.gov.com",
  likes: 9,
  user: { name: "John Doe" },
};

describe("<Blog />", () => {
  test("render content", () => {
    render(<Blog blog={blog} />);

    expect(screen.getByText("Mars settlement")).toBeDefined();
    expect(screen.getByText("Elon Musk")).toBeDefined();
    expect(screen.queryByText("https://nasa.gov.com")).not.toBeVisible();
    expect(screen.queryByText(/likes/i)).not.toBeVisible();
  });

  test("view button shows additional properties", async () => {
    render(<Blog blog={blog} />);
    await userEvent.click(screen.getByRole("button", { name: /view/i }));

    expect(screen.getByText("https://nasa.gov.com")).toBeVisible();
    expect(screen.getByText(/likes\s*9/i)).toBeVisible();
  });

  test("clicking twice on like button", async () => {
    const mockHandler = vi.fn();
    render(<Blog blog={blog} onLike={mockHandler} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /view/i }));

    const likeButton = screen.getByRole("button", { name: /like/i });
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
