import React, { useEffect, useMemo, useRef, useState } from 'react'
import ToolBar from './ToolBar';
import { FormElements } from './FormElements';
import { v4 } from 'uuid';

interface FormField {
    uuid: string;
    type: string;
    question: string;
    answer: string;
    required: boolean;
    options: string[];
    component?: React.FC<any>;
  }
  
  interface FormInfo {
    title: string;
    description: string;
    duration: string;
  }
  
  interface LocationState {
    formData?: {
      title: string;
      description: string;
      duration: string;
      form: FormField[];
    };
  }
  
  interface RootState {
    forms: {
      createFormsLoader: boolean;
      createFormSuccess: boolean;
      aiResponse: FormField[] | null;
    };
  }
  

function FormBuilder() {
    const [formElements, setFormElements] = useState<any[]>([]);
  
    const formData  = {};

    const editor = useRef(null);
    const bottomRef = useRef<HTMLDivElement>(null);
  
    const config = useMemo(
      () => ({
        height: 300,
        required: true,
        readonly: false,
        placeholder: "Form Description...",
        toolbarSticky: false,
      }),
      []
    );
  
    const [formsArray, setFormsArray] = useState<FormField[]>(
     []
    );
    const [showModal, setShowModal] = useState(false);
    const [formInfo, setFormInfo] = useState<FormInfo>({
      title:  "",
      description:  "",
      duration: "",
    });
  
  
    const handleChange = (uuid: string, property: string, value: any) => {
      setFormsArray((prev) =>
        prev.map((field) =>
          field.uuid === uuid ? { ...field, [property]: value } : field
        )
      );
    };
  
    const handleOptionChange = (uuid: string, index: number, value: any) => {
      setFormsArray((prev) =>
        prev.map((field) =>
          field.uuid === uuid
            ? {
                ...field,
                options: field.options.map((option, i) =>
                  i === index ? value : option
                ),
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
        ...FormElements[index],
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
  
    const handleSubmit = async (e: React.FormEvent) => {
      try {
      
      } catch (err) {
        console.error(err);
      }
    };
  
    const getComponentByType = (type: string) => {
      return FormElements.find((q) => q.type === type)?.component;
    };
  
   
    useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [formsArray]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const data = e.dataTransfer.getData('text');
        const { type } = JSON.parse(data);
        setFormElements(prev => [...prev, type]);
        console.log(formElements)
    };

   const handleRemoveElement = (index: number) => {
    setFormElements(prev => {
        const newArray = [...prev];
        newArray.splice(index, 1);
        return newArray;
    });
};

    return (
        <main className='container vh-100 p-3'>
            <div className="row h-100">
                <div className="col-4">
                    <ToolBar />
                </div>
                <div className="mh-100 overflow-auto py-2 col-8 border border-secondary rounded-2 d-flex flex-column gap-2" onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}>
                    <form
              className="d-flex flex-column"
              onSubmit={handleSubmit}
              style={{ height: "95vh", overflow: "hidden" }}
            >
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
                    <input
                      className="form-control"
                      type="number"
                      min={1}
                      value={formInfo.duration}
                      placeholder="Duration in minutes"
                      required
                      onChange={(e) => {
                        const sanitizedValue = e.target.value.replace(/\D/g, "");
                        setFormInfo((prev) => ({
                          ...prev,
                          duration: sanitizedValue,
                        }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "." || e.key === "-" || e.key === "e") {
                          e.preventDefault();
                        }
                      }}
                    />
                    <button
                      className="btn btn-success"
                      disabled={false}
                      type="submit"
                    >
                     
                        "Submit"
                    </button>
                  </div>

               

                  {formsArray.map((field, index) => {
                    const FieldComponent =
                      typeof field.component === "function"
                        ? field.component
                        : getComponentByType(field.type);

                    return (
                      <div key={field.uuid} className="card p-2">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span>
                            Question {index + 1}{" "}
                            <span className="text-secondary">
                              ({field.type})
                            </span>
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
                                htmlFor={`required-switch-${field.uuid}`}
                              >
                                Required
                              </label>
                            </div>
                            <button
                              className="btn btn-outline-primary btn-sm me-2"
                              onClick={() => handleMoveUp(index)}
                            >
                              ↑
                            </button>
                            <button
                              className="btn btn-outline-primary btn-sm me-2"
                              onClick={() => handleMoveDown(index)}
                            >
                              ↓
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(field.uuid)}
                            >
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
                                handleChange(
                                  field.uuid,
                                  "question",
                                  e.target.value
                                )
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
                  })}
                  <div ref={bottomRef} />
                </div>
              </div>
            </form>
                </div>
            </div>
        </main>
    );
}

export default FormBuilder;
