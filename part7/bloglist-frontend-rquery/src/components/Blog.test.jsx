import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

vi.mock("react-router-dom", () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

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
    expect(screen.getByRole("link", { name: /mars settlement/i })).toHaveAttribute(
      "href",
      "/blogs/123",
    );
    expect(screen.queryByText("https://nasa.gov.com")).not.toBeInTheDocument();
    expect(screen.queryByText(/likes/i)).not.toBeInTheDocument();
  });
});
