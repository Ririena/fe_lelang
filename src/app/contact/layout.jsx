import Footer from "@/components/ui/navigations/Footer"
import Navbar from "@/components/ui/navigations/Navbar"

const ContactLayout = ({children}) => {
    return (
        <>
        <Navbar/>

        <main className="mx-auto container px-4">{children}</main>
        <Footer className="mt-96"/>
        </>
    )
}

export default ContactLayout