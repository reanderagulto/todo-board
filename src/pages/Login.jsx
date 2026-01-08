import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authStore } from '@stores/auth.store';

const Login = () => {
  const authenticateUser = authStore((state) => state.authenticateUser);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = authenticateUser(form.username, form.password);

    if (success) {
      navigate(from, { replace: true });
    } else {
      alert('Invalid credentials');
    }
  };

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
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
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

      <button className="btn btn-neutral mt-4" type="submit">Login</button>
      <button className="btn btn-ghost mt-1" type="reset">Reset</button>
    </form>
  )
}

export default Login
