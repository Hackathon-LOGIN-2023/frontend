import React, {useState, useRef} from 'react';
import {Form, FormItem, Picker} from 'react-native-form-component';
import {View, Text} from 'react-native';

export default function CreateIssue({navigation, route}) {
  const [title, setTitle] = useState('Title');
  const [desc, setDesc] = useState('Description');
  const [severity, setSeverity] = useState(0);
  const [category, setCategory] = useState(0);

  return (
    <Form
      onButtonPress={() =>
        console.log(
          `Title: ${title}\nDescription: ${desc}\nSeverity: ${severity}\nCategory: ${category}\n`,
        )
      }>
      <FormItem
        label="Title"
        value={title}
        onChangeText={setTitle}
        isRequired
        asterik
      />
      <FormItem
        label="Description"
        value={desc}
        onChangeText={setDesc}
        textArea
        isRequired
        asterik
      />
      <Picker
        items={[
          {label: 'Low Impact', value: 1},
          {label: 'Significant Impact', value: 2},
          {label: 'Very High Impact', value: 3},
        ]}
        label="Severity"
        selectedValue={severity}
        onSelection={item => setSeverity(item.value)}
        isRequired
        asterik
      />
      <Picker
        items={[
          {label: 'Trash', value: 1},
          {label: 'Traffic', value: 2},
          {label: 'Public Property Damage', value: 3},
          {label: 'Public Transport', value: 4},
          {label: 'Other', value: 5},
        ]}
        label="Category"
        selectedValue={category}
        onSelection={item => setCategory(item.value)}
        isRequired
        asterik
      />
    </Form>
  );
}
