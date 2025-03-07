import React, { ChangeEvent } from "react";
import {BaseProps, OptionsProps} from "../types"

const ShortAnswer: React.FC<BaseProps> = ({
  handleChange,
  isBuilder,
  value,
  required,
  readOnly
}) => (
  <div className="mb-3">
    <input
      className="form-control"
      disabled={isBuilder}
      required={required}
      type="text"
      placeholder="Short answer"
      value={value || ""}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleChange({ answer: e.target.value })
      }
      readOnly={readOnly}
    />
  </div>
);

const Email: React.FC<BaseProps> = ({
  handleChange,
  isBuilder,
  value,
  required,
  readOnly
}) => (
  <div className="mb-3">
    <input
      className="form-control"
      disabled={isBuilder}
      required={required}
      type="email"
      placeholder="Email"
      value={value || ""}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleChange({ answer: e.target.value })
      }
      readOnly={readOnly}
    />
  </div>
);

const Number: React.FC<BaseProps> = ({
  handleChange,
  isBuilder,
  value,
  required,
  readOnly
}) => (
  <div className="mb-3">
    <input
      className="form-control"
      disabled={isBuilder}
      required={required}
      type="number"
      placeholder="Number"
      value={value || ""}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleChange({ answer: e.target.value })
      }
      readOnly={readOnly}
    />
  </div>
);

const LongAnswer: React.FC<BaseProps> = ({
  handleChange,
  isBuilder,
  value,
  required,
  readOnly
}) => (
  <div className="mb-3">
    <textarea
      className="form-control"
      disabled={isBuilder}
      required={required}
      rows={3}
      placeholder="Long answer"
      value={value || ""}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        handleChange({ answer: e.target.value })
      }
      readOnly={readOnly}
    />
  </div>
);

const MultipleChoice: React.FC<OptionsProps> = ({
  options,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  isBuilder,
  handleChange,
  value,
  required,
  uuid,
  readOnly
}) => {
  if (isBuilder) {
    return (
      <div className="mb-3">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th style={{ width: "150px" }}>Correct Answer</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {options?.map((option, index) => (
              <tr key={index}>
                <td>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={option.isCorrect || false}
                      onChange={(e) =>
                        onOptionChange?.(index, {
                          ...option,
                          isCorrect: e.target.checked,
                        })
                      }
                    />
                  </div>
                </td>
                <td className="d-flex gap-3 align-items-center">
                  <input
                    className="form-control flex-grow-1"
                    required
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option.value}
                    onChange={(e) =>
                      onOptionChange?.(index, {
                        ...option,
                        value: e.target.value,
                      })
                    }
                    
                  />
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onRemoveOption?.(index)}
                    disabled={options.length <= 1}>
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => {
            e.preventDefault();
            onAddOption?.();
          }}>
          Add Option
        </button>
      </div>
    );
  }

  return (
    <div className="mb-3">
      {options?.map((option, index) => (
        <div className="d-flex gap-2" key={index}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id={`radio-${option.value}`}
              name={`radio-group-${uuid}`}
              required={required}
              checked={value === option.value}
              onChange={() => handleChange({ answer: option.value })}
              disabled={readOnly}
            />
            <label
              className="form-check-label"
              style={{ cursor: "pointer" }}
              htmlFor={`radio-${option.value}`}>
              {option.value}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

const Checkbox: React.FC<OptionsProps> = ({
  options,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  isBuilder,
  handleChange,
  value = [],
  required,
  uuid,
  readOnly
}) => {
  if (isBuilder) {
    return (
      <div className="mb-3">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th style={{ width: "150px" }}>Correct Answer</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {options?.map((option, index) => (
              <tr key={index}>
                <td>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={option.isCorrect || false}
                      onChange={(e) =>
                        onOptionChange?.(index, {
                          ...option,
                          isCorrect: e.target.checked,
                        })
                      }
                    />
                  </div>
                </td>
                <td className="d-flex gap-3 align-items-center">
                  <input
                    className="form-control flex-grow-1"
                    required
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option.value}
                    onChange={(e) =>
                      onOptionChange?.(index, {
                        ...option,
                        value: e.target.value,
                      })
                    }
                  />
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onRemoveOption?.(index)}
                    disabled={options.length <= 1}>
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary btn-sm" onClick={onAddOption}>
          Add Option
        </button>
      </div>
    );
  }

  return (
    <div className="mb-3">
      {options?.map((option, index) => (
        <div className="form-check d-flex gap-2" key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`check-${option.value + "-" + uuid}`}
            required={required && value.length === 0}
            checked={value.includes(option.value)}
            onChange={(e) => {
              const newValue = e.target.checked
                ? [...value, option.value]
                : value.filter((v: string) => v !== option.value);
              handleChange({ answer: newValue });
            }}
            disabled={readOnly}
          />
          <label
            className="form-check-label"
            style={{ cursor: "pointer" }}
            htmlFor={`check-${option.value + "-" + uuid}`}>
            {option.value}
          </label>
        </div>
      ))}
    </div>
  );
};

const Dropdown: React.FC<OptionsProps> = ({
  options,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  isBuilder,
  handleChange,
  value,
  required,
  readOnly
}) => {
  if (isBuilder) {
    return (
      <div className="mb-3">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th style={{ width: "150px" }}>Correct Answer</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {options?.map((option, index) => (
              <tr key={index}>
                <td>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={option.isCorrect || false}
                      onChange={(e) =>
                        onOptionChange?.(index, {
                          ...option,
                          isCorrect: e.target.checked,
                        })
                      }
                    />
                  </div>
                </td>
                <td className="d-flex gap-3 align-items-center">
                  <input
                    className="form-control flex-grow-1"
                    required
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option.value}
                    onChange={(e) =>
                      onOptionChange?.(index, {
                        ...option,
                        value: e.target.value,
                      })
                    }
                  />
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onRemoveOption?.(index)}
                    disabled={options.length <= 1}>
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary btn-sm" onClick={onAddOption}>
          Add Option
        </button>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <select
        className="form-select"
        disabled={isBuilder || readOnly}
        required={required}
        value={value || ""}
        onChange={(e) => handleChange({ answer: e.target.value })}>
        <option value="">Select an option</option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

const DateInput: React.FC<BaseProps> = ({
  handleChange,
  isBuilder,
  value,
  required,
  readOnly
}) => (
  <div className="mb-3">
    <input
      className="form-control"
      disabled={isBuilder || readOnly}
      required={required}
      type="date"
      value={value || ""}
      onChange={(e) => handleChange({ answer: e.target.value })}
    />
  </div>
);

const TimeInput: React.FC<BaseProps> = ({
  handleChange,
  isBuilder,
  value,
  required,
  readOnly
}) => (
  <div className="mb-3">
    <input
      className="form-control"
      disabled={isBuilder || readOnly}
      required={required}
      type="time"
      value={value || ""}
      onChange={(e) => handleChange({ answer: e.target.value })}
    />
  </div>
);

interface RangeProps extends BaseProps {
  options?: string[];
  onOptionChange?: (index: number, value: string) => void;
}

const Range: React.FC<RangeProps> = ({
  handleChange,
  isBuilder,
  value,
  required,
  options,
  onOptionChange,
  readOnly
}) => {
  if (isBuilder) {
    return (
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
        <input
            className="form-control mb-2"
            required
            type="number"
            placeholder="Minimum value"
            value={options?.[0] || ""}
            // min="0"
            onChange={(e) => onOptionChange?.(0, e.target.value)}
          />
          <input
            className="form-control mb-2"
            required
            type="number"
            min={options?.[0] || "0"}
            placeholder="Maximum value"
            value={options?.[1] || ""}
            onChange={(e) => onOptionChange?.(1, e.target.value)}
          />
          <input
            className="form-control mb-2"
            required
            type="number"
            min={1}
            placeholder="Steps"
            value={options?.[2] || ""}
            onChange={(e) => onOptionChange?.(2, e.target.value)}
          />
        </div>
      </div>
    );
  }

  const getSteps = (max: number, min: number): number => {
    if ((max - min) <= 10) return 1;
    if ((max - min) <= 20) return 2;
    if ((max - min) <= 50) return 5;
    if ((max - min) <= 100) return 10;
    return Math.ceil((max - min) / 10);
  };
  const minValue = parseInt(options?.[0] || "0");
  const maxValue = parseInt(options?.[1] || "100");
  const stepSize = options?.[2] ? parseInt(options?.[2]) : getSteps(maxValue, minValue);
  const labels: number[] = [];

  for (let i = minValue; i <= maxValue; i += stepSize) {
    labels.push(i);
  }
  if (labels[labels.length - 1] !== maxValue) {
    labels.push(maxValue);
  }

  return (
    <div className="mb-3">
      <div className="position-relative w-100">
      <input
        className="w-100"
        disabled={isBuilder || readOnly}
        required={required}
        type="range"
        min={minValue}
        max={maxValue}
        step={stepSize}
        value={value || "0"}
        style={{ cursor: "pointer", position: "relative", zIndex: 1 }}
        onChange={(e) => handleChange({ answer: e.target.value })}
      />

      <div className="position-absolute w-100 d-flex" style={{ top: "24px", left: 0 }}>
        {labels.map((num, index) => {
          const position = ((num - minValue) / (maxValue - minValue)) * 100;
          return (
            <span
              key={num}
              style={{
                position: "absolute",
                left: `calc(${position}%)`, // Center align text
                whiteSpace: "nowrap",
                transform: "translateX(-50%)",
                fontSize: "12px",
                cursor: "pointer",
              }}
              onClick={() => handleChange({ answer: num })}
            >
              {num}
            </span>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export const defaultFormElements: Array<{
  type: string;
  component: React.FC<any>;
}> = [
  {
    type: "Question + Short Answer",
    component: ShortAnswer,
  },
  {
    type: "Question + Email",
    component: Email,
  },
  {
    type: "Question + Number",
    component: Number,
  },
  {
    type: "Question + Long Answer",
    component: LongAnswer,
  },
  {
    type: "Dropdown",
    component: Dropdown,
  },
  {
    type: "Multiple Choice",
    component: MultipleChoice,
  },
  {
    type: "Checkbox",
    component: Checkbox,
  },
  {
    type: "Date",
    component: DateInput,
  },
  {
    type: "Time",
    component: TimeInput,
  },
  {
    type: "Range",
    component: Range,
  },
];
