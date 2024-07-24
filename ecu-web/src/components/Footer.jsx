import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-slate-700 m-4 shadow rounded-xl">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-40" alt="ECU Intranet Logo" />
            <span className="self-center text-2xl text-white font-semibold whitespace-nowrap">
              ECU Intranet
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
            <li>
              <a
                href="https://www.cheerunion.eu/contact_us/"
                className="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://www.cheerunion.eu/contact_us/"
                className="hover:underline"
              >
                Contact Support
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-white sm:text-center">
          © 2024 {""}
          <a href="/">ECU Intranet</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
