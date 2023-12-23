"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { MassageService } from "@/types/MassageService";
import EmptyState from "../components/EmptyState/EmptyState";
import { groq } from "next-sanity";
import { client } from "../../../sanity/lib/client";
import Input from "../components/Input/Input";
import { useRouter } from "next/navigation";
import Select from "../components/Select/Select";
import Button from "../components/Button/Button";

interface BookingFormInputs {
  massageService: string;
  bookingDate: Date;
  startTime: string;
}

const MassageServiceList: React.FC<{ services: MassageService[] }> = ({
  services,
}) => {
  return (
    <div role="radiogroup" aria-labelledby="select-service">
      <h2 id="select-service">Select Service</h2>
      {services.length ? (
        services.map((service: MassageService) => (
          <label key={service._id}>
            <input type="radio" name="services" value={service.name} />
            {service.name}
          </label>
        ))
      ) : (
        <EmptyState title="" body="" />
      )}
    </div>
  );
};

const NewBooking: React.FC = () => {
  /* const query = groq`*[_type == "massageService"]`;
  const services: MassageService[] = await client.fetch(query); */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormInputs>();
  const router = useRouter();
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
        />

        <Input
          label="Start time"
          name="startTime"
          type="time"
          register={register}
          errors={errors}
        />

        <div>
          <Button type="submit">Book</Button>
        </div>
      </form>
    </section>
  );
};

export default NewBooking;
