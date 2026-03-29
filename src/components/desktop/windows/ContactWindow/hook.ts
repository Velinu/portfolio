
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { type ContactFormData, contactWindowSchema } from './schema';
import { sendEmail } from '@/lib/actions/sendEmail';
import {
    useMutation
} from '@tanstack/react-query'

export const useContactWindow = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactWindowSchema),
    });

    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationFn: async (data: ContactFormData) => {
            await sendEmail(data);
        },
        onSuccess: () => {
            reset();
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutate(data);
    });

    return { register, onSubmit, errors, isSubmitting, isPending, error, isSuccess };
}