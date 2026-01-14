import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authStore } from '@stores/auth.store';

const Login = () => {
  const authenticateUser = authStore((state) => state.authenticateUser());
  const loading = authStore((state) => state.loading);
  const error = authStore((state) => state.error);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';
  
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await authenticateUser(
      form.email,
      form.password,
    );
    
    if(success) {
      navigate(from, { replace: true });
    }
  }
  
  return (
    <form 
      className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-[640px] border p-4"
      onSubmit={handleSubmit}
    >
      <fieldset className="fieldset w-full">
        <label className="label">Email</label>
        <input 
          type="email" 
          className="input validator w-full" 
          placeholder="Email" 
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required 
        />
        <p className="validator-hint hidden">Required</p>
      </fieldset>

      <label className="fieldset w-full">
        <span className="label">Password</span>
        <input 
          type="password" 
          className="input validator w-full" 
          placeholder="Password" 
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required 
        />
        <span className="validator-hint hidden">Required</span>
      </label>
      
      {error && (
        <p className="text-error mt-2 text-sm">
          {error}
        </p>
      )}
      
      <button
        className="btn btn-neutral mt-4"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      
      <button
        className="btn btn-ghost mt-1"
        type="reset"
        disabled={loading}
      >
        Reset
      </button>
    </form>
  )
}

export default Login
