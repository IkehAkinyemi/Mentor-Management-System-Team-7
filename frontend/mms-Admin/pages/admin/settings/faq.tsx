import SettingsLayout from "@/components/Settings/SettingsLayout";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import React, { ReactElement } from "react";
import { useFetchFAQ } from "../../../hooks/useFAQ";


const FAQ = () => {


  const { data , error } = useFetchFAQ()

  console.log(data , 'FAQ')
  return <div>FAQ</div>;
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

