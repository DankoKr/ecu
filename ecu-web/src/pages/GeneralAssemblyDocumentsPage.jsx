import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getDocsBySector } from "../utils/requests/getDocsBySector.request";
import NoDocumentsView from "../components/NoDocumentsView";
import DocumentList from "../components/DocumentList";

function GeneralAssemblyDocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const docsData = await getDocsBySector("General Assembly Documents");
        setDocs(docsData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDocs();
  }, [docs]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (docs.length === 0)
    return (
      <MainLayout>
        <NoDocumentsView />
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="max-w-[800px] mx-auto p-5 bg-[#f8f9fa] rounded-md shadow-md">
        <DocumentList title={"General Assembly Documents"} initialDocs={docs} />
      </div>
    </MainLayout>
  );
}

export default GeneralAssemblyDocumentsPage;
