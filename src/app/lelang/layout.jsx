const { default: Navbar } = require("@/components/ui/navigations/Navbar");

const LayoutLelang = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">{children}</main>
    </>
  );
};


export default LayoutLelang;