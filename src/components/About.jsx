import React from 'react';
import veredProfile from '../../img/vered.jpeg';
import heatherProfile from '../../img/heather.jpg';
import hello from '../../img/hello.png';

const About = () => (
	<div className="about-container">
		<div className="header">
			<span>About us</span>
			<p>We are cool people. Get to know us</p>
		</div>
		<div className="profile-container">
			<div className="profile-card">
				<div className="profile-left">
					<img
						className="profile-img"
						src={heatherProfile}
						alt="heather-profile"
					/>
					<h2>Heather Yun</h2>
					<p className="title">Fullstack developer</p>
				</div>
				<div className="profile-right">
					<p>
						I enjoy making small and cute applications. Hey, small things matter
						in life. Connect with me on github or linkedin.
					</p>
					<ul className="profile-social-links">
						<li>
							<a target="_blank" href="https://www.github.com/heathercoraje">
								<i className="fab fa-github" />
							</a>
						</li>
						<li>
							<a
								target="_blank"
								href="https://www.linkedin.com/in/heuikyung-heather-yun-3796528a/"
							>
								<i className="fab fa-linkedin-in" />
							</a>
						</li>
						<li>
							<a target="_blank" href="https://twitter.com/heathercoraje18">
								<i className="fab fa-twitter" />
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="profile-card">
				<div className="profile-left">
					<img className="profile-img" src={veredProfile} alt="vered-profile" />
					<h2>Vered Rekanati</h2>
					<p className="title">
						UI | UX designer <br />Front End web developer
					</p>
				</div>
				<div className="profile-right">
					<p>
						Aiming to make the world a better place through technology and
						nonstandard education.
					</p>
					<ul className="profile-social-links">
						<li>
							<a target="_blank" href="https://github.com/veredrec">
								<i className="fab fa-github" />
							</a>
						</li>
						<li>
							<a
								target="_blank"
								href="https://www.linkedin.com/in/vered-rekanati-05204a76/"
							>
								<i className="fab fa-linkedin-in" />
							</a>
						</li>
						<li>
							<a target="_blank" href="https://twitter.com/veredrec">
								<i className="fab fa-twitter" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
);

export default About;
