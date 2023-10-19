// import {useState} from "react";
//
// export default function CreateRestaurant() {
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         location: '',
//         foodType: '',
//         contactInfo: '',
//         rating: '',
//     });
//
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         // Send the form data to a server or handle it as needed
//         // You can use Fetch API, Axios, or any other method to send the data.
//
//         console.log('Restaurant data:', formData);
//     };
//
//     return (
//         <div>
//             <h1>Create a Restaurant</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>Name:
//                     <input type="text" name="name" value={formData.name} onChange={handleChange} />
//                 </label>
//                 <label>Description:
//                     <textarea name="description" value={formData.description} onChange={handleChange} />
//                 </label>
//                 <label>Address:
//                     <input type="text" name="address" value={formData.address} onChange={handleChange} />
//                 </label>
//                 {/* Add more form fields as needed */}
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }