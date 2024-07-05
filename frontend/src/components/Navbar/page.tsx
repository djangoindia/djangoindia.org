import SignButton from "../ui/SignButton";
import Image from "next/image";
import logo from "/whatIsDjango/Logo.svg";
const Navbar = () => {
    return <>
    <section className="h-full w-full relative bg-[#C1CAD2]">
        <div className="h-20 w-full flex justify-around items-center">
                {/* logo  */}
                <div className="flex items-center justify-center">
                    <Image
                        src="/whatIsDjango/Logo.svg"
                        width={121}
                        height={42}
                        alt="logo"
                        className=" object-center"
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }} />
                </div>

                {/* menu */}
                <div className="flex font-semibold gap-16 text-black justify-center items-center">
                    <div>
                        <a href="/">Home</a>
                    </div>
                    <div>
                        <a href="#">Events</a>
                    </div>
                    <div>
                        <a href="/Contactus">Contact Us</a>
                    </div>
                </div>

                {/* button */}
                <SignButton color="black" text="Support us" tcol="white"/>
                </div>

    </section>
    </>;
}
 
export default Navbar;