"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Text, TextField, Select } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button } from "@radix-ui/themes";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema, IssueFormData } from "../../issueSchema"; // Adjust the import path as necessary
import Spinner from "@/app/components/Spinner";
const page = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
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
      <form
        className="p-4 gap-4"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error: any) {
            setError(error.response.data[0].message);
          }
        })}
      >
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
              <Select.Root onValueChange={field.onChange} value={field.value}>
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
            Submit
            {isSubmitting && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default page;
