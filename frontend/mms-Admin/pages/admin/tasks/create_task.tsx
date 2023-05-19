import { Button, InputField, TextareaField } from "@/components";
import { Card } from "@/components/Card";
import Dialog from "@/components/Dialog";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { API_URL } from "@/lib/constant";
import { httpClient } from "@/lib/httpClient";
import { DefaultApi, TasksPostRequest } from "@/lib/httpGen";
import { CREATE_TASK_SCHEMA } from "@/lib/schemas/taskSchema";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Delete, Filter, PlusCircle, Search, X } from "react-feather";

const CreateTask = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mentors, setMentors] = React.useState([]);
  const [managers, setManagers] = React.useState([]);

  const taskApi = new DefaultApi(undefined, API_URL, httpClient);
  const createTaskMutation = useMutation(
    async (data: TasksPostRequest) =>
      await taskApi.tasksPost(data).then(res => res.data),
    {
      onSuccess: () => {
        router.push("/admin/tasks/create_task/?task_success=true");
      },
      onError: () => {
        router.push("/admin/tasks/create_task/?task_failed=true");
      }
    }
  );
  // form submission process
  const formik = useFormik({
    initialValues: {
      title: "",
      details: "",
      mentors: [],
      mentor_managers: []
    },
    validationSchema: CREATE_TASK_SCHEMA,
    onSubmit: values => {
      createTaskMutation.mutate(values);
    }
  });
  return (
    <div className="">
      <div className="flex justify-between">
        <div className="lg:w-[75%]">
        <h1 className="text-2xl font-semibold text-mmsBlack1 mb-4">New Task</h1>
          <div>
            <label htmlFor="title" className="font-semibold text-xl text-[#141414]">
              Title
            </label>
            <InputField
              label=""
              placeholder="enter a title"
              name="title"
              id="title"
              className="text-xl text-[#141414]"
              inputProps={{
                value: formik.values.title,
                onChange: formik.handleChange("title"),
                onBlur: formik.handleBlur("title")
              }}
              error={!!formik.touched.title && !!formik.errors.title}
              helperText={formik.errors.title}
            />
            <span className="text-xl text-[#B3B3B3]">
              The title must contain a maximum of 32 characters
            </span>
          </div>
          <div className="mt-8">
            <label
              htmlFor="description"
              className="font-semibold text-xl text-[#141414]"
            >
              Details
            </label>
            <TextareaField
              label=""
              placeholder="enter a details"
              name="details"
              id="details"
              className="text-xl text-[#141441]"
              rows={10}
              inputProps={{
                value: formik.values.details,
                onChange: formik.handleChange("details"),
                onBlur: formik.handleBlur("details")
              }}
              error={!!formik.touched.details && !!formik.errors.details}
              helperText={formik.errors.details}
            />
          </div>
          <div className="mt-6 flex flex-col lg:flex-row items-center justify-between">
            <div className="w-[532px] bg-green11 flex items-center justify-between p-4">
              <div className="w-[350px] flex justify-center flex-col items-center">
                <h5 className="text-xl font-semibold text-[#141414]">
                  Add Mentor Manager
                </h5>
                <span className="flex items-center gap-8 p-[2px] bg-white justify-center">
                  <span>10 selected</span>
                  <Delete size={16} className="text-[#99000A]" />
                </span>
              </div>
              <div>
                <Button variant="primary" className="text-xs py-[3px] px-[15px]" onClick={() => {
                        setIsOpen(true);
                      }}>
                  Select
                </Button>
              </div>
            </div>
            <div className="w-[532px] bg-green11 flex items-center justify-between p-4">
              <div className="w-[350px] flex justify-center flex-col items-center">
                <h5 className="text-xl font-semibold text-[#141414]">Add Mentor</h5>
                <span className="flex items-center gap-8 p-[2px] bg-white justify-center">
                  <span>10 selected</span>
                  <Delete size={16} className="text-[#99000A]" />
                </span>
              </div>
              <div>
                <Button variant="primary" className="text-xs py-[3px] px-[15px]">
                  Select
                </Button>
              </div>
            </div>
          </div>
            <div>
              <Button
                variant="primary"
                className="py-[10px] px-[40px] text-lg"
                onClick={formik.handleSubmit}
              >
                Create Task
              </Button>
            </div>
        </div>
        <div className={
          "bg-white delay-400 duration-500 ease-in-out transition-all transform " +
          (isOpen === false ? "hidden translate-x-0" : " translate-x-1 w-[30%]")
        }>
<div className="flex justify-end items-center gap-3 mb-3 px-2">
            <Button className="text-mmsPry3">
              <Search size={20} />
            </Button>
            <Button className="text-mmsPry3">
              <Filter size={20} />
            </Button>
            <Button className="text-mmsPry3" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </Button>
          </div>
          <div>
          <Card className="py-2 mx-3 shadow-none lg:w-[95%] border flex-row items-center gap-2 border-[#E6E6E6] rounded-md">
            <Image 
            src="/images/task.png"
            width={39}
            height={40}
            alt="task"
            />
            <div className="text-[#141414]">
              <h5 className="font-semibold">Kabiru Omo Isaka</h5>
                <span className="text-mmsBlack5 text-xs">Program Assistant, Andela, She/her</span>
              <div className="flex items-center text-mmsBlack5 text-xs">
                <span className="bg-green11 p-[3px]">PROGRAM ASST.</span>
                <span className="bg-green11 p-[3px]">MENTOR_GADS.</span>
              </div>
            </div>
            <div>
              <Button> <PlusCircle size={16}/></Button>
            </div>
          </Card>
          </div>
        </div>
      </div>
      {router.query.task_success && (
        <Dialog variant="scroll" open={false} onClose={() => router.back()}>
          <div className="py-8 flex flex-col justify-center items-center px-12">
            <h2 className="text-2xl font-semibold text-[#141414] my-2">
              Task Created Successfully
            </h2>
            <Image
              src="/images/task-success.png"
              width={220}
              height={165}
              alt="task_success"
            />
            <div className="mt-4">
              <Button
                variant="primary"
                className="py-[10px] px-[40px] text-lg"
                onClick={() => router.back()}
              >
                Done
              </Button>
            </div>
          </div>
        </Dialog>
      )}
      {router.query.task_failed && (
        <Dialog variant="scroll" open={false} onClose={() => router.back()}>
          <div className="py-8 flex flex-col justify-center items-center px-12">
            <h2 className="text-2xl text-center font-semibold text-red-500 my-2">
              An error occured while creating task
            </h2>
            <Image
              src="/images/task-success.png"
              width={220}
              height={165}
              alt="task_success"
            />
            <div className="mt-4">
              <Button
                variant="primary"
                className="bg-red-500 py-[10px] px-[40px] text-lg"
                onClick={() => router.back()}
              >
                Try again
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CreateTask;

CreateTask.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
