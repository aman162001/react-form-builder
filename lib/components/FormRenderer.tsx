import React, { useState } from 'react'
import { getComponentByType } from './utils'


interface Answer {
    question: string;
    answer?: string | string[];
    date?: string;
    time?: string;
  }
  
  interface Answers {
    [key: string]: Answer;
  }

const FormRenderer: React.FC<any> = ({ formSchema }) => {

    const [answers, setAnswers] =useState<Answers>({});
    const handleChange = (question: string, value: any, uuid: string) => {
        setAnswers((prev) => ({
            ...prev,
            [uuid]: { ...value, question },
        }));
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        console.log(answers)
      };

    return (
        <form onSubmit={handleSubmit}>
            {formSchema.map((item: { uuid: string, type: string; question: any; options: any, required: boolean }) => {

                const FiledComponent = getComponentByType(item.type)
                if (FiledComponent)
                    return <div className='mb-2'>
                        <label htmlFor={item.uuid} className="form-label">{item.question}
                            {item.required && (
                                <span className="text-danger">*</span>
                            )}

                        </label>

                        <FiledComponent isBuilder={false} handleChange={(value: any) =>
                            handleChange(item.question, value, item.uuid)
                        } value={
                            answers[item.uuid]?.answer ||
                            answers[item.uuid]?.date ||
                            answers[item.uuid]?.time
                        }
                            required={item.required}
                            options={item.options} />
                    </div>

            })}
            <button type="submit" className='btn btn-primary'>
                Submit
            </button>
        </form>
    )
}

export default FormRenderer