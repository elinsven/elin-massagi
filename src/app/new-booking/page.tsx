"use client";

import { Booking } from "@/schemas/booking";
import { MassageService } from "@/schemas/massageService";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../components/Input/Input";
import { useRouter } from "next/navigation";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { getMassageServices } from "../services/massageService";
import { format } from "date-fns";
import { createBooking } from "../services/booking";

const Page: React.FC = () => {
  const router = useRouter();

  const [data, setData] = useState<{ massageServices: MassageService[] }>({
    massageServices: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(await getMassageServices());
      } catch (error) {
        console.error("Error fetching massage services:", error);
      }
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Booking>({
    defaultValues: {
      booking_date: format(new Date(), "yyyy-MM-dd"),
      massage_service_id: 0,
    },
  });
  const onSubmit: SubmitHandler<Booking> = (data) => {
    const create = async () => {
      try {
        await createBooking(data);
        router.push("/");
      } catch (error) {
        console.error("Error creating booking:", error);
      }
    };

    create();
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
          name="massage_service_id"
          options={data.massageServices.map((massageService) => {
            return {
              value: massageService.massage_service_id as number,
              label: massageService.name,
            };
          })}
          register={register}
          errors={errors}
        />

        <Input
          label="Booking date"
          name="booking_date"
          type="date"
          register={register}
          errors={errors}
          required
        />

        <Input
          label="Start time"
          name="start_time"
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
