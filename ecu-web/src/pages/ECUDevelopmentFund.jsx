import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getDocsBySector } from "../utils/requests/getDocsBySector.request";
import { Link } from "react-router-dom";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (docs.length === 0) return <div>There are no docs for this sector...</div>;

  return (
    <MainLayout>
      <div className="max-w-[800px] mx-auto p-5 bg-[#f8f9fa] rounded-md shadow-md">
        <h2 className="mb-5 text-xl font-bold text-blue-800">
          ECU Development Fund
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          {docs.map((doc) => (
            <li key={doc.id}>
              <Link to={`/documents/${doc.id}`}>
                {doc.name} ({doc.mimeType})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
}

export default ECUDevelopmentFund;
