import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const PrivFeed = () => {
  const { user } = useAuth();
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        setError('Failed to fetch posts');
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();

  }, [user.userid]);

  if (loadingPosts) {
    return <p>Loading posts</p>;
  }

  if (posts<0) {
    return <p>User profile not found.</p>;
  }

  if (error) return <div>{error}</div>;

  return (
    <>

      <div id="post_container">
        {posts &&
          posts.map((post) => (
            <div key={post.id} className="post">
              <img
                src={post.post_url}
                alt={`Post by user ${post.user_id}`}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default PrivFeed;
