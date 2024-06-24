import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getDocsBySector } from "../utils/requests/getDocsBySector.request";
import NoDocumentsView from "../components/NoDocumentsView";
import DocumentList from "../components/DocumentList";

function BoardMeetingMinutesPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const docsData = await getDocsBySector("Board Meeting Minutes");
        setDocs(docsData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

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
        <DocumentList title={"ECU Development Fund"} initialDocs={docs} />
      </div>
    </MainLayout>
  );
}

export default BoardMeetingMinutesPage;
