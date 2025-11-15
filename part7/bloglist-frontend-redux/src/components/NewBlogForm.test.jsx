import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";

test("form calls onCreate with correct details", async () => {
  const mockHandler = vi.fn();

  render(<NewBlogForm onCreate={mockHandler} />);

  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: /create new blog/i }));
  await user.type(screen.getByLabelText(/title/i), "Mars settlement");
  await user.type(screen.getByLabelText(/author/i), "Elon Musk");
  await user.type(screen.getByLabelText(/url/i), "https://nasa.gov.com");

  await user.click(screen.getByRole("button", { name: /create/i }));

  expect(mockHandler).toHaveBeenCalledTimes(1);
  expect(mockHandler).toHaveBeenCalledWith({
    title: "Mars settlement",
    author: "Elon Musk",
    url: "https://nasa.gov.com",
  });
});
