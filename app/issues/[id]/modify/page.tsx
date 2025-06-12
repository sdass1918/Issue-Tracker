"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { issueSchema, IssueFormData } from "../../../issueSchema"; // Adjust the import path as necessary
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Text } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { Select } from "@radix-ui/themes";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller } from "react-hook-form";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import type { SubmitHandler } from "react-hook-form";

export default function EditIssuePage() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`/api/issues/${id}`);
        const issue = res.data;

        setValue("title", issue.title);
        setValue("description", issue.description);
        setValue("status", issue.status);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIssue();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<IssueFormData> = async (values) => {
    try {
      await axios.put(`/api/issues/${id}`, values);
      router.push("/");
    } catch (error) {
      console.error("Failed to update issue:", error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mx-3.5 max-w-xl">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="p-4 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <TextField.Root
            placeholder="Title"
            className="mb-3"
            {...register("title")}
          ></TextField.Root>
          {errors.title && (
            <Text color="violet" as="p">
              {errors.title.message}
            </Text>
          )}
        </div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="violet" as="p">
            {errors.description.message}
          </Text>
        )}
        <div className="flex flex-col gap-4">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select.Root
                defaultValue="OPEN"
                onValueChange={field.onChange}
                value={field.value}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="OPEN">Open</Select.Item>
                  <Select.Item value="CLOSED">Closed</Select.Item>
                  <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                </Select.Content>
              </Select.Root>
            )}
          />
          {errors.status && (
            <Text color="violet" as="p">
              {errors.status.message}
            </Text>
          )}
          <Button type="submit" disabled={isSubmitting}>
            Update
            {isSubmitting && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
}
