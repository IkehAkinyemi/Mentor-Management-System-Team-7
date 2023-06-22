import SettingsLayout from "@/components/Settings/SettingsLayout";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import React, { ReactElement } from "react";
import { useFetchFAQ } from "../../../hooks/useFAQ";
import { ClipLoader, RotateLoader } from "react-spinners";
import Accordion from "@/components/Accordion";

const FAQ = () => {
  const { data, error, isLoading } = useFetchFAQ();

  console.log(data?.data, "FAQ");

  if (isLoading) {
    return (
      <div className="mx-auto flex justify-center">
        {/* <RotateLoader color="#000" loading={isLoading} size={15} /> */}
        <ClipLoader color="#36d7b7" />
      </div>
    );
  }
  return (
    <div className="border border-[#E6E6E6] rounded-md p-3">

      <h1 className="text-xl font-bold text-mmsBlack2 mb-[28px]">
      General FAQ
      </h1>

      {data?.data.data.map((item: any) => (
        <Accordion question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQ;

FAQ.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout title="FAQ">{page}</SettingsLayout>
    </DashboardLayout>
  );
};

FAQ.requireAuth = true;
