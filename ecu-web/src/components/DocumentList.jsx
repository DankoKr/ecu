import PropTypes from "prop-types";
import { useState, useContext } from "react";
import AuthContext from "../utils/auth/AuthContext";
import { getDocById } from "../utils/requests/getDocById.request";
import { deleteData } from "../utils/requests/deleteData.request";
import ConfirmationDialog from "./ConfirmationDialog";
import NoDocumentsView from "./NoDocumentsView";
import MainLayout from "../layouts/MainLayout";

export default function DocumentList({ initialDocs, title }) {
  const [docs, setDocs] = useState(initialDocs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null);
  const { user } = useContext(AuthContext);
  const isAdmin = user.role === "ADMIN";

  const handleDownload = async (fileId, fileName) => {
    try {
      const blobData = await getDocById(fileId); // Fetch blob data for the file
      const url = window.URL.createObjectURL(new Blob([blobData]));

      // Create a link element and click it to trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // Set the file name for download
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Error downloading document:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteData(currentDocId, "/files");
      setDocs(docs.filter((doc) => doc.id !== currentDocId));
      setIsDialogOpen(false);
      setCurrentDocId(null);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  const openConfirmationDialog = (id) => {
    setCurrentDocId(id);
    setIsDialogOpen(true);
  };

  if (docs.length === 0)
    return (
      <MainLayout>
        <NoDocumentsView />
      </MainLayout>
    );

  return (
    <>
      <h2 className="mb-5 text-2xl font-bold text-blue-800">{title}</h2>
      <ul className="list-disc pl-5 space-y-2">
        {docs.map((doc) => (
          <li key={doc.id} className="flex items-center cursor-pointer text-xl">
            <span
              onClick={() => handleDownload(doc.id, doc.name)}
              className="hover:underline flex-grow"
            >
              {doc.name}
            </span>
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the download when clicking delete
                  openConfirmationDialog(doc.id);
                }}
                className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this document?"
      />
    </>
  );
}

DocumentList.propTypes = {
  initialDocs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};
