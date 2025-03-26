
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from '@/components/ui/input-otp';

// OTP validation schema
const otpSchema = z.object({
  otp: z.string().min(4, { message: "Please enter a valid 4-digit OTP" }),
});

export type OTPFormValues = z.infer<typeof otpSchema>;

interface OTPInputFormProps {
  onSubmit: (values: OTPFormValues) => void;
  isSubmitting: boolean;
}

const OTPInputForm: React.FC<OTPInputFormProps> = ({ 
  onSubmit, 
  isSubmitting 
}) => {
  // Initialize form
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="text-center">
              <FormControl>
                <InputOTP 
                  maxLength={4} 
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  render={({ slots }) => (
                    <InputOTPGroup className="gap-3 justify-center">
                      {slots.map((slot, i) => (
                        <InputOTPSlot 
                          key={i} 
                          {...slot} 
                          index={i} 
                          className="w-14 h-14 text-lg font-semibold border-2 rounded-xl border-gray-300 focus:border-primary-500 focus-within:border-primary-500"
                        />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </FormControl>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-primary-500 hover:bg-primary-600 py-5 rounded-xl font-medium text-lg" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>
    </Form>
  );
};

export default OTPInputForm;
