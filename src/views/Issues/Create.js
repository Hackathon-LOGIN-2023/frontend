import React, {useState} from 'react';
import {Form, FormItem, Picker} from 'react-native-form-component';
import {createPicker} from '../../constants';

export default function CreateIssue({navigation, route}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [severity, setSeverity] = useState(0);
  const [category, setCategory] = useState(0);

  return (
    <Form
      onButtonPress={() =>
        console.log(
          `Title: ${title}\nDescription: ${desc}\nSeverity: ${severity}\nCategory: ${category}\n`,
        )
      }
      buttonText="Create"
      buttonStyle={{backgroundColor: '#ec8103'}}>
      <FormItem
        label="Title"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        isRequired
        asterik
      />
      <FormItem
        label="Description"
        value={desc}
        onChangeText={setDesc}
        placeholder="Description"
        textArea
        isRequired
        asterik
      />
      <Picker
        items={createPicker('severity')}
        label="Severity"
        selectedValue={severity}
        onSelection={item => setSeverity(item.value)}
        isRequired
        asterik
      />
      <Picker
        items={createPicker('category')}
        label="Category"
        selectedValue={category}
        onSelection={item => setCategory(item.value)}
        isRequired
        asterik
      />
    </Form>
  );
}
