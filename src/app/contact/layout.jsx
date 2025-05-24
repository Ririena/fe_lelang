import Navbar from "@/components/ui/navigations/Navbar"

const ContactLayout = ({children}) => {
    return (
        <>
        <Navbar/>

        <main className="mx-auto container px-4">{children}</main>
        </>
    )
}

export default ContactLayout