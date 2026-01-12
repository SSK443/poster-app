import config from "../config/config";
import { Client, Databases, Query, Storage, ID, type Models } from "appwrite";
interface CreatePostData {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: "active" | "inactive" | "draft";
  userId: string;
}
interface UpdatePostData {
  title?: string;
  content?: string;
  featuredImage?: string;
  status?: "active" | "inactive" | "draft";
}
class DbService {
  client: Client;
  databases: Databases;
  bucket: Storage;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.vite_appwrite_url)
      .setProject(config.vite_appwrite_project_id);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  //create a post
  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: CreatePostData): Promise<Models.Document> {
    try {
      return await this.databases.createDocument(
        config.vite_appwrite_db_id,
        config.vite_appwrite_collection_id,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  //update that post
  async updatePost(
    slug: string,
    { title, content, featuredImage, status }: UpdatePostData
  ): Promise<Models.Document> {
    try {
      return await this.databases.updateDocument(
        config.vite_appwrite_db_id,
        config.vite_appwrite_collection_id,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }
  //delete that post
  async deletePost(slug: string): Promise<boolean> {
    try {
      await this.databases.deleteDocument(
        config.vite_appwrite_db_id,
        config.vite_appwrite_collection_id,
        slug
      );
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
      return false;
    }
  }
  //get post by slug
  async getPost(slug: string): Promise<Models.Document> {
    try {
      return await this.databases.getDocument(
        config.vite_appwrite_db_id,
        config.vite_appwrite_collection_id,
        slug
      );
    } catch (error) {
      console.error("Error getting post:", error);
      throw error;
    }
  }
  //active all posts
  async getPosts(
    queries = [Query.equal("status", "active")]
  ): Promise<boolean | Models.DocumentList> {
    try {
      return await this.databases.listDocuments(
        config.vite_appwrite_db_id,
        config.vite_appwrite_collection_id,
        queries
      );
    } catch (error) {
      console.error("Error getting posts:", error);
      throw error;
      return false;
    }
  }
  //file upload service
  async uploadFile(file: File): Promise<Models.File> {
    try {
      return await this.bucket.createFile({
        bucketId: config.vite_appwrite_bucket_id,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
  //file delete service
  async deleteFile(fileId: string): Promise<boolean> {
    try {
      await this.bucket.deleteFile(config.vite_appwrite_bucket_id, fileId);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  //file preview service
  getFilePreview(fileId: string): string {
    return this.bucket.getFilePreview(config.vite_appwrite_bucket_id, fileId);
  }
}
const dbService = new DbService();

export default dbService;
