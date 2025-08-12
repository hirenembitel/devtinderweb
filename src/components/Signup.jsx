import React, { useState } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const Signup = () => {
    const [form, setForm] = useState({
        firstname:"chetan",
        lastname:"kava",
        email:"chetan.kava@gmail.com",
        password:"Chetan@123",
        confirm:"Chetan@123",
        age:"40",
        gender:"Male",
        skills:"Magento",
        terms: false,
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [errormessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.firstname.trim()) e.firstname = "First Name is required";
        if (!form.lastname.trim()) e.lastname = "Last Name is required";
        if (!form.email) e.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
        if (!form.password) e.password = "Password is required";
        else if (form.password.length < 8) e.password = "Password must be at least 8 characters";
        if (!form.confirm) e.confirm = "Confirm your password";
        else if (form.password !== form.confirm) e.confirm = "Passwords do not match";
        if (!form.age) e.age = "Age is required";
        else if (isNaN(form.age) || form.age <= 0)
        e.age = "Enter a valid positive number";
        if (!form.gender) e.gender = "Please select a gender";
        if (!form.terms) e.terms = "You must accept terms and conditions";
        if (!form.skills.trim()) e.skills = "Skills are required";
         setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (key) => (ev) => {
    const value = key === "terms" ? ev.target.checked : ev.target.value;
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((old) => ({ ...old, [key]: undefined }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const result = await axios.post(API_BASE_URL+"/signup",form);
            setSuccess(true);
            setErrorMessage(false);
        }catch(error) {
            setErrorMessage(error.response.data.message);
            setSuccess(false);
        }
        setLoading(false);
    }

   return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Create your account</h2>

        {success && (
          <div className="p-4 rounded-lg bg-green-50 border border-green-100 mb-4">
            Signup successful! Check your email to verify your account.
          </div>
        )}
        {errormessage && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-100 mb-4">
            {errormessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex-1 overflow-auto p-4 space-y-4">
          <div>
            <input
              value={form.firstname}
              onChange={handleChange("firstname")}
              className={`w-full border rounded-xl px-4 py-2 ${errors.firstname ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="First Name"
            />
            {errors.firstname && <p className="text-red-600 text-sm">{errors.firstname}</p>}
          </div>
          <div>
            <input
              value={form.lastname}
              onChange={handleChange("lastname")}
              className={`w-full border rounded-xl px-4 py-2 ${errors.lastname ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Last Name"
            />
            {errors.lastname && <p className="text-red-600 text-sm">{errors.lastname}</p>}
          </div>

          <div>
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              className={`w-full border rounded-xl px-4 py-2 ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Email address"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              className={`w-full border rounded-xl px-4 py-2 ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Password"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              value={form.confirm}
              onChange={handleChange("confirm")}
              className={`w-full border rounded-xl px-4 py-2 ${errors.confirm ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Confirm password"
            />
            {errors.confirm && <p className="text-red-600 text-sm">{errors.confirm}</p>}
          </div>

          <div>
            <input
              type="number"  
              value={form.age}
              onChange={handleChange("age")}
              className={`w-full border rounded-xl px-4 py-2 ${errors.age ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Age"
            />
            {errors.age && <p className="text-red-600 text-sm">{errors.age}</p>}
          </div>

          <div>
            <select
                className={`w-full border rounded-xl px-4 py-2 ${errors.gender ? 'border-red-400' : 'border-gray-200'}`}
                name="gender"
                value={form.gender}
                onChange={handleChange("gender")}
                >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
          </div>

          <div>
            <input
              value={form.skills}
              onChange={handleChange("skills")}
              className={`w-full border rounded-xl px-4 py-2 ${errors.skills ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Skills"
            />
            {errors.skills && <p className="text-red-600 text-sm">{errors.skills}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input id="terms" type="checkbox" checked={form.terms} onChange={handleChange('terms')} className="h-4 w-4 rounded" />
            <label htmlFor="terms" className="text-sm">I agree to the Terms & Conditions</label>
          </div>
          {errors.terms && <p className="text-red-600 text-sm">{errors.terms}</p>}

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded-xl py-2">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup