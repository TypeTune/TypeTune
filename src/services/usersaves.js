import { client, checkError } from './client';

export async function saveText(title, text_content) {
  const response = await client.from('user_input').insert([{ title, text_content }]);
  return checkError(response);
}

export async function fetchTitles() {
  const response = await client.from('user_input').select('*');
  return checkError(response);
}

export async function deleteFile(id) {
  const response = await client.from('user_input').delete('*').match({ id });
  return checkError(response);
}

export async function fetchTextsById(id) {
  const response = await client.from('user_input').select('*').match({ id }).single();
  return checkError(response);
}

export async function updateTextById(id, title, typedString) {
  const response = await client.from('user_input').update({ title: title, text_content: typedString }).match({ id });
  console.log(typedString);
  return checkError(response);
}
