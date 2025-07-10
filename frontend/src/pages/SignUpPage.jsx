import { Mail, MessageSquare, User } from 'lucide-react';
import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
const SignUpPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    phone: '',
  });

  const { singup, isSigningUp } = useAuthStore();

  const vaildateForm = () => {
    const { username, email, password, firstName, phone } = formData;
    if (!username || !email || !password || !firstName || !phone) {
      toast.error('Please fill all fields');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
      <div className="flex flex-col justify-center items-center p-6 sm:p-2">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
 
          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Form fields go here */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Username</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="size-5 text-base-content/40" />
                  </div>
                  <input 
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="Sul6an"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  />
                </div>
              </div>

            { /* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input 
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="test@gmail.com"
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MessageSquare className="size-5 text-base-content/40" />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  className="input input-bordered w-full pl-10"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            {/* Phone number only numbers*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MessageSquare className="size-5 text-base-content/40" />
                </div>
                <input 
                  type="tel"
                  pattern="[0-9]*"
                  className="input input-bordered w-full pl-10"
                  placeholder="+966123456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>
            {/* Submit Button */}
            <div className="form-control mt-6">
              <button 
                type="submit"
                className={`btn btn-primary ${isSigningUp ? 'loading' : ''}`}
                onClick={handleSubmit}
              >
                {isSigningUp ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
            {/* Already have an account? */}
            <div className="text-center text-sm text-base-content/60">
              Already have an account?{' '}
              <a href="/login" className="link link-primary">
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* background image */}
      {/* <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url(/path/to/your/background.jpg)' }}></div> */}
    </div>
  );
};

export default SignUpPage;