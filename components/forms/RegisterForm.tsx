"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

const RegisterForm = ({ user }: { user: User }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			username: "",
			email: "",
			phone: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
		console.log(values);

		setIsLoading(true);

		try {
			const user = {
				name: values.username,
				email: values.email,
				phone: values.phone,
			};

			const newUser = await createUser(user);

			if (newUser) {
				router.push(`/patients/${newUser.$id}/register`);
			}
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
				<section className="mb-12 space-y-4">
					<h1 className="header">Hi there</h1>
					<p className="text-dark-700">Schedule your first appointment</p>
				</section>
				<CustomFormField
					control={form.control}
					fieldType={FormFieldType.INPUT}
					name="username"
					label="Full name"
					placeholder="John Doe"
					iconSrc="/assets/icons/user.svg"
					iconAlt="user"
				/>

				<SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
			</form>
		</Form>
	);
};
export default RegisterForm;
