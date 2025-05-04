import Navbar from "@/components/ui/navigations/Navbar"

const ProfileLayout = ({children}) => {
    return (
        <>
        <Navbar/>

        <main className="mx-auto container px-4">{children}</main>
        </>
    )
}

export default ProfileLayout