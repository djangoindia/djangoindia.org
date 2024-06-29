import SignButton from "../ui/SignButton";
import Image from "next/image";
import logo from "../../../public/LogoDarkMode.svg";
const Navbar = () => {
    return ( 
        <>
        <section className="h-full w-full relative bg-black">
            <div className="h-20 w-full flex justify-around items-center">
                    {/* logo  */}
                    <div className="flex items-center justify-center">
                        <Image src={logo} alt="logo" className="mt-6 object-center"/>
                    </div>

                    {/* menu */}
                    <div className="flex gap-16 text-white justify-center items-center">
                        <div>
                            <a href="#">Home</a>
                        </div>
                        <div>
                            <a href="#">Events</a>
                        </div>
                        <div>
                            <a href="/Contactus">Contact Us</a>
                        </div>
                    </div>

                    {/* button */}
                    <SignButton color="white" text="Support us" tcol="black"/>
                    </div>

        </section>
        </>
     );
}
 
export default Navbar;