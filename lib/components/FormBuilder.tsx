import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ToolBar from "./ToolBar";
import { defaultFormElements } from "./FormElements";
import { v4 } from "uuid";
import { FormBuilderProps, FormBuilderRef, FormField, FormInfo } from "../types";
import { getComponentByType } from "./utils";
/**
 * FormBuilder Component
 * 
 * A drag-and-drop form builder that allows users to create custom forms
 * with various field types and configurations.
 * 
 * @example
 * ```tsx
 * import { FormBuilder } from 'react-dynamic-form-builder';
 * 
 * function App() {
 *   const handleSubmit = (fields, info) => {
 *     console.log('Form Data:', { fields, info });
 *   };
 * 
 *   return (
 *     <FormBuilder
 *       initialFields={[]}
 *       onSubmit={handleSubmit}
 *       onChange={(fields, info) => console.log('Form updated:', fields)}
 *     />
 *   );
 * }
 * ```
 */

const FormBuilder = forwardRef<FormBuilderRef, FormBuilderProps>((
  {
    initialFields = [],
    initialInfo = { title: '', description: '', duration: '' },
    onChange,
    onSubmit,
    customElements = [],
  },
  ref
) => {
  const [formsArray, setFormsArray] = useState<FormField[]>(initialFields);
  const [formInfo, setFormInfo] = useState<FormInfo>(initialInfo);
  // const bottomRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const allFormElements = [...defaultFormElements, ...customElements];
  const handleChange = (uuid: string, property: string, value: any) => {
    setFormsArray((prev) => {
      const updatedFields = prev.map((field) =>
        field.uuid === uuid ? { ...field, [property]: value } : field
      )
      onChange?.(updatedFields, formInfo)
      return updatedFields
    }
    );
  };

  useImperativeHandle(ref, () => ({
    submit: async () => {
      if (formRef.current) {
        // Trigger form validation
        const isValid = formRef.current.checkValidity();
        if (!isValid) {
          formRef.current.reportValidity();
          return;
        }
        console.log("CALLED")
        // Call onSubmit if form is valid
        onSubmit?.(formsArray, formInfo);
      }
    }
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formsArray, formInfo);
  };

  const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    const { type } = JSON.parse(data);

    const foundElement = allFormElements.find((item) => item.type === type);
    if (!foundElement) return;

    const droppedField: FormField = {
      uuid: v4(),
      question: '',
      answer: '',
      required: false,
      options: [''],
      ...foundElement,
    };

    setFormsArray((prev) => [...prev, droppedField]);
  };

  const handleOptionChange = (uuid: string, index: number, value: any) => {
    setFormsArray((prev) =>
      prev.map((field) =>
        field.uuid === uuid
          ? {
              ...field,
              options: [
                ...field.options.slice(0, index),
                ...Array(Math.max(0, index - field.options.length)).fill(undefined),
                value, 
                ...field.options.slice(index + 1),
              ],
            }
          : field
      )
    );
  };

  const addOption = (uuid: string) => {
    setFormsArray((prev) =>
      prev.map((field) =>
        field.uuid === uuid
          ? { ...field, options: [...(field.options || []), ""] }
          : field
      )
    );
  };

  const removeOption = (uuid: string, index: number) => {
    setFormsArray((prev) =>
      prev.map((field) =>
        field.uuid === uuid
          ? {
            ...field,
            options: field.options.filter((_, i) => i !== index),
          }
          : field
      )
    );
  };

  const handleAdd = (index: number) => {
    const droppedField: FormField = {
      uuid: v4(),
      question: "",
      answer: "",
      required: false,
      options: [""],
      ...defaultFormElements[index],
    };
    setFormsArray((prev) => [...prev, droppedField]);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      setFormsArray((prev) => {
        const newArray = [...prev];
        [newArray[index], newArray[index - 1]] = [
          newArray[index - 1],
          newArray[index],
        ];
        return newArray;
      });
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < formsArray.length - 1) {
      setFormsArray((prev) => {
        const newArray = [...prev];
        [newArray[index], newArray[index + 1]] = [
          newArray[index + 1],
          newArray[index],
        ];
        return newArray;
      });
    }
  };

  const handleDelete = (uuid: string) => {
    setFormsArray((prev) => prev.filter((field) => field.uuid !== uuid));
  };

  const toggleRequired = (uuid: string) => {
    setFormsArray((prev) =>
      prev.map((field) =>
        field.uuid === uuid ? { ...field, required: !field.required } : field
      )
    );
  };

  const handleMoveOptionUp = (fieldUuid: string, index: number) => {
    if (index > 0) {
      setFormsArray((prev) =>
        prev.map((field) =>
          field.uuid === fieldUuid
            ? {
              ...field,
              options: field.options.map((option, i, options) =>
                i === index
                  ? options[i - 1]
                  : i === index - 1
                    ? options[i + 1]
                    : option
              ),
            }
            : field
        )
      );
    }
  };

  const handleMoveOptionDown = (fieldUuid: string, index: number) => {
    setFormsArray((prev) =>
      prev.map((field) =>
        field.uuid === fieldUuid && index < field.options.length - 1
          ? {
            ...field,
            options: field.options.map((option, i, options) =>
              i === index
                ? options[i + 1]
                : i === index + 1
                  ? options[i - 1]
                  : option
            ),
          }
          : field
      )
    );
  };


  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [formsArray]);

  return (
    <main className="container-fluid vh-100 p-3">
      <div className="row h-100">
        <div className="col-4">
          <ToolBar handleAdd={handleAdd} />
        </div>
        <form
          ref={formRef}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="mh-100 overflow-auto py-2 col-8 border border-secondary rounded-2 gap-2 d-flex flex-column"
          onSubmit={handleSubmit}>
          <div style={{ overflow: "auto" }} className="flex-grow-1 mb-3">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex gap-2">
                <input
                  className="form-control"
                  value={formInfo.title}
                  onChange={(e) =>
                    setFormInfo((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                  placeholder="Form Title"
                />
              </div>
              {formsArray.map((field, index) => {
                const FieldComponent = getComponentByType(field.type);
                if (FieldComponent) {
                  return (
                    <div key={field.uuid} className="card p-2">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>
                          Question {index + 1}{" "}
                          <span className="text-secondary">({field.type})</span>
                        </span>
                        <div className="d-flex gap-2 align-items-center">
                          <div className="form-check form-switch me-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`required-switch-${field.uuid}`}
                              checked={field.required}
                              onChange={() => toggleRequired(field.uuid)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`required-switch-${field.uuid}`}>
                              Required
                            </label>
                          </div>
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={(e) => {
                              e.preventDefault()
                              handleMoveUp(index)
                            }}>
                            ↑
                          </button>
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={(e) => {
                              e.preventDefault()
                              handleMoveDown(index)
                            }}>
                            ↓
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(field.uuid)}>
                            ✕
                          </button>
                        </div>
                      </div>
                      {FieldComponent && (
                        <>
                          <input
                            className="form-control my-1"
                            required
                            value={field.question}
                            onChange={(e) =>
                              handleChange(field.uuid, "question", e.target.value)
                            }
                            placeholder="Question"
                          />
                          <FieldComponent
                            onMoveOptionUp={() =>
                              handleMoveOptionUp(field.uuid, index)
                            }
                            onMoveOptionDown={() =>
                              handleMoveOptionDown(field.uuid, index)
                            }
                            isBuilder={true}
                            handleChange={(update: { [key: string]: any }) =>
                              handleChange(
                                field.uuid,
                                Object.keys(update)[0],
                                Object.values(update)[0]
                              )
                            }
                            question={field.question}
                            options={field.options}
                            onOptionChange={(index: number, value: any) =>
                              handleOptionChange(field.uuid, index, value)
                            }
                            onAddOption={() => addOption(field.uuid)}
                            onRemoveOption={(index: number) =>
                              removeOption(field.uuid, index)
                            }
                            required={field.required}
                          />
                        </>
                      )}
                    </div>
                  );
                }
              })}
              {/* <div ref={bottomRef} /> */}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
})

export default FormBuilder;
