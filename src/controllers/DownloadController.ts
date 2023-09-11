import { Request, Response } from 'express';
import { createObjectCsvWriter } from 'csv-writer';
import Blog, { IBlog } from '../models/Blog';


export const downloadBlogsAsCSV = async (req: Request, res: Response) => {
  try {
    const blogs: IBlog[] = await Blog.find({}, 'title content').lean();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=blogs.csv');

    const csvWriter = createObjectCsvWriter({
      path: 'blogs.csv', // Customize the file name and path
      header: [
        { id: 'title', title: 'Title' },
        { id: 'content', title: 'Content' },
      ],
    });

    // Write the CSV header
    await csvWriter.writeRecords([{
      title: 'Title',
      content: 'Content',
    }]);

    // Write the blog records
    await csvWriter.writeRecords(blogs);

    // End the response
    console.log("Success")
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
