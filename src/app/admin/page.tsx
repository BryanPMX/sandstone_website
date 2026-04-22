"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";

interface Post {
  filename: string;
  title: string;
  imageUrl?: string;
  description?: string;
  content: string;
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingContentImage, setIsUploadingContentImage] = useState(false);
  const featuredImageInputRef = useRef<HTMLInputElement | null>(null);
  const contentImageInputRef = useRef<HTMLInputElement | null>(null);

  // Load posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImageFile = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.url as string;
  };

  const handleFeaturedImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const url = await uploadImageFile(file);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
      alert("Failed to upload featured image.");
    } finally {
      setIsUploadingImage(false);
      if (featuredImageInputRef.current) featuredImageInputRef.current.value = "";
    }
  };

  const handleContentImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingContentImage(true);
    try {
      const url = await uploadImageFile(file);
      setContent((current) => `${current}\n\n![Uploaded image](${url})\n\n`);
    } catch (error) {
      console.error(error);
      alert("Failed to upload content image.");
    } finally {
      setIsUploadingContentImage(false);
      if (contentImageInputRef.current) contentImageInputRef.current.value = "";
    }
  };

  const triggerFeaturedImageUpload = () => {
    featuredImageInputRef.current?.click();
  };

  const triggerContentImageUpload = () => {
    contentImageInputRef.current?.click();
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setDescription(post.description ?? "");
    setImageUrl(post.imageUrl ?? "");
    setContent(post.content);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingPost(null);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setContent("");
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    try {
      const response = await fetch("/api/posts", {
        method: editingPost ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          content,
          oldFilename: editingPost?.filename,
        }),
      });

      if (response.ok) {
        fetchPosts();
        handleCancel();
        alert(editingPost ? "Post updated!" : "Post created!");
      } else {
        alert("Error saving post");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error saving post");
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });

      if (response.ok) {
        fetchPosts();
        alert("Post deleted!");
      } else {
        alert("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post");
    }
  };

  const handleCancel = () => {
    setEditingPost(null);
    setIsCreating(false);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setContent("");
  };

  // Editor view
  if (isCreating || editingPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Posts
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">
              {editingPost ? "Edit Post" : "Create New Post"}
            </h1>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Post Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Post Featured Image
                </label>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={triggerFeaturedImageUpload}
                    className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    {isUploadingImage
                      ? "Uploading image..."
                      : imageUrl
                      ? "Replace featured image"
                      : "Upload featured image"}
                  </button>
                  <input
                    ref={featuredImageInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFeaturedImageSelect}
                  />
                  {imageUrl ? (
                    <div className="overflow-hidden rounded-xl border border-slate-200">
                      <img
                        src={imageUrl}
                        alt="Featured"
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">
                      Upload an image to use as the featured blog image.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Post Description
                </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a short description for the blog post..."
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Post Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content here (Markdown supported)..."
                    rows={12}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  />
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500">
                      💡 Tip: You can use Markdown formatting.
                      <a
                        href="https://www.markdownguide.org/basic-syntax/"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-1 text-blue-600 hover:underline"
                      >
                        View formatting commands
                      </a>
                    </p>
                    <button
                      type="button"
                      onClick={triggerContentImageUpload}
                      className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      {isUploadingContentImage ? "Uploading…" : "Upload image into content"}
                    </button>
                  </div>
                  <input
                    ref={contentImageInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleContentImageSelect}
                  />
                </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition"
                >
                  {editingPost ? "Update Post" : "Create Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block"
            >
              ← Back to Website
            </Link>
            <h1 className="text-4xl font-bold text-slate-900">Blog Manager</h1>
            <p className="text-slate-600 mt-2">Manage your blog posts</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <p className="text-slate-600">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-600 mb-4">No blog posts yet</p>
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition"
              >
                <Plus className="w-4 h-4" />
                Create First Post
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {posts.map((post) => (
                <div
                  key={post.filename}
                  className="p-6 hover:bg-slate-50 transition flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {post.filename}.md
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.filename)}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
