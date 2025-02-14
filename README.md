# React Dynamic Form Builder

A flexible and customizable drag-and-drop form builder component for React applications. This library allows you to create dynamic forms with various field types, custom elements, and real-time preview capabilities.

## Features

- 🎯 Drag-and-drop interface for form building
- 📝 Multiple field types support (text, select, date, etc.)
- ⚡ Real-time form preview
- 🔧 Customizable form elements
- 📱 Responsive design
- ✨ Easy form validation
- 🔄 Two-way data binding
- 🎨 Bootstrap styling (customizable)

## Installation

```bash
npm install assist-form-builder
# or
yarn add assist-form-builder
```

## Quick Start

```jsx
import { FormBuilder, FormRenderer } from 'assist-form-builder';

function App() {
  const handleSubmit = (fields, info) => {
    console.log('Form Data:', { fields, info });
  };

  return (
    <FormBuilder
      initialFields={[]}
      onSubmit={handleSubmit}
      onChange={(fields, info) => console.log('Form updated:', fields)}
    />
  );
}
```

## Components

### FormBuilder

The main component for creating forms. It provides a drag-and-drop interface and form configuration options.

#### Props

- `initialFields`: Array of initial form fields
- `initialInfo`: Initial form metadata (title, description, duration)
- `onChange`: Callback function triggered when form structure changes
- `onSubmit`: Callback function triggered on form submission
- `customElements`: Array of custom form elements
- `customToolbar`: Custom toolbar component
- `className`: Additional CSS classes

```jsx
const initialFields = [
  {
    uuid: '123',
    type: 'text',
    question: 'What is your name?',
    required: true
  }
];

<FormBuilder
  initialFields={initialFields}
  initialInfo={{ title: 'My Form', description: '', duration: '' }}
  onSubmit={(fields, info) => console.log(fields, info)}
/>
```

### FormRenderer

Component for rendering the created form with user input capabilities.

#### Props

- `formSchema`: Array of form fields created by FormBuilder

```jsx
<FormRenderer
  formSchema={formFields}
/>
```

## Form Field Types

The form builder comes with several built-in field types:

- Question + Short Answer
- Question + Email
- Question + Number
- Question + Long Answer
- Dropdown
- Multiple Choice
- Checkbox
- Date
- Time
- Range

## Usage Examples

### Basic Form Builder

```jsx
import { FormBuilder } from 'react-dynamic-form-builder';

function MyFormBuilder() {
  const handleSubmit = (fields, info) => {
    console.log('Form submitted:', fields);
    console.log('Form info:', info);
  };

  return (
    <FormBuilder
      initialFields={[]}
      onSubmit={handleSubmit}
      onChange={(fields, info) => {
        console.log('Form updated:', fields);
      }}
    />
  );
}
```

### Form Renderer with Custom Styling

```jsx
import { FormRenderer } from 'assist-form-builder';

function MyFormRenderer({ formSchema }) {
  return (
    <div className="container">
      <FormRenderer
        formSchema={formSchema}
      />
    </div>
  );
}
```

## Advanced Features

### Custom Form Elements

You can extend the form builder with custom elements:

```jsx
const customElements = [
  {
    type: 'rating',
    component: RatingComponent,
    icon: '⭐',
    label: 'Rating'
  }
];

<FormBuilder
  customElements={customElements}
  // ... other props
/>
```

### Form Validation

The form builder includes built-in validation support:

- Required field validation
- Custom validation rules through the component props
- Real-time validation feedback

### Working with Form Data

The form builder provides structured data output:

```typescript
interface Answer {
  question: string;
  answer?: string | string[];
  date?: string;
  time?: string;
}

interface Answers {
  [key: string]: Answer;
}
```

## Contributing

Contributions are welcome! Please follow these guidelines:

### Commit Convention

We follow the **Conventional Commits** specification for commit messages. This helps us maintain clear git history and automate versioning.

#### Commit Message Format

Each commit message should be structured as follows:

```
<type>: <description>

[optional body]

[optional footer]
```

#### Types

- `feat:` - New features (e.g., `feat: add drag-and-drop support`)
- `fix:` - Bug fixes (e.g., `fix: resolve form validation issue`)
- `chore:` - Build updates, documentation, etc. (e.g., `chore: update dependencies`)
- `BREAKING CHANGE:` - Breaking changes (e.g., `BREAKING CHANGE: refactor form builder API`)

#### Examples

```
feat: add new date picker component
fix: correct form submission validation
chore: update README documentation
BREAKING CHANGE: refactor form field interface
```

For complex changes, include a detailed description in the commit body:

```
feat: add multi-step form support

- Implement form step navigation
- Add progress indicator
- Include step validation
- Add step transition animations

BREAKING CHANGE: Form submission now returns promises
```

### Pull Request Process

1. Fork the repository
2. Create a feature branch following the commit convention
3. Make your changes
4. Submit a pull request with a clear description of changes
5. Ensure all tests pass and code meets style guidelines

## License

This project is licensed under the MIT License - see the LICENSE file for details.