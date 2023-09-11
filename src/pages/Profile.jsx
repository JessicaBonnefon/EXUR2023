import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../redux/reducers/post";
import ryxtor from "../assets/ryxtor-profile.jpg";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  return (
    <div className="w-screen h-screen flex flex-col space-y-10 home-background">
      <div className="pt-[80px]">
        <div>
          {posts.length > 0 &&
            posts.map((post) => (
              <div className="bg-[#1b1c2499] flex flex-col backdrop-blur-sm mb-8 shadow-xl rounded px-8 pt-6 pb-8 h-fit mx-auto md:w-[50vw]" key={`${post.id}-post`}>
                <div className="flex gap-4 items-center">
                  <img src={ryxtor} alt="" className="h-10 rounded-full" />
                  <div className="flex grow border-b-2 border-orange-800">
                    <Link className="text-orange-600 text-[21px] ps-2">{post.user}</Link>
                    <div className="grow w-[100%]">

                    </div>
                  </div>
                </div>
                <div className="border-b-2 border-orange-800 mt-8">
                  <p className="block text-white text-base mb-2 px-2">
                    {post.text}
                  </p>
                </div>
                <div className="self-end flex gap-5 mt-3">
                  <button className="text-orange-700 px-3 hover:text-black hover:bg-orange-700 transition font-bold">Cans</button>
                  <button className="text-orange-700 px-3 hover:text-black hover:bg-orange-700 transition font-bold">Comments</button>
                  <button className="text-orange-700 px-3 hover:text-black hover:bg-orange-700 transition font-bold">Share</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
