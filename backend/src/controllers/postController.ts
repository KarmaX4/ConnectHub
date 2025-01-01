import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post';
import { JwtPayload } from 'jsonwebtoken';
interface AuthRequest extends Request {
  user: {
    userId: string;
  } & JwtPayload;
}

export const createPost = (req: AuthRequest, res: Response) => {
  try {
    console.log("req.user =",req.user);
    const { content } = req.body;
    const post = new Post({
      content,
      userId: new mongoose.Types.ObjectId(req.user.userId)
    });
    post.save()
      .then(savedPost => res.status(201).json(savedPost))
      .catch(error => res.status(500).json({ message: 'Server error', error }));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPosts = (req: AuthRequest, res: Response) => {
  Post.find()
    .sort({ createdAt: -1 })
    .populate('userId', 'username')
    .then(posts => {
      const postsWithSelfFlag = posts.map(post => ({
        ...post.toObject(),
        selfPost: post.userId._id.toString() === req.user.userId
      }));
      res.json(postsWithSelfFlag);
    })
    .catch(error => res.status(500).json({ message: 'Server error', error }));
};

export const updatePost = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  Post.findOneAndUpdate(
    { 
      _id: new mongoose.Types.ObjectId(id), 
      userId: new mongoose.Types.ObjectId(req.user.userId) 
    },
    { content },
    { new: true }
  )
    .then(post => {
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.json(post);
    })
    .catch(error => res.status(500).json({ message: 'Server error', error }));
};

export const deletePost = (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  Post.findOneAndDelete({ 
    _id: new mongoose.Types.ObjectId(id), 
    userId: new mongoose.Types.ObjectId(req.user.userId) 
  })
    .then(post => {
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.json({ message: 'Post deleted' });
    })
    .catch(error => res.status(500).json({ message: 'Server error', error }));
};

export const likePost = (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  Post.findById(new mongoose.Types.ObjectId(id))
    .then((post: any) => {
      if (!post) return res.status(404).json({ message: 'Post not found' });

      const userId = new mongoose.Types.ObjectId(req.user.userId);
      const index = post.likes.findIndex((id: any) => id.equals(userId));
      
      if (index === -1) {
        post.likes.push(userId);
      } else {
        post.likes.splice(index, 1);
      }

      return post.save();
    })
    .then(updatedPost => res.json(updatedPost))
    .catch(error => res.status(500).json({ message: 'Server error', error }));
};

export const commentOnPost = (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  Post.findById(new mongoose.Types.ObjectId(id))
    .then((post: any) => {
      if (!post) return res.status(404).json({ message: 'Post not found' });

      post.comments.push({
        userId: new mongoose.Types.ObjectId(req.user.userId),
        content
      });

      return post.save();
    })
    .then(updatedPost => res.json(updatedPost))
    .catch(error => res.status(500).json({ message: 'Server error', error }));
};
