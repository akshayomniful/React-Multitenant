import React from "react";

const Step2 = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    updateFormData({ tags });
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags.join(", ")}
          onChange={handleTagsChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Visibility
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="private"
              name="visibility"
              value="private"
              checked={formData.visibility === "private"}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor="private"
              className="ml-2 block text-sm text-gray-700"
            >
              Private
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="public"
              name="visibility"
              value="public"
              checked={formData.visibility === "public"}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor="public"
              className="ml-2 block text-sm text-gray-700"
            >
              Public
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="restricted"
              name="visibility"
              value="restricted"
              checked={formData.visibility === "restricted"}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor="restricted"
              className="ml-2 block text-sm text-gray-700"
            >
              Restricted (Tenant Only)
            </label>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="publishDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Publish Date
        </label>
        <input
          type="date"
          id="publishDate"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default Step2;
