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
				<img
					className="profile-img"
					src={heatherProfile}
					alt="heather-profile"
				/>
				<h2>Heather Yun</h2>
				<p className="title">Fullstack developer</p>
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
						<a target="_blank" href="https://www.linkedin.com/heatheryun">
							<i className="fab fa-linkedin-in" />
						</a>
					</li>
					<li>
						<a target="_blank" href="https://www.github.com/heathercoraje">
							<i className="fab fa-twitter" />
						</a>
					</li>
				</ul>
			</div>
			<div className="profile-card">
				<img className="profile-img" src={veredProfile} alt="vered-profile" />
				<h2>Vered</h2>
				<p className="title">
					UI | UX designer <br />Front End web developer
				</p>
				<p>
					I believe that I can make the world a better place through technology.
				</p>
				<ul className="profile-social-links">
					<li>
						<a target="_blank" href="https://github.com/veredrec">
							<i className="fab fa-github" />
						</a>
					</li>
					<li>
						<a target="_blank" href="https://www.linkedin.com/heatheryun">
							<i className="fab fa-linkedin-in" />
						</a>
					</li>
					<li>
						<a target="_blank" href="https://www.github.com/heathercoraje">
							<i className="fab fa-twitter" />
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
);

export default About;
