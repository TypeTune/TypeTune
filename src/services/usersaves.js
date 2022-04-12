import { client, checkError } from './client';

export async function saveText(title, text_content) {
  const response = await client
    .from('user_input')
    .insert([{ title, text_content }]);
  return checkError(response);
}

export async function fetchTitles() {
  const response = await client.from('user_input').select('*');
  console.log(response);
  return checkError(response);
}