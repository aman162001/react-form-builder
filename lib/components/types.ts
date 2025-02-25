export interface FormField {
    /** Unique identifier for the field */
    uuid: string;
    /** Type of form field (e.g., 'text', 'select', 'radio') */
    type: string;
    /** Question or label for the field */
    question: string;
    /** Current answer/value of the field */
    answer: string;
    /** Whether the field is required */
    required: boolean;
    /** Available options for select/radio/checkbox fields */
    options: string[];
    /** Custom React component to render the field */
    component?: React.FC<any>;
}

/**
 * Basic form metadata
 */
export interface FormInfo {
    /** Title of the form */
    title: string;
    /** Description of the form */
    description: string;
    /** Duration in minutes to complete the form */
    duration: string;
}

/**
 * Props for the FormBuilder component
 */
export interface FormBuilderProps {
    /** Initial form fields */
    initialFields?: FormField[];
    /** Initial form information */
    initialInfo?: FormInfo;
    /** Callback when form data changes */
    onChange?: (fields: FormField[], info: FormInfo) => void;
    /** Callback when form is submitted */
    onSubmit?: (fields: FormField[], info: FormInfo) => void;
    /** Custom form elements/components */
    customElements?: Array<{
        type: string;
        component: React.FC<any>;
    }>;
    /** Custom toolbar component */
    customToolbar?: React.FC<{
        handleAdd: (index: number) => void;
    }>;
    /** Additional CSS classes */
    className?: string;
}

export interface BaseProps {
    handleChange: (data: { answer: any }) => void;
    isBuilder: boolean;
    value: any;
    required?: boolean;
}


export type ValidationRule = {
    type:
    | 'required'
    | 'length'
    | 'min'
    | 'max'
    | 'regex'
    | 'email'
    | 'url'
    | 'uuid'
    | 'ip'
    | 'datetime'
    | 'includes'
    | 'startsWith'
    | 'endsWith';
    value?: any;
    message?: string;
};

export interface ValidationProps extends BaseProps {
    validation?: ValidationRule[];
    onValidationChange?: (isValid: boolean) => void;
}


export interface OptionType {
    value: string;
    isCorrect?: boolean;
}

export interface OptionsProps extends BaseProps {
    options?: OptionType[];
    onOptionChange?: (index: number, option: any) => void;
    onAddOption?: () => void;
    onRemoveOption?: (index: number) => void;
    onMoveOptionUp?: (index: number) => void;
    onMoveOptionDown?: (index: number) => void;
    uuid?: string;
}
export interface FormBuilderRef {
    submit: () => Promise<void>;
}

export interface Answer {
  question: string;
  answer?: string | string[];
  date?: string;
  time?: string;
}

export interface Answers {
  [key: string]: Answer;
}

export interface FormSchemaItem {
  uuid: string;
  question: string;
  answer: string | string[];
  required: boolean;
  options: Array<string | { value: string; isCorrect?: boolean }>;
  type: string;
}

export interface FormOptions {
    [key: string]: any;
}

export interface SubmitBtnOptions {
    [key: string]: any;
}

export type OnSubmit = (answers: Answers) => void;

export interface FormRendererProps {
  formSchema: FormSchemaItem[];
  formOptions?: FormOptions;
  submitBtnOptions?: SubmitBtnOptions;
  onSubmit: OnSubmit;
  errorMessage?: string;
}