import { Link, useNavigate } from 'react-router-dom';
import { authStore } from '@stores/auth.store';

const Nav = () => {
		const logout = authStore((state) => state.logout);
		const navigate = useNavigate();

		const handleClose = (e) => {
				e.preventDefault();
				document.getElementById('confirm_logout').close()
		}

		const showDialog = (e) => {
				e.preventDefault();
				document.getElementById('confirm_logout').showModal();
		}

		const handleLogout = async (e) => {
				e.preventDefault(); // prevent navigation
				await logout();
				navigate('/login', { replace: true });
		};

		return (
						<>
								<dialog id="confirm_logout" className="modal">
										<div className="modal-box">
												<h3 className="font-bold text-lg">Logout</h3>
												<p className="py-4">Are you sure you want to logout?</p>
												<div className="modal-action">
														<form method="dialog">
																<button
																				className="btn btn-active btn-error px-3 mr-3"
																				onClick={handleLogout}
																>
																		Yes
																</button>
																<button
																				className="btn px-3"
																				onClick={handleClose}
																>
																		No
																</button>
														</form>
												</div>
										</div>
								</dialog>
								<ul
												tabIndex="-1"
												className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
								>
										<li><Link to="/">Home</Link></li>
										<li><Link to="/about">About</Link></li>
										<li>
												<Link to="/logout" onClick={showDialog}>
														Logout
												</Link>
										</li>
								</ul>
						</>
		)
}

export default Nav;