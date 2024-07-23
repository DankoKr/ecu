import MainLayout from "../layouts/MainLayout";

function NationalFederationsPage() {
  const federations = [
    {
      country: "USA",
      federation: "USA National Federation",
      email: "info@usafederation.org",
      website: "https://www.usafederation.org",
    },
    {
      country: "Canada",
      federation: "Canada National Federation",
      email: "info@canadafederation.ca",
      website: "https://www.canadafederation.ca",
    },
    {
      country: "Germany",
      federation: "Germany National Federation",
      email: "info@germanyfederation.de",
      website: "https://www.germanyfederation.de",
    },
  ];

  return (
    <MainLayout>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                National Federation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-mail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {federations.map((federation, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  {federation.country}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {federation.federation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {federation.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={federation.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {federation.website}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default NationalFederationsPage;
