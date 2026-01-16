import { useState } from "react";
import {useNavigate, Link} from 'react-router-dom';
import { authStore } from '@stores/auth.store';

const Register = () => {
		const loading = authStore((state) => state.loading);
		const [error, setError] = useState(authStore((state) => state.error));

		const navigate = useNavigate();

		const [form, setForm] = useState({
				email: '',
				password: '',
				confirmPassword: '',
				first_name: '',
				last_name: '',
		});

		const handleSubmit = async (e) => {
				e.preventDefault();

				setError(null);

				if (form.password !== form.confirmPassword) {
						setError("Passwords do not match!");
						return;
				}

				const success = await authStore.getState().registerUser(form);

				if(!success) {
						setError(authStore.getState().error);
				}

				if(success) {
						navigate('/login');
				}

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
																className="input validator w-full px-3"
																placeholder="First Name"
																value={form.first_name}
																onChange={(e) =>
																				setForm({ ...form, first_name: e.target.value })
																}
																required
												/>
												<p className="validator-hint hidden">Required</p>
										</fieldset>

										<fieldset className="fieldset w-full mt-2">
												<input
																type="text"
																className="input validator w-full px-3"
																placeholder="Last Name"
																value={form.last_name}
																onChange={(e) =>
																				setForm({ ...form, last_name: e.target.value })
																}
																required
												/>
												<p className="validator-hint hidden">Required</p>
										</fieldset>

										<fieldset className="fieldset w-full mt-2">
												<input
																type="email"
																className="input validator w-full px-3"
																placeholder="Email"
																value={form.email}
																onChange={(e) =>
																				setForm({ ...form, email: e.target.value })
																}
																required
												/>
												<p className="validator-hint hidden">Required</p>
										</fieldset>

										<fieldset className="fieldset w-full mt-2">
												<input
																type="password"
																className="input validator w-full px-3"
																placeholder="Password"
																value={form.password}
																onChange={(e) =>
																				setForm({ ...form, password: e.target.value })
																}
																required
												/>
												<span className="validator-hint hidden">Required</span>
										</fieldset>

										<fieldset className="fieldset w-full mt-2">
												<input
																type="password"
																className="input validator w-full px-3"
																placeholder="Confirm Password"
																value={form.confirmPassword}
																onChange={(e) =>
																				setForm({ ...form, confirmPassword: e.target.value })
																}
																required
												/>
												<span className="validator-hint hidden">Required</span>
										</fieldset>

										{error && (
														<p className="text-error mt-2 text-sm">
																{error}
														</p>
										)}

										<div className="fieldset w-full">
												<p className="mt-1 text-sm">
														Have an account?{' '}
														<Link to="/login" className="text-blue-500 underline">
																Login Here
														</Link>
												</p>
										</div>

										<div className="flex items-center justify-center flex-wrap gap-[1rem] mt-7">
												<button
																className="btn btn-neutral w-full md:w-[calc(50%-1rem)] flex-grow mx-auto px-5"
																type="submit"
																disabled={loading}
												>
														{loading ? 'Loading...' : 'Register'}
												</button>
										</div>
								</form>
						</div>
		)

}

export default Register;