import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

interface ChangePasswordProps {}

interface IFormInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {};

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full max-w-md p-8 space-y-3 ">
        <div className="space-y-4">
          <div>
            <label className="block ">Current password</label>
            <Input
              {...register("currentPassword", { required: true })}
              type="password"
              className="w-full  mt-1     "
            />
            {errors.currentPassword && (
              <span className="text-red-500">required</span>
            )}
          </div>

          <div>
            <label className="block ">New password</label>
            <Input
              {...register("newPassword", { required: true, minLength: 8 })}
              type="password"
              className="w-full  mt-1     "
            />
            {errors.newPassword && (
              <span className="text-red-500">
                This field is required and should contain at least 8 characters.
              </span>
            )}
          </div>

          <div>
            <label className="block ">Confirm new password</label>
            <Input
              {...register("confirmPassword", {
                required: true,
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { newPassword } = getValues();
                    return newPassword === value || "Passwords should match!";
                  },
                },
              })}
              type="password"
              className="w-full  mt-1     "
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full  text-white"
          >
            Update password
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
