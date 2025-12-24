import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import {AppContext} from "../../context/AppContext"
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointments = () => {

    const {dToken, appointments, getAppointments} = useContext(DoctorContext)
    const {calculateAge, slotDateFormat} = useContext(AppContext)

    useEffect(()=> {
        if(dToken) {
            getAppointments()
        }
    }, [dToken])

    return ( 
        <div className="w-full max-w-6xl m-5">

            <p className="mb-3 text-lg font-medium">All Appointments</p>

            <div className="bg-white border border-neutral-200 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
                <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-neutral-200 border-b "
                    >
                    <p>#</p>
                    <p>Payment</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {
                    appointments.map((item, index) => (
                        <div className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b " key={index}>
                            <p>{index + 1}</p>

                            <div>
                                <img src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
                            </div>
                            <div>
                                <p>
                                    {item.payment ? 'Online' : 'Cach'}
                                </p>
                            </div>
                            <p>{item.userData.dob}</p>
                            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                            <p>$ {item.amount}</p>
                            <div>
                                <img src={assets.cancel_icon} alt="" />
                                <img src={assets.tick_icon} alt="" />
                            </div>
                        </div>
                    ))
                }
            </div>

            
            
        </div>
     );
}
 
export default DoctorAppointments;