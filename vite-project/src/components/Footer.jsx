import { assets } from "../assets/assets/assets_frontend/assets";

const Footer = () => {
    return ( 
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">

                {/* left section */}
                <div>
                    <img className="mb-5 w-40" src={assets.logo} alt="" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam fugit odio amet, consequatur autem hic fuga facilis natus voluptates minima omnis nam deserunt rem sunt officiis quos error in quis!</p>
                </div>

                {/* center section */}
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/* right section */}
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>+1-212-456-7890</li>
                        <li>amirdiablo7@gmail.com</li>
                    </ul>
                </div>

                {/* copy right text */}
                <div>
                    <br />
                    <p className="py-5 text-sm text-center">CopyRight 2025 © Prescripto - All Right Reserved</p>
                </div>

            </div>
        </div>
     );
}
 
export default Footer;