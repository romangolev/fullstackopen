import { useState, useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Togglable from "./Togglable";

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const formRef = useRef(null);

  const handleNewblog = async (event) => {
    event.preventDefault();
    onCreate({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <Togglable
      buttonLabelShow="create new blog"
      buttonLabelHide="cancel"
      ref={formRef}
    >
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">Create new blog</Card.Title>
          <Form onSubmit={handleNewblog}>
            <Form.Group className="mb-3" controlId="blog-title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                placeholder="Write a memorable title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="blog-author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={author}
                placeholder="Who wrote this?"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="blog-url">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={url}
                placeholder="https://example.com"
                onChange={({ target }) => setUrl(target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button type="submit">Create</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Togglable>
  );
};

export default NewBlogForm;
