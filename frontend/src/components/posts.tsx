"use client";
import React, { useEffect, useState } from 'react'
import Post from './Post'
import { getPosts } from '@/app/actions/posts';
import { useAppSelector } from '@/hooks/redux';

const PostSkeleton = () => (
  <div className="p-4 border rounded-lg shadow animate-pulse">
    <div className="h-4 bg-white dark:bg-gray-800 rounded w-3/4 mb-4"></div>
    <div className="h-20 bg-white dark:bg-gray-800 rounded mb-4"></div>
    <div className="h-4 bg-white dark:bg-gray-800 rounded w-1/2"></div>
  </div>
);

const Posts = ({ user }: { user: any }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const trigger = useAppSelector((state) => state.posts.trigger);
    
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const response: any = await getPosts();
          setPosts(response.data);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }, [trigger]);

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post: any) => (
        <Post key={post._id} post={post} user={user} />
      ))}
    </div>
  );
};

export default Posts