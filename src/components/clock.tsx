'use client'
import React, { useEffect, useState } from "react";
import Clock from 'react-live-clock';

export default function RealTimeClock() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, [])

	return (
	<div className="flex flex-col justify-center items-center p-4">
	<h3 className="text-green-600">Digital Clock</h3>
	{ mounted && <Clock
		format={'h:mm:ss a'}
		style={{fontSize: '1.5em'}}
		ticking={true} /> }
	</div>
);
}
