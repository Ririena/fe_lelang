import Footer from "@/components/ui/navigations/Footer";

const { default: Navbar } = require("@/components/ui/navigations/Navbar");

const LayoutLelang = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">{children}</main>
      <div className="mb-96"></div>
      <Footer/>
    </>
  );
};


export default LayoutLelang;