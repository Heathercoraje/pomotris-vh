const raf = (global.RequestAnimationFrame = cb => {
	setTimeout(cb, 0);
});

export default raf;
