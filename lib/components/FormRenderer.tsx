import React, { useState } from "react";
import { getComponentByType } from "./utils";
import { FormRendererProps, Answers } from "./types";

const FormRenderer: React.FC<FormRendererProps> = ({
  formSchema,
  formOptions,
  submitBtnOptions,
  onSubmit,
}) => {
  const [answers, setAnswers] = useState<Answers>({});
  const handleChange = (question: string, value: any, uuid: string) => {
    setAnswers((prev) => ({
      ...prev,
      [uuid]: { ...value, question },
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // console.log(answers)
    onSubmit(answers);
  };

  return (
    ((!formSchema || (formSchema).length === 0) && (
      <p className="text-danger">Please provide a valid schema</p>
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

                  <FiledComponent
                    isBuilder={false}
                    handleChange={(value: any) =>
                      handleChange(item.question, value, item.uuid)
                    }
                    value={
                      answers[item.uuid]?.answer ||
                      answers[item.uuid]?.date ||
                      answers[item.uuid]?.time
                    }
                    required={item.required}
                    options={item.options}
                  />
                </div>
              );
          }
        )}
        {formSchema &&
          (formSchema).length !== 0 &&
          !(submitBtnOptions?.hide || false) && (
            <button type="submit" {...submitBtnOptions?.props}>
              {submitBtnOptions?.label || "Submit"}
            </button>
          )}
      </form>
    )
  );
};

export default FormRenderer;
