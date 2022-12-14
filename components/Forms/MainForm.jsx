import styles from "./Form.module.scss";
import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";

const MainForm = () => {
  const router = useRouter();
  const page = router.pathname.split("/").pop();

  const handleChange = () => {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ event: "lead" });
  };

  React.useEffect(() => {
    const { utm_medium, utm_source, utm_term, utm_content, utm_campaign } =
      router.query;

    if (router.isReady) {
      register("utm_medium", { value: utm_medium });
      register("utm_source", { value: utm_source });
      register("utm_term", { value: utm_term });
      register("utm_content", { value: utm_content });
      register("utm_campaign", { value: utm_campaign });
      register("Page", { value: !page ? "home" : page });
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) =>
    axios
      .post("https://hook.eu1.make.com/jcjz9wf8bjm8lqakt3cbqcefyhqdgdvh", data)
      .then(() => {
        reset();
        router.replace("/thank-you-form");
      })
      .catch((error) => {
        console.log(error);
      });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      onChange={handleChange}
    >
      <Box className={`${styles.field} ${errors.name && styles.fieldError}`}>
        <input
          type={"text"}
          id={"name"}
          name={"name"}
          placeholder={"name:"}
          {...register("name", { required: true })}
        />
      </Box>
      <Box className={`${styles.field} ${errors.name && styles.fieldError}`}>
        <input
          type={"email"}
          id={"email"}
          name={"email"}
          placeholder={"email:"}
          {...register("email", { required: true })}
        />
      </Box>
      <input
        type="hidden"
        value={
          router.asPath === "/"
            ? "Home page"
            : router.asPath.split("/").slice(-1).join("")
        }
        {...register("page")}
      />
      <Box className={styles.field}>
        <textarea
          rows={4}
          name={"message"}
          id={"message"}
          placeholder={"message:"}
          {...register("message")}
        />
      </Box>
      <Button variant={"text"} type={"submit"} className={styles.submit}>
        send
      </Button>
    </form>
  );
};

export default MainForm;
