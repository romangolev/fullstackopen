import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Blog from "./Blog";
import BlogView from "./BlogView";

const blog = {
  id: "123",
  title: "Mars settlement",
  author: "Elon Musk",
  url: "https://nasa.gov.com",
  likes: 9,
  user: { name: "John Doe" },
};

describe("<Blog />", () => {
  test("renders title as a link and author", () => {
    render(
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: /mars settlement/i });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/blogs/123");
    expect(screen.getByText("Elon Musk")).toBeDefined();
  });
});

describe("<BlogView />", () => {
  test("shows blog details", () => {
    render(
      <MemoryRouter initialEntries={["/blogs/123"]}>
        <Routes>
          <Route
            path="/blogs/:id"
            element={<BlogView blogs={[blog]} user={blog.user} onLike={() => {}} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Mars settlement")).toBeVisible();
    expect(screen.getByText("https://nasa.gov.com")).toBeVisible();
    expect(screen.getByText(/likes\s*9/i)).toBeVisible();
  });

  test("clicking twice on like button", async () => {
    const mockHandler = vi.fn();
    render(
      <MemoryRouter initialEntries={["/blogs/123"]}>
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <BlogView blogs={[blog]} user={blog.user} onLike={mockHandler} />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    const likeButton = await screen.findByRole("button", { name: /like/i });
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
