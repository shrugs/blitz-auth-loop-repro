import { Alert, Button, ButtonGroup, VStack } from "@chakra-ui/react";
import React, { PropsWithoutRef, ReactNode, useState } from "react";
import { FormProvider, useForm, UseFormOptions } from "react-hook-form";
import * as z from "zod";

type FormProps<S extends z.ZodType<any, any>> = {
  children: ReactNode;
  submit: ReactNode;
  actions?: ReactNode;
  schema?: S;
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>;
  initialValues?: UseFormOptions<z.infer<S>>["defaultValues"];
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">;

type OnSubmitResult = {
  FORM_ERROR?: string;
  [prop: string]: any;
};

export const FORM_ERROR = "FORM_ERROR";

export function Form<S extends z.ZodType<any, any>>({
  children,
  actions,
  submit,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const ctx = useForm<z.infer<S>>({
    mode: "onBlur",
    resolver: async (values) => {
      try {
        if (schema) {
          schema.parse(values);
        }
        return { values, errors: {} };
      } catch (error) {
        return { values: {}, errors: error.formErrors?.fieldErrors };
      }
    },
    defaultValues: initialValues,
  });
  const [formError, setFormError] = useState<string | null>(null);

  return (
    <FormProvider {...ctx}>
      <form
        onSubmit={ctx.handleSubmit(async (values) => {
          const result = (await onSubmit(values)) || {};
          for (const [key, value] of Object.entries(result)) {
            if (key === FORM_ERROR) {
              setFormError(value);
            } else {
              ctx.setError(key as any, {
                type: "submit",
                message: value,
              });
            }
          }
        })}
        {...props}
      >
        <VStack spacing={4} align="start">
          {children}

          {formError && <Alert status="error">{formError}</Alert>}

          <ButtonGroup spacing={2}>
            <Button
              type="submit"
              isDisabled={ctx.formState.isSubmitting}
              isLoading={ctx.formState.isSubmitting}
            >
              {submit}
            </Button>
            {actions}
          </ButtonGroup>
        </VStack>
      </form>
    </FormProvider>
  );
}

export default Form;
