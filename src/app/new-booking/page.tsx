"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/Input/Input";
import { useRouter } from "next/navigation";
import Select from "../components/Select/Select";
import Button from "../components/Button/Button";

interface BookingFormInputs {
  massageService: string;
  bookingDate: Date;
  startTime: string;
}

const Page: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormInputs>();
  const onSubmit: SubmitHandler<BookingFormInputs> = (data) => {
    router.push("/");
    console.log(data);
  };

  return (
    <section>
      <h1>New booking</h1>
      <p className="subtitle">
        Indulge in ultimate relaxation and choose from our exquisite range of
        massage services tailored to rejuvenate your mind and body.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          label="Massage service"
          name="massageService"
          options={[{ value: "1", label: "Foot Massage" }]}
          register={register}
          errors={errors}
        />

        <Input
          label="Booking date"
          name="bookingDate"
          type="date"
          register={register}
          errors={errors}
          required
        />

        <Input
          label="Start time"
          name="startTime"
          type="time"
          register={register}
          errors={errors}
          required
        />

        <div>
          <Button type="submit">Book</Button>
        </div>
      </form>
    </section>
  );
};

export default Page;
