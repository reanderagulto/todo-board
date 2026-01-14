import { useState } from "react";
import {useNavigate, useLocation, Link} from 'react-router-dom';
import { authStore } from '@stores/auth.store';

const Register = () => {
		const loading = authStore((state) => state.loading);
		const error = authStore((state) => state.error);

		const navigate = useNavigate();
		const location = useLocation();

		const from = location.state?.from?.pathname || '/';

		const [form, setForm] = useState({
				email: '',
				password: '',
				first_name: '',
				last_name: '',
		});

		const handleSubmit = (e) => {
				e.preventDefault();
		}

		return (
						<div className="login-wrapper bg-base-200 border-base-300 rounded-box w-full max-w-[560px] border p-12">
								<h1 className="text-2xl mb-8 text-center">Create an account</h1>
								<form
												className="fieldset"
												onSubmit={handleSubmit}
								>
										<fieldset className="fieldset w-full">
												<input
																type="text"
																className="input validator w-full"
																placeholder="First Name"
																value={form.email}
																onChange={(e) =>
																				setForm({ ...form, email: e.target.value })
																}
																required
												/>
												<p className="validator-hint hidden">Required</p>
										</fieldset>

										<fieldset className="fieldset w-full">
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

										<fieldset className="fieldset w-full">
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
										</fieldset>

										<div className="fieldset w-full">
												<p className="mt-1 text-sm">
														Have an account?{' '}
														<Link to="/login" className="text-blue-500 underline">
																Login Here
														</Link>
												</p>
										</div>

										{error && (
														<p className="text-error mt-2 text-sm">
																{error}
														</p>
										)}

										<div className="flex items-center justify-center flex-wrap gap-[1rem] mt-7">
												<button
																className="btn btn-neutral w-full md:w-[calc(50%-1rem)] flex-grow mx-auto px-5"
																type="submit"
																disabled={loading}
												>
														{loading ? 'Logging in...' : 'Login'}
												</button>
										</div>
								</form>
						</div>
		)

}

export default Register;