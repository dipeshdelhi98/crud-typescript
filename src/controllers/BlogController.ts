import { Request, Response } from 'express';
import Blog, { IBlog } from '../models/Blog';

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const items: IBlog[] = await Blog.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBlog = async (req: Request, res: Response) => {
  const itemId = req.params.id;

  try {
    const item: IBlog | null = await Blog.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createBlog = async (req: Request, res: Response) => {

  console.log(req.file,"req.bodyy")
  const { title, content } = req.body;


   const image = req?.file?.path;

  try {
    const newBlog: IBlog = new Blog({ title, content,image });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const itemId = req.params.id;
  const { title, content } = req.body;

  try {
    const item: IBlog | null = await Blog.findByIdAndUpdate(
      itemId,
      { title, content },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const itemId = req.params.id;

  try {
    const item: IBlog | null = await Blog.findByIdAndRemove(itemId);

    if (!item) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
