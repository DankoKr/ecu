import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocById } from "../utils/requests/getDocById.request";
import MainLayout from "../layouts/MainLayout";

const DocumentView = () => {
  const { fileId } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docData = await getDocById(fileId);
        setDocument(docData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDocument();
  }, [fileId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <MainLayout>
      <div className="max-w-[800px] mx-auto p-5 bg-[#f8f9fa] rounded-md shadow-md">
        <h2 className="mb-5 text-xl font-bold text-blue-800">
          {document.name}
        </h2>
        <div>
          <pre>{document.content}</pre>
          {/* Adjust based on your document structure */}
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentView;
