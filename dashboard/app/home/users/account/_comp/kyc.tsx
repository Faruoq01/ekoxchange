"use client";
import { motion } from "framer-motion";

const KYCDocumentsTab = () => {
  const documents = [
    {
      name: "Passport",
      date: "2023-01-16",
      status: "Verified",
      color: "green",
    },
    {
      name: "Proof of Address",
      date: "2023-01-16",
      status: "Pending",
      color: "yellow",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h4 className="text-lg font-semibold mb-4">KYC Documents</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc, i) => (
          <div
            key={i}
            className="border border-border-light dark:border-border-dark rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-text-light dark:text-text-dark">
                  Uploaded: {doc.date}
                </p>
              </div>
              <span
                className={`bg-${doc.color}-100 text-${doc.color}-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-${doc.color}-900 dark:text-${doc.color}-300`}
              >
                {doc.status}
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="text-primary text-sm font-medium hover:underline">
                View
              </button>
              <button className="text-primary text-sm font-medium hover:underline">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 bg-primary/10 text-primary flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/20 text-sm">
        <span className="material-icons text-base">upload_file</span>
        <span>Upload New Document</span>
      </button>
    </motion.div>
  );
};

export default KYCDocumentsTab;
