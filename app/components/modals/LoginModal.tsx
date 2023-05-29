'use client';

import { useCallback, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import { toast } from 'react-hot-toast';
import Button from '../Button';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
	const router = useRouter();

	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true);

		signIn('credentials', {
			...data,
			redirect: false
		}).then(callback => {
			setIsLoading(false);

			if (callback?.error) {
				toast.error(callback.error);
				return;
			}

			if (callback?.ok) {
				toast.success('Logged in');
				router.refresh();
				loginModal.onClose();
			}
		});
	};

	const toggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome back"
				subtitle="Login to your account"
			/>

			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>

			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Continuo with Google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>

			<Button
				outline
				label="Continuo with Github"
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>

			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="flex flex-row items-center gap-2 justify-center">
					<div>First time using Airbnb?</div>

					<div
						onClick={toggle}
						className="text-neutral-800 cursor-pointer hover:underline"
					>
						Create an account
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Continuo"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
