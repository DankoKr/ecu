import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MainLayout from "../layouts/MainLayout";
import { getDocsBySector } from "../utils/requests/getDocsBySector.request";
import NoDocumentsView from "../components/NoDocumentsView";
import DocumentList from "../components/DocumentList";

function GeneralDocumentsPage({ pageTitle }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const docsData = await getDocsBySector(pageTitle);
        setDocs(docsData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDocs();
  }, [pageTitle, docs]);

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
        <DocumentList title={pageTitle} initialDocs={docs} />
      </div>
    </MainLayout>
  );
}

export default GeneralDocumentsPage;

GeneralDocumentsPage.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};
