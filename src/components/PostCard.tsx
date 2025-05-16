import editIcon from "../assets/edit.svg"
import deleteIcon from "../assets/delete.svg"

interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  createdAt: Date;
}

interface PostCardProps {
  post: Post;
  currentUser: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PostCard({
  post,
  currentUser,
  onEdit,
  onDelete,
}: PostCardProps) {

  const createdAtDate = new Date(post.createdAt);

  const timeAgo = `${Math.floor(
    (Date.now() - createdAtDate.getTime()) / 60000
  )} minutes ago`;

  const isOwner = currentUser === post.username;

  return (
    <div className="border rounded-md mt-6 bg-white ">
      <div className="bg-blue-400 text-white p-3 font-semibold flex justify-between items-center rounded-t-md">
        <span className="break-words whitespace-pre-wrap overflow-hidden">{post.title}</span>
        {isOwner && (
          <div className="flex gap-2 cursor-pointer">
            <button onClick={() => onDelete(post.id)} title="Delete">
              <img src={deleteIcon} alt="" />
            </button>
            <button onClick={() => onEdit(post.id)} title="Edit">
              <img src={editIcon} alt="" />
            </button>
          </div>
        )}
      </div>

      <div className="p-3 text-sm">
        <p className="text-gray-600 mb-2 flex">
          <strong>@{post.username}</strong> • {timeAgo}
        </p>
        <p className="break-words whitespace-pre-wrap overflow-hidden">{post.content}</p>
      </div>
    </div>
  );
}
