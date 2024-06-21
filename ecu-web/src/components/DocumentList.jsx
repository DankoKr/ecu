import PropTypes from "prop-types";
import { getDocById } from "../utils/requests/getDocById.request";

export default function DocumentList({ docs, title }) {
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
  return (
    <>
      <h2 className="mb-5 text-2xl font-bold text-blue-800">{title}</h2>
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
    </>
  );
}

DocumentList.propTypes = {
  docs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};
