import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const getStepTitle = (pathname) => {
  switch(pathname) {
    case '/':
      return 'Upload File';
    case '/preview':
      return 'Edit Data';
    case '/confirm':
      return 'Proof Reading';
    case '/success':
      return 'Success';
    case '/analyze':
      return 'Analysis';
    default:
      return 'Upload File';
  }
};

const Navbar = () => {
  const location = useLocation();
  const currentStep = getStepTitle(location.pathname);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img
                className="h-12 w-auto"
                src="/logo.png"
                alt="Janakalyan Bank"
              />
            </Link>
          </div>
          <div className="flex items-center justify-center flex-1">
            <span className="text-accent2 font-semibold text-lg">
              {currentStep}
            </span>
          </div>
          <div className="w-48"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;