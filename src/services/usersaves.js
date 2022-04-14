import { client, checkError } from './client';

export async function saveText(title, text_content, instrument) {
  const response = await client.from('user_input').insert([{ title, text_content, instrument }]);
  return checkError(response);
}

export async function fetchTitles() {
  const response = await client.from('user_input').select('*').order('id', { ascending: true });
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

export async function updateTextById(id, title, typedString, instrument) {
  const response = await client
    .from('user_input')
    .update({ title: title, text_content: typedString, instrument: instrument })
    .match({ id });
  return checkError(response);
}
