import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { articles as initialArticles } from "../data/articles";
import TenantDataTable from "../components/tenant/TenantDataTable";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Can from "../components/permissions/Can";
import { motion, AnimatePresence } from "framer-motion";

const Articles = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [editingArticle, setEditingArticle] = useState(null);
  const [creatingArticle, setCreatingArticle] = useState(false);
  const [viewingArticle, setViewingArticle] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    status: "draft",
  });
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const handleEdit = (article) => {
    setEditingArticle(article);
    setCreatingArticle(false);
  };

  const handleView = (article) => {
    setViewingArticle(article);
    setIsViewModalOpen(true);
  };

  const handleDelete = (article) => {
    setArticles(articles.filter((a) => a.id !== article.id));
    showToast(`Article "${article.title}" deleted successfully`, "success");
  };

  const handleSave = () => {
    if (editingArticle) {
      setArticles(
        articles.map((a) => (a.id === editingArticle.id ? editingArticle : a))
      );
      setEditingArticle(null);
      showToast("Article updated successfully", "success");
    }
  };

  const handleCancel = () => {
    setEditingArticle(null);
    setCreatingArticle(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingArticle) {
      setEditingArticle((prev) => ({ ...prev, [name]: value }));
    } else if (creatingArticle) {
      setNewArticle((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateClick = () => {
    setCreatingArticle(true);
    setEditingArticle(null);
    setNewArticle({
      title: "",
      content: "",
      status: "draft",
    });
  };

  const handleCreateSubmit = () => {
    // Validate form
    if (!newArticle.title.trim()) {
      showToast("Title is required", "error");
      return;
    }

    if (!newArticle.content.trim()) {
      showToast("Content is required", "error");
      return;
    }

    // Create new article
    const createdArticle = {
      id: Math.max(...articles.map((a) => a.id), 0) + 1, // Generate new ID
      title: newArticle.title,
      content: newArticle.content,
      status: newArticle.status,
      authorId: currentUser.id,
      tenantId: currentUser.tenantId,
      createdAt: new Date().toISOString(),
    };

    // Add to articles list
    setArticles([createdArticle, ...articles]);
    setCreatingArticle(false);
    showToast("Article created successfully", "success");
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingArticle(null);
  };

  // Modal component for viewing article
  const ViewArticleModal = () => {
    if (!viewingArticle || !isViewModalOpen) return null;

    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closeViewModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75 transition-colors duration-200"></div>
            </motion.div>

            {/* Modal panel */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <motion.div
              className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full transition-colors duration-200"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 transition-colors duration-200">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-white transition-colors duration-200"
                      id="modal-headline"
                    >
                      {viewingArticle.title}
                    </h3>

                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              viewingArticle.status === "published"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            } transition-colors duration-200`}
                          >
                            {viewingArticle.status}
                          </span>
                          <span>
                            {new Date(
                              viewingArticle.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <span>
                          Author:{" "}
                          {viewingArticle.authorId === currentUser.id
                            ? "You"
                            : `User ID: ${viewingArticle.authorId}`}
                        </span>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 transition-colors duration-200">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line transition-colors duration-200">
                          {viewingArticle.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse transition-colors duration-200">
                <Button onClick={closeViewModal} variant="outline">
                  Close
                </Button>
                <Can I="update" a={viewingArticle}>
                  <Button
                    onClick={() => {
                      closeViewModal();
                      handleEdit(viewingArticle);
                    }}
                    variant="primary"
                    className="mr-2"
                  >
                    Edit
                  </Button>
                </Can>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const columns = [
    {
      key: "title",
      header: "Title",
      render: (article) => (
        <div className="font-medium text-gray-900 dark:text-white transition-colors duration-200">
          {article.title}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (article) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            article.status === "published"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          } transition-colors duration-200`}
        >
          {article.status}
        </span>
      ),
    },
    {
      key: "authorId",
      header: "Author",
      render: (article) => (
        <div className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
          {article.authorId === currentUser.id
            ? "You"
            : `User ID: ${article.authorId}`}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (article) => (
        <div className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
          {new Date(article.createdAt).toLocaleDateString()}
        </div>
      ),
    },
  ];

  // Custom actions for the TenantDataTable
  const actions = [
    {
      render: (row) => (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleView(row);
            }}
          >
            View
          </Button>
        </motion.div>
      ),
    },
    {
      render: (row) => (
        <Can I="update" a={row}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(row);
              }}
            >
              Edit
            </Button>
          </motion.div>
        </Can>
      ),
    },
    {
      render: (row) => (
        <Can I="delete" a={row}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="danger"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row);
              }}
            >
              Delete
            </Button>
          </motion.div>
        </Can>
      ),
    },
  ];

  // Render article form (used for both editing and creating)
  const renderArticleForm = (isCreating = false) => {
    const article = isCreating ? newArticle : editingArticle;
    const title = isCreating ? "Create Article" : "Edit Article";
    const submitAction = isCreating ? handleCreateSubmit : handleSave;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          title={title}
          footer={
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={submitAction}>
                {isCreating ? "Create" : "Save Changes"}
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={article.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                placeholder="Enter article title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={article.content}
                onChange={handleChange}
                rows="6"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                placeholder="Enter article content"
                required
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={article.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
          Articles
        </h1>
        <Can I="create" a="Article">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleCreateClick}>Create Article</Button>
          </motion.div>
        </Can>
      </div>

      <AnimatePresence mode="wait">
        {editingArticle ? (
          renderArticleForm(false)
        ) : creatingArticle ? (
          renderArticleForm(true)
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <TenantDataTable
                data={articles}
                columns={columns}
                actions={actions}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRowClick={handleView}
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Article Modal */}
      <ViewArticleModal />
    </motion.div>
  );
};

export default Articles;
