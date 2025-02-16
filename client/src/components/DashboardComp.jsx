import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';


export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    
   
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    {/* Total Users Card */}
    <div className=" dark:bg-gray-800 rounded-lg  p-6 flex flex-col justify-between items-center  transition-all transform hover:shadow-2xl bg-white shadow-lg shadow-cyan-500/50">
      <div className="text-center">
        <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
        <p className="text-3xl font-semibold text-gray-800 dark:text-white">{totalUsers}</p>
      </div>
      <HiOutlineUserGroup className="text-white bg-teal-600 rounded-full p-6 text-6xl mt-4" />
      <div className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
        <span className="text-green-500 flex items-center">
          <HiArrowNarrowUp />
          {lastMonthUsers}
        </span>
        <div>Last month</div>
      </div>
    </div>

    {/* Total Comments Card */}
    <div className=" dark:bg-gray-800 rounded-lg  p-6 flex flex-col justify-between items-center  transition-all transform hover:shadow-2xl bg-white shadow-lg shadow-cyan-500/50">
      <div className="text-center">
        <h3 className="text-gray-500 text-md uppercase">Total Comments</h3>
        <p className="text-3xl font-semibold text-gray-800 dark:text-white">{totalComments}</p>
      </div>
      <HiAnnotation className="text-white bg-indigo-600 rounded-full p-6 text-6xl mt-4" />
      <div className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
        <span className="text-green-500 flex items-center">
          <HiArrowNarrowUp />
          {lastMonthComments}
        </span>
        <div>Last month</div>
      </div>
    </div>

    {/* Total Posts Card */}
    <div className=" dark:bg-gray-800 rounded-lg  p-6 flex flex-col justify-between items-center  transition-all transform hover:shadow-2xl bg-white shadow-lg shadow-cyan-500/50">
      <div className="text-center">
        <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
        <p className="text-3xl font-semibold text-gray-800 dark:text-white">{totalPosts}</p>
      </div>
      <HiDocumentText className="text-white bg-lime-600 rounded-full p-6 text-6xl mt-4" />
      <div className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
        <span className="text-green-500 flex items-center">
          <HiArrowNarrowUp />
          {lastMonthPosts}
        </span>
        <div>Last month</div>
      </div>
    </div>
  </div>

  {/* Other Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Recent Users Card */}
    <div className=" dark:bg-gray-800 rounded-lg  p-6   transition-all transform hover:shadow-2xl bg-white shadow-lg shadow-cyan-500/50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Users</h1>
        <Button outline gradientDuoTone="purpleToPink">
          <Link to="/dashboard?tab=users">See All</Link>
        </Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>User Image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
        </Table.Head>
        {users.map((user) => (
          <Table.Body key={user._id} className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>
                <img src={user.profilePicture} alt="user" className="w-12 h-12 rounded-full" />
              </Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>

    {/* Recent Comments Card */}
    <div className=" dark:bg-gray-800 rounded-lg  p-6   transition-all transform hover:shadow-2xl bg-white shadow-lg shadow-cyan-500/50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Comments</h1>
        <Button outline gradientDuoTone="purpleToPink">
          <Link to="/dashboard?tab=comments">See All</Link>
        </Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Comment Content</Table.HeadCell>
          <Table.HeadCell>Likes</Table.HeadCell>
        </Table.Head>
        {comments.map((comment) => (
          <Table.Body key={comment._id} className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="w-96">
                <p className="line-clamp-2">{comment.content}</p>
              </Table.Cell>
              <Table.Cell>{comment.numberOfLikes}</Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>

    {/* Recent Posts Card */}
    <div className=" dark:bg-gray-800 rounded-lg  p-6   transition-all transform hover:shadow-2xl bg-white shadow-lg shadow-cyan-500/50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Posts</h1>
        <Button outline gradientDuoTone="purpleToPink">
          <Link to="/dashboard?tab=posts">See All</Link>
        </Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Post Image</Table.HeadCell>
          <Table.HeadCell>Post Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
        </Table.Head>
        {posts.map((post) => (
          <Table.Body key={post._id} className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>
                <img src={post.image} alt="post" className="w-14 h-10 rounded-md bg-gray-500" />
              </Table.Cell>
              <Table.Cell>{post.title}</Table.Cell>
              <Table.Cell>{post.category}</Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  </div>
</div>
  );
}
