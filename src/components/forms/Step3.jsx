import React from "react";

const Step3 = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="additionalInfo"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Additional Information
        </label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="text-blue-800 font-medium mb-2">Form Summary</h4>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Title:</span>{" "}
            {formData.title || "Not provided"}
          </p>
          <p>
            <span className="font-medium">Description:</span>{" "}
            {formData.description || "Not provided"}
          </p>
          <p>
            <span className="font-medium">Category:</span>{" "}
            {formData.category || "Not selected"}
          </p>
          <p>
            <span className="font-medium">Tags:</span>{" "}
            {formData.tags.length > 0 ? formData.tags.join(", ") : "None"}
          </p>
          <p>
            <span className="font-medium">Visibility:</span>{" "}
            {formData.visibility}
          </p>
          <p>
            <span className="font-medium">Publish Date:</span>{" "}
            {formData.publishDate || "Not set"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step3;
