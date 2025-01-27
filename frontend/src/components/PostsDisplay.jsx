import  { useEffect, useState } from 'react';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const PostsDisplay = ({urlEndPoint}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/api/post/${urlEndPoint}`,
                    { withCredentials: true }); 
                
                
                setPosts(response.data); 
            } catch (err) {

                setError('Failed to fetch posts'); 
                console.error(err);
            } finally {
                setLoading(false); 
            }
        };

        fetchPosts(); 
    }, [urlEndPoint]); 

    if (loading) return <div>Loading...</div>; 
    if (error) return <div>{error}</div>; 

    return (
        <div id='post_contaner'>
            {posts.map(post => (
                <div key={post.id} className="post">
                    <img src={post.post_url} alt={`Post by user ${post.user_id}`} style={{ width: '100%', height: 'auto' }} />
                </div>
            ))}
        </div>
    );
};

export default PostsDisplay;