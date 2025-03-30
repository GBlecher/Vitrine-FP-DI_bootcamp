import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const CreatePost = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [post_url, setPost_url] = useState("");
  const [credit, setCredit] = useState("");
  const [hyperlink, setHyperlink] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const user_id = user.userid;
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    try {
      const newPost = await axios.post(
        `${apiBaseUrl}/api/post/new/${user_id}`,
        { title, post_url, credit, hyperlink, tags: tagsArray },
        { withCredentials: true }
      );

      navigate("/profile/personal");
    } catch (err) {
      setError(err.response?.data?.message || "Post creation failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-form-container">
      <h2>Create Post</h2>
      {post_url && (
        <div>
          <img
            src={post_url}
            alt="post Preview"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        </div>
      )}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post_url">Post URL</label>
          <input
            id="post_url"
            name="post_url"
            type="text"
            required
            value={post_url}
            onChange={(e) => setPost_url(e.target.value)}
            placeholder="Enter image URL..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="credit">Credit</label>
          <input
            id="credit"
            name="credit"
            type="credit"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            placeholder="Enter credits if applicable..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="hyperlink">Link</label>
          <input
            id="hyperlink"
            name="hyperlink"
            type="hyperlink"
            value={hyperlink}
            onChange={(e) => setHyperlink(e.target.value)}
            placeholder="Enter link to page if applicable"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            name="tags"
            type="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder=" Enter tags seperated by ','"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "creating..." : "Create  Post"}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default CreatePost;

