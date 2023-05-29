'use client';

import { Toaster } from 'react-hot-toast';

/* we use this component as client parent of an external package which is Toaster, hence it will work well with nextjs */
const ToasterProvider = () => {
	return <Toaster />;
};

export default ToasterProvider;
