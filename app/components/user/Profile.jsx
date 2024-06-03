import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react'

function Profile() {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    country: '',
    city: '',
    zip: '',
    house_number: '',
    street_name: ''
  });
  const email = session?.user?.email
  const [loading, setLoading] = useState(false);
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic (Czechia)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor (Timor-Leste)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia (formerly Macedonia)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ]; 
  useEffect(() => {
    // Fetch user data from the API endpoint
    const email = session?.user?.email
    fetch(`/api/users/${email}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUserData({
            first_name: data?.result?.first_name,
            last_name: data?.result?.last_name,
            email: data?.result?.email,
            mobile: data?.result?.mobile,
            country: data?.result?.country,
            city: data?.result?.city,
            zip: data?.result?.zip,
            house_number: data?.result?.house_number,
            street_name: data?.result?.street_name
          });
        }
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const validateFields = () => {
    if (!countries.includes(userData.country)) {
      alert('Please enter a valid country. First letter of country name should be upper case');
      return false;
    }
    if (userData.mobile.length !== 10) {
      alert('Mobile number should be 10 digits long.');
      return false;
    }
    if (isNaN(userData.house_number)) {
      alert('House number must be a number.');
      return false;
    }
    return true;
  };

  const handleUpdateProfile = () => {
    if (!validateFields()) return; // Check if fields are valid
    setLoading(true); // Set loading to true while processing the request
    // Make PUT request to update user profile
    fetch(`/api/users/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle response
      console.log(data);
      setLoading(false); // Reset loading after successful update
    })
    .catch(error => {
      console.error('Error updating user profile:', error);
      setLoading(false); // Reset loading on error
    });
  };

  return (
    <div className="w-full" style={{  overflowY: 'scroll' }}>
      <h1 className="text-2xl py-6 text-center">Manage Your Profile</h1>
      <h1 className="text-center">Personal Information</h1>
      <div className="flex flex-wrap my-6 justify-center">
        <input 
          type='text' 
          placeholder='First Name *' 
          value={userData.first_name}
          required 
          className="w-72 border-black p-2 mx-2 my-1" 
          style={{borderWidth:'1px'}} 
        />
        <input 
          type='text' 
          placeholder='Last Name *' 
          value={userData.last_name}
          required 
          className="w-72 border-black p-2 mx-2 my-1" 
          style={{borderWidth:'1px'}} 
        />
      </div>
      
      <div className="my-2 flex flex-wrap justify-center">
        <input 
          type='email' 
          placeholder='Email *' 
          value={userData.email}
          required 
          className="w-72 border-black p-2 mx-2 my-1" 
          style={{borderWidth:'1px'}} 
        />
        <input 
          type='text' 
          placeholder='Mobile' 
          value={userData.mobile}
          required 
          className="w-72 border-black p-2 mx-2 my-1" 
          style={{borderWidth:'1px'}} 
          pattern="[0-9]*"
          onChange={(e) => setUserData({...userData, mobile: e.target.value})}
        />
      </div>
    
      <h1 className="text-center my-6">Address Information</h1>
      <div className="flex flex-wrap justify-center">
        <input 
          type='text' 
          placeholder='Country' 
          value={userData.country}
          required 
          className="w-72 border-black p-2 mx-1 my-1" 
          style={{borderWidth:'1px'}} 
          onChange={(e) => setUserData({...userData, country: e.target.value})}
        />
        <input 
          type='text' 
          placeholder='City' 
          value={userData.city}
          required 
          className="w-72 border-black p-2 mx-1 my-1" 
          style={{borderWidth:'1px'}}
          onChange={(e) => setUserData({...userData, city: e.target.value})} 
        />
      </div>
      <div className="flex flex-wrap my-2 justify-center">
        <input 
          type='text' 
          placeholder='ZIP' 
          value={userData.zip}
          required 
          className="w-72 border-black p-2 mx-1 my-1" 
          style={{borderWidth:'1px'}} 
          onChange={(e) => setUserData({...userData, zip: e.target.value})}
        />
        <input 
          type='number' 
          placeholder='House Number' 
          value={userData.house_number}
          required 
          className="w-72 border-black p-2 mx-1 my-1" 
          style={{borderWidth:'1px'}} 
          onChange={(e) => setUserData({...userData, house_number: e.target.value})}
        />
      </div>

      <div className="flex flex-wrap my-2 justify-center">
        <input 
          type='text' 
          placeholder='Street Name or Number' 
          value={userData.street_name}
          required 
          className="w-72 border-black p-2 mx-1 my-1" 
          style={{borderWidth:'1px'}} 
          onChange={(e) => setUserData({...userData, street_name: e.target.value})}
        />
      </div>

      <div className="flex justify-center my-6">
        {/* Update Profile button */}
        <button 
          className="bg-orange-600 text-white w-48 h-10 rounded-md"
          onClick={handleUpdateProfile}
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </div>
  )
}

export default Profile
