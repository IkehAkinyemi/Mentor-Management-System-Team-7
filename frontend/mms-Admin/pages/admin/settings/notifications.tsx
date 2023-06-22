import { Button } from "@/components";
import SettingsLayout from "@/components/Settings/SettingsLayout";
// import { Toggle } from "@/components/Toggle";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import React, { ReactElement } from "react";

const Notifications = () => {
  const Toggle = () => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div
        className="w-11 h-6 bg-[#B3B3B3]
     peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
      peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
      after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-mmsPry3"
      ></div>
    </label>
  );
  return (
    <div className="border border-[#E6E6E6] rounded-md p-5 text-mmsBlack2">
      <h3 className="font-semibold text-xl text-mmsBlack2">
        General Notifications
      </h3>
      <div className="flex justify-end">
        <div className="font-semibold text-lg text-mmsBlack2 flex items-center gap-3">
          <h2>E-mail</h2>
          <h2>In-app</h2>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between my-3">
          <p className="text-xl">All Notifications</p>
          <div className="flex items-center gap-8 mx-3">
            <Toggle />
            <Toggle />
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <p className="text-xl">Programs</p>
          <div className="flex items-center gap-8 mx-3">
            <Toggle />
            <Toggle />
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <p className="text-xl">Task</p>
          <div className="flex items-center gap-8 mx-3">
            <Toggle />
            <Toggle />
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <p className="text-xl">Approval Request</p>
          <div className="flex items-center gap-8 mx-3">
            <Toggle />
            <Toggle />
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <p className="text-xl">Reports</p>
          <div className="flex items-center gap-8 mx-3">
            <Toggle />
            <Toggle />
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-xl text-mmsBlack2 mt-[40px]">
        Discussion Notifications
      </h3>
      <div className="flex justify-end">
        <div className="font-semibold text-lg text-mmsBlack2 flex items-center gap-3">
          <h2>E-mail</h2>
          <h2>In-app</h2>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between my-3">
          <p className="text-xl">Comments on my posts</p>
          <div className="flex items-center gap-8 mx-3">
            <Toggle />
            <Toggle />
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <p className="text-xl">Posts</p>
          <div className="flex items-center gap-8 mx-3">
            <Toggle />
            <Toggle />
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <p className="text-xl">Comments</p>
          <div className="flex items-center gap-8 mx-3">
            <Toggle />
            <Toggle />
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <p className="text-xl">Mentions</p>
          <div className="flex items-center gap-8 mx-3">
            <Toggle />
            <Toggle />
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <p className="text-xl">Directs Message</p>
          <div className="flex items-center gap-8 mx-3">
            <Toggle />
            <Toggle />
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="my-5 px-7 py-2 flex justify-end" variant="primary">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

Notifications.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <SettingsLayout title="Notifications">{page}</SettingsLayout>
    </DashboardLayout>
  );
};

Notifications.requireAuth = true;
