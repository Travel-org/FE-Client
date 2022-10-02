import { Api } from "../api";

interface createProps {
  title: string;
  userEmails: string[];
  startDate: string;
  endDate: string;
}
export const createTravel = async ({
  startDate,
  endDate,
  title,
  userEmails,
}: createProps) =>
  await Api.post(`/api/v1/travels?userId=1`, {
    endDate,
    startDate,
    title,
    userEmails,
  });