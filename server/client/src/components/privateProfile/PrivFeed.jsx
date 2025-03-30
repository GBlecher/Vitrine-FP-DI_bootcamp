import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.jsx";
import axios from "axios";


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const PrivFeed = () => {
  const { user } = useAuth();
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [deletePostId, setDeletePostId] = useState(null);
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const navigate = useNavigate();

  // Fetch posts for the current user
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await axios.get(
          `${apiBaseUrl}/api/post/${user.userid}`,
          { withCredentials: true }
        );

        setPosts(postsResponse.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts");
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [user.userid]);

    // Handle post deletion
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${apiBaseUrl}/api/post/${postId}`, {
        withCredentials: true,
      });
      setPosts(posts.filter((post) => post.id !== postId));// Filter out unwanted post
      setDeletePostId(null);
    } catch (err) {
      setError("Failed to delete post");
      console.error(err);
    }
  };

  if (loadingPosts) {
    return <p>Loading posts</p>;
  }

  if (posts.length === 0) {
    return (
      <>
        <button onClick={() => navigate("/profile/personal/newpost")}>
          Create Post
        </button>
        <p>No posts found.</p>
      </>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <>
      

      <div id="post_container">
      
        {posts.map((post) => (
          <div
            key={post.id}
            className="post"
            style={{ position: "relative" }}
            onMouseEnter={() => setHoveredPostId(post.id)}
            onMouseLeave={() => setHoveredPostId(null)}
          >
            <img
              src={post.post_url}
              alt={`Post by user ${post.user_id}`}
              style={{ width: "100%", height: "auto" }}
            />
            {hoveredPostId === post.id && (
              <h3
                onClick={() => setDeletePostId(post.id)}
                style={{
                  position: "absolute",
                  bottom: "50px",
                  right: "10px",
                  cursor: "pointer",
                }}
                className="options_button"
              >
                ...
              </h3>
            )}
            {deletePostId === post.id && (
              <div
                className="options_menu"
                style={{ position: "absolute", bottom: "40px", right: "10px" }}
              >
                <button onClick={() => handleDelete(post.id)}>Delete</button>
                <button onClick={() => setDeletePostId(null)}>Cancel</button>
              </div>
            )}

            <h3>{post.title}</h3>
          </div>
        ))}
        
      </div>
      
    </>
  );
};

export default PrivFeed;
