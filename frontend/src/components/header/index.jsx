import { FiBell } from 'react-icons/fi';

const Header = () => {
  return (
    <>
      <div className="w-full border-b-[#333] border-b-[0.4px] text-white">
        <div className="container mx-auto flex justify-between items-center p-5">
          <div className="font-Kinn">
            <h1>Novu Donate</h1>
          </div>
          <div className="logo">
            <FiBell />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
