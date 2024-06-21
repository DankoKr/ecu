import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getDocsBySector } from "../utils/requests/getDocsBySector.request";
import { getDocById } from "../utils/requests/getDocById.request";
import NoDocumentsView from "../components/NoDocumentsView";

function ECUDevelopmentFund() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const docsData = await getDocsBySector("ECU Development Fund");
        setDocs(docsData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (docs.length === 0) return <NoDocumentsView />;

  return (
    <MainLayout>
      <div className="max-w-[800px] mx-auto p-5 bg-[#f8f9fa] rounded-md shadow-md">
        <h2 className="mb-5 text-2xl font-bold text-blue-800">
          ECU Development Fund
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          {docs.map((doc) => (
            <li
              key={doc.id}
              onClick={() => handleDownload(doc.id, doc.name)}
              className="cursor-pointer hover:underline text-xl"
            >
              <span>{doc.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
}

export default ECUDevelopmentFund;
