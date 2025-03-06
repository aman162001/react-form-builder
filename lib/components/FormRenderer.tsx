import React, { useState } from "react";
import { getComponentByType } from "./utils";
import { Answers, FormRendererProps, FormSchemaItem } from "../types";

const FormRenderer: React.FC<FormRendererProps> = ({
  formSchema,
  formOptions,
  submitBtnOptions,
  onSubmit,
  errorMessage = "Please provide a valid schema",
}) => {
  const [answers, setAnswers] = useState<Answers>(formSchema);

  const handleChange = (value: any, uuid: string) => {
    setAnswers((prevAnswers: any) =>
      prevAnswers.map((item: any) =>
        item.uuid === uuid ? { ...item, answer: value.answer } : item
      )
    );
  };

  const isDisabled = formOptions?.disabled ?? false;
  const isReadOnly = formOptions?.readOnly ?? false;

  const props = {
    readOnly: isReadOnly,
    disabled: isDisabled,
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // console.log(answers)
    onSubmit(answers);
  };

  return (
    ((!formSchema || formSchema.length === 0) && (
      <p className="text-danger">{errorMessage}</p>
    )) || (
      <form onSubmit={handleSubmit} {...formOptions}>
        {formSchema.map(
          (item: {
            uuid: string;
            type: string;
            question: any;
            options: any;
            required: boolean;
          }) => {
            const FiledComponent = getComponentByType(item.type);
            if (FiledComponent)
              return (
                <div className="mb-2">
                  <label htmlFor={item.uuid} className="form-label">
                    {item.question}
                    {item.required && <span className="text-danger">*</span>}
                  </label>

                  <fieldset disabled={props?.disabled}>
                    <FiledComponent
                      isBuilder={false}
                      handleChange={(value: string) => {
                        handleChange(value, item.uuid);
                      }}
                      value={
                        answers.find((ans: FormSchemaItem) => ans.uuid === item.uuid)
                          ?.answer ||
                        answers.find((ans: FormSchemaItem) => ans.uuid === item.uuid)
                          ?.date ||
                        answers.find((ans: FormSchemaItem) => ans.uuid === item.uuid)?.time
                      }
                      required={item.required}
                      options={item.options}
                      readOnly={props?.readOnly}
                    />
                  </fieldset>
                </div>
              );
          }
        )}
        {formSchema &&
          formSchema.length !== 0 &&
          !(submitBtnOptions?.hide || false) && (
            <button
              type="submit"
              {...submitBtnOptions?.props}
              disabled={props?.disabled || false}
            >
              {submitBtnOptions?.label || "Submit"}
            </button>
          )}
      </form>
    )
  );
};

export default FormRenderer;
