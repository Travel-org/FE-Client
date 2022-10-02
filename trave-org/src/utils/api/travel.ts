import { Api } from "../api";

interface createProps {
  title: string;
  userId: number;
  startDate: Date;
  endDate: Date;
}

export const createTravel = async ({
  startDate,
  endDate,
  title,
  userId,
}: createProps) =>
  await Api.post(`/api/v1/travels?userId=1`, {
    endDate,
    startDate,
    title,
    userId,
  });