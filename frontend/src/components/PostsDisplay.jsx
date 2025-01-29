import { useEffect, useState } from "react";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const PostsDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [urlEndPoint, setUrlEndPoint] = useState("all");
  const [searchedUser, setSearchedUser] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const usersResponse = await axios.get(`${apiBaseUrl}/api/user/all`, {
        withCredentials: true,
      });
      
      
      const foundUser = usersResponse.data.find(user => user.username === searchedUser)
      if (foundUser){
        setUrlEndPoint(foundUser.id)
      }else{
        setError("User not found")
      }
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleX = ()=>{
    setUrlEndPoint('all')
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await axios.get(
          `${apiBaseUrl}/api/post/${urlEndPoint}`,
          { withCredentials: true }
        );
        setPosts(postsResponse.data);
      } catch (err) {
        setError("Failed to fetch posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [urlEndPoint]);

  const openPopup = (post) => {
    setSelectedPost(post);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedPost(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div id='searchBar'>
        <input
          type="text"
          value={searchedUser}
          onChange={(e) => setSearchedUser(e.target.value)}
          placeholder="Search for username..."
        />
        <button onClick={handleX}>X</button>
        <button onClick={handleSearch}>Search</button>
        {error && <div>{error}</div>}
      </div>

      <div id="post_container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <img
              src={post.post_url}
              alt={`Post by user ${post.user_id}`}
              style={{ width: "100%", height: "auto" }}
            />
            <h3>{post.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostsDisplay;
